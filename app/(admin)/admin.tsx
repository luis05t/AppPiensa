import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

interface Patient {
  id: string;
  name: string;
  age: number;
  lastReading?: {
    heartRate: number;
    temperature: number;
    timestamp: Date;
  };
}

interface VitalSigns {
  heartRate: number;
  temperature: number;
}

const AdminDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { id: "1", name: "Juan Pérez", age: 35 },
    { id: "2", name: "María García", age: 28 },
    { id: "3", name: "Carlos Rojas", age: 42 },
    { id: "4", name: "Luis Tinoco", age: 20 },
    { id: "5", name: "Samantha Gordillo", age: 26 },
    { id: "6", name: "Elkin Carriel", age: 19 },
    { id: "7", name: "Juan Gutierrez", age: 20 },
    { id: "8", name: "Damian Olivo", age: 21 },
  ]);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [vitals, setVitals] = useState<VitalSigns>({
    heartRate: 0,
    temperature: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      patient.age.toString().includes(searchQuery.trim())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedPatient) {
        const mockData = {
          heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
          temperature: Number(
            (Math.random() * (37.5 - 35.5) + 35.5).toFixed(1)
          ),
        };

        setVitals(mockData);
        updatePatientData(mockData);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedPatient]);

  const updatePatientData = (newData: VitalSigns) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === selectedPatient?.id
          ? { ...patient, lastReading: { ...newData, timestamp: new Date() } }
          : patient
      )
    );
  };

  const handleSendData = async () => {
    if (selectedPatient && vitals.heartRate > 0) {
      console.log("Datos enviados:", {
        patientId: selectedPatient.id,
        ...vitals,
      });
      setSelectedPatient(null);
      setVitals({ heartRate: 0, temperature: 0 });
    }
  };

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <View className="mb-4">
        <TextInput
          className="bg-white p-3 rounded-lg border border-gray-200"
          placeholder="Buscar paciente por nombre o edad..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Pacientes</Text>
        <FlatList
          data={filteredPatients}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`p-4 mb-2 rounded-lg mr-2 ${
                selectedPatient?.id === item.id ? "bg-green-200" : "bg-gray-300"
              }`}
              onPress={() => setSelectedPatient(item)}
            >
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-gray-600">Edad: {item.age}</Text>
                  {item.lastReading && selectedPatient?.id === item.id && (
                    <Text className="text-sm text-gray-500">
                      Último registro: {item.lastReading.heartRate} lpm -{" "}
                      {item.lastReading.temperature}°C
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="p-4">
              <Text className="text-gray-500">No se encontraron pacientes</Text>
            </View>
          }
        />
      </View>

      <View className="bg-white p-6 rounded-xl shadow-sm">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          {selectedPatient
            ? `Monitorizando a ${selectedPatient.name}`
            : "Seleccione un paciente"}
        </Text>

        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-gray-600 mb-1">Ritmo Cardíaco (lpm)</Text>
            <TextInput
              className="bg-gray-100 p-3 rounded-lg text-lg"
              value={vitals.heartRate.toString()}
              editable={false}
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-1">Temperatura (°C)</Text>
            <TextInput
              className="bg-gray-100 p-3 rounded-lg text-lg"
              value={vitals.temperature.toFixed(1)}
              editable={false}
            />
          </View>
        </View>

        <TouchableOpacity
          className={`p-4 rounded-lg items-center ${
            selectedPatient ? "bg-green-600" : "bg-gray-300"
          }`}
          disabled={!selectedPatient}
          onPress={handleSendData}
        >
          <Text className="text-white font-semibold text-lg">
            Registrar Datos
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminDashboard;
