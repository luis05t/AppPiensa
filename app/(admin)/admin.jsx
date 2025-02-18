import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { envConfig } from '@/config/environment';
import { useMqtt } from '@/context/MqttProvider';
import { http } from '../../services/http';

const PatientMonitor = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await http.get('/users');
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();

    return () => {
      setPatients([]);
    }
  }, []);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { mqttClient, mqttData, mqttStatus, mqttError, subscribeToTopic } = useMqtt();

  useEffect(() => {
    subscribeToTopic(envConfig.MQTT_TOPICS, { qos: envConfig.MQTT_QOS });
  }, []);



  useEffect(() => {
    try {
      if (mqttData?.message && mqttData?.topic === 'esp32LuisTinoco/max30102') {
        const parsedData = JSON.parse(mqttData.message.toString());

        setPatients(prevPatients =>
          prevPatients.map(patient =>
            patient.userId === selectedPatient?.userId ? {
              ...patient,
              lastReading: {
                BPM: Number(parsedData.BPM),
                temp: Number(parsedData.temp),
                timestamp: new Date()
              }
            } : patient
          )
        );
      } else if (mqttData?.message && mqttData?.topic === 'esp32LuisTinoco/mlx90614') {
        const parsedData = JSON.parse(mqttData.message.toString());

        setPatients(prevPatients =>
          prevPatients.map(patient =>
            patient.userId === selectedPatient?.userId ? {
              ...patient,
              lastReading: {
                ...patient.lastReading,
                temp: Number(parsedData.temp)
              }
            } : patient
          )
        );
      }
    } catch (error) {
      console.error('MQTT Data Error:', error);
    }
  }, [mqttData]);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      patient.email.toString().includes(searchQuery.trim())
  );

  const handleSendData = async () => {
    const { BPM, temp, timestamp } = selectedPatient.lastReading;

    if (!BPM || !temp) {
      console.error('Invalid sensor data - missing BPM or temperature');
      return;
    }

    const logData = {
      patientId: selectedPatient.userId,
      patientName: selectedPatient.name,
      timestamp: timestamp.toISOString(),
      vitalSigns: {
        BPM: Number(BPM),
        temp: Number(temp),
      },
    };

    try {
      const response = await http.post('/vital-signs', logData);
      console.log('Data sent successfully:', response);
    } catch (error) {
      console.error('Error sending data:', error);
    }

    setSelectedPatient(null);
  };

  return (
    <View className="flex-1 bg-gray-50 p-6 gap-y-6">
      <StatusBar style="dark" />

      <View className="bg-white rounded-xl shadow-sm px-4 py-3">
        <TextInput
          className="text-gray-800 text-base font-inter"
          placeholder="Buscar paciente por nombre o edad..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View className="gap-y-4">
        <Text className="text-gray-800 text-xl font-semibold font-inter">Pacientes</Text>
        <FlatList
          data={filteredPatients.filter(patient => patient.roleId === '3b207b12-d54f-43a1-aeaf-199f0ea6dfdd')}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.userId}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`bg-white rounded-xl p-4 mr-4 shadow-sm ${selectedPatient?.userId === item.userId ? "border-2 border-green-500" : ""
                }`}
              onPress={() => setSelectedPatient(item)}
            >
              <View className="gap-y-2">
                <Text className="text-gray-800 font-medium text-lg font-inter">{item.name}</Text>
                <Text className="text-gray-600 text-sm font-inter">{item.email}</Text>
                {item.lastReading && selectedPatient?.userId === item.userId && (
                  <Text className="text-blue-600 text-xs font-medium font-inter">
                    Último registro: {item.lastReading.BPM} lpm - {item.lastReading.temp}°C
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="py-4">
              <Text className="text-gray-400 text-center font-inter">No se encontraron pacientes</Text>
            </View>
          }
        />
      </View>

      <View className="bg-white rounded-2xl p-6 shadow-sm gap-y-6">
        <Text className="text-gray-800 text-lg font-semibold font-inter text-center">
          {selectedPatient ? ` Monitorizando a ${selectedPatient.name}` : 'Seleccione un paciente'}
        </Text>

        {selectedPatient && selectedPatient.lastReading && (
          <View className="flex-row justify-between gap-4">
            <View className="bg-blue-50 flex-1 p-4 rounded-xl items-center">
              <Text className="text-blue-600 text-sm font-medium font-inter">Ritmo Cardíaco (lpm)</Text>
              <Text className="text-blue-800 text-3xl font-bold mt-2 font-inter">{selectedPatient.lastReading.BPM}</Text>
            </View>

            <View className="bg-blue-50 flex-1 p-4 rounded-xl items-center">
              <Text className="text-blue-600 text-sm font-medium font-inter">Temperatura (°C)</Text>
              <Text className="text-blue-800 text-3xl font-bold mt-2 font-inter">{selectedPatient.lastReading.temp}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={{ backgroundColor: selectedPatient ? '#16A34A' : '#D1D5DB' }}
          className={`rounded-lg p-4 items-center ${selectedPatient ? "bg-blue-600" : "bg-gray-200 opacity-50"
            }`}
          disabled={!selectedPatient}
          onPress={async () => await handleSendData()}
        >

          <Text className={`font-medium font-inter ${selectedPatient ? "text-white" : "text-gray-500"
            }`}>Registrar Datos</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white rounded-xl p-4 shadow-sm ">
        <Text className="text-gray-500 text-sm font-inter">Estado de conexión:</Text>
        <Text className={`text-sm mt-1 font-inter ${mqttStatus === 'Connected' ? 'text-green-600' : 'text-red-600'
          }`}>{mqttStatus}</Text>
      </View>

      {mqttStatus !== 'Connected' && (
        <View className="flex-row gap-4">
          <TouchableOpacity
            className=" rounded-lg p-4 items-center"
            style={{ backgroundColor: '#16A34A' }}
            onPress={() => mqttClient.reconnect()}
          >
            <Text className="text-white font-medium font-inter">Reconectar MQTT</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PatientMonitor;
