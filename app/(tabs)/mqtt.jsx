import { envConfig } from '@/config/environment';
import { useMqtt } from '@/context/MqttProvider';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const MttqScreen = () => {
  const [max30102Data, setMax30102Data] = useState('');
  const [mlx90614Data, setMlx90614Data] = useState('');
  const [lastTopicReceived, setLastTopicReceived] = useState('N/A');

  const { mqttClient, mqttData, mqttStatus, mqttError, subscribeToTopic } = useMqtt();

  useEffect(() => {
    subscribeToTopic(envConfig.MQTT_TOPICS, { qos: envConfig.MQTT_QOS });
  }, []);

  useEffect(() => {
    if (mqttData?.topic) {
      setLastTopicReceived(new Date().toLocaleString());
    }
  }, [mqttData?.topic]);

  useEffect(() => {
    if (mqttData?.message && mqttData?.topic) {
      const messageStr = mqttData.message.toString();
      const topicStr = mqttData.topic.toString();
      try {
        if (topicStr === 'esp32LuisTinoco/mlx90614') {
          const parsedData = JSON.parse(messageStr);
          console.log("MLX90614 Data:", parsedData);
          setMlx90614Data(parsedData);
        } else if (topicStr === 'esp32LuisTinoco/max30102') {
          const parsedData = JSON.parse(messageStr);
          console.log("MAX30102 Data:", parsedData);
          setMax30102Data(parsedData);
        }
      } catch (error) {
        console.error("Error al parsear JSON:", error);
      }
    }
  }, [mqttData]);

  return (
    <View style={styles.container}>
      <StatusBar style={'dark'} />
      <View style={styles.statusContainer}>
        <Text style={styles.label}>[Connection Status]</Text>
        <Text style={styles.value}>{mqttStatus}</Text>
      </View>

      <View>
        <Text style={styles.label}>[Topic]</Text>
        <Text style={styles.value}>{mqttData?.topic ?? 'N/A'}</Text>
        <View style={styles.dataLabelContainer}>
          <Text style={styles.label}>[Data]</Text>
          <View style={styles.dataContainer}>
            <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
              <Text style={styles.dataLabel}>BPM:</Text>
              <Text style={styles.dataValue}>{max30102Data.BPM}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
              <Text style={styles.dataLabel}>Temperature:</Text>
              <Text style={styles.dataValue}>{mlx90614Data.temp}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.label}>[Date Last Topic Received]</Text>
        <Text style={styles.value}>{lastTopicReceived}</Text>
      </View>

      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>{mqttError?.type ?? '[Error:N/A]'}</Text>
        <Text style={styles.errorMessage}>{mqttError?.msg ?? ''}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="MQTT-CONNECT" onPress={() => mqttClient.reconnect()} />
        <Button title="MQTT-DISCONNECT" onPress={() => mqttClient.end()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  statusContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  dataLabelContainer: {
    marginVertical: 20,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10
  },
  dataLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  dataValue: {
    fontSize: 16,
  },
  dateContainer: {
    marginBottom: 20,
  },
  errorContainer: {
    marginBottom: 20,
  },
  errorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MttqScreen;
