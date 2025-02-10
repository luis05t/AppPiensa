import { envConfig } from '@/config/environment';
import { useMqtt } from '@/context/MqttProvider';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

let dateLastTopicRecived = 'N/A';

const MttqScreen = () => {
	const { mqttClient, mqttData, mqttStatus, mqttError, subscribeToTopic } = useMqtt();

	useEffect(() => {
		subscribeToTopic(envConfig.MQTT_TOPICS, { qos: envConfig.MQTT_QOS });
	}, []);

	const lastTopicRecived = (topic) => {
		if (topic) {
			dateLastTopicRecived = (new Date()).toLocaleString();
		}
		return dateLastTopicRecived;
	};
	const messageStr = mqttData?.message ? mqttData.message.toString() : null;
	let jsonData = null;
	if (messageStr) {
		try {
			jsonData = JSON.parse(messageStr);
			console.log("SpO2:", jsonData.SpO2);
			console.log("BPM:", jsonData.BPM);
		} catch (error) {
			console.error("Error al parsear JSON:", error);
		}
	}
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
						<Text style={styles.dataLabel}>BPM:</Text>
						<Text style={styles.dataValue}>{jsonData?.BPM}</Text>
					</View>
				</View>
			</View>

			<View style={styles.dateContainer}>
				<Text style={styles.label}>[Date Last Topic Received]</Text>
				<Text style={styles.value}>{lastTopicRecived(mqttData?.topic)}</Text>
			</View>

			<View style={styles.errorContainer}>
				<Text style={styles.errorLabel}>{mqttError?.type ?? '[Error:N/A]'}</Text>
				<Text style={styles.errorMessage}>{mqttError?.msg ?? ''}</Text>
			</View>

			<View style={styles.buttonContainer}>
				<Button title='MQTT-CONNECT' onPress={() => mqttClient.reconnect()} />
				<Button title='MQTT-DISCONNECT' onPress={() => mqttClient.end()} />
			</View>
		</View>
	);
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: '#fff',
		paddingTop: 30
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
		justifyContent: 'flex-start',
		marginTop: 10,
	},
	dataLabel: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#16A34A',
	},
	dataValue: {
		fontSize: 16,
		paddingLeft: 10,
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
