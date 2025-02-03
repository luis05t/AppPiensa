import TabsScreen from "@/components/TabsScreen";
import { View, Text, ScrollView } from "react-native";

const medicalInformation = [
  {
    title: "Ritmo Cardíaco",
    content: `El ritmo cardíaco normal en adultos oscila entre 60 y 100 latidos por minuto (lpm). Valores persistentemente por encima de 100 lpm (taquicardia) o por debajo de 60 lpm (bradicardia) requieren evaluación médica.`,
    subpoints: [
      "Medición en reposo",
      "Factores que afectan: estrés, actividad física, cafeína",
      "Signos de alerta: mareos, palpitaciones fuertes",
    ],
  },
  {
    title: "Temperatura Corporal",
    content: `La temperatura corporal normal varía entre 36.5°C y 37.2°C. Se considera fiebre a partir de 38°C e hipotermia por debajo de 35°C.`,
    subpoints: [
      "Medición oral/axilar: +0.5°C diferencia",
      "Factores de variación: hora del día, ciclo menstrual",
      "Síntomas peligrosos: escalofríos, confusión, sudoración excesiva",
    ],
  },
  {
    title: "Interpretación de Resultados",
    content: `Los valores deben analizarse en contexto clínico. Considere:`,
    subpoints: [
      "Historial médico del paciente",
      "Medicamentos actuales",
      "Síntomas acompañantes",
      "Tendencias temporales",
    ],
  },
];

export default function InformationScreen() {
  return (
    <ScrollView className="flex-1 bg-white p-6">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-neutral-800 mb-2">
          Guía Médica
        </Text>
        <Text className="text-lg text-neutral-600">
          Información esencial para interpretar tus mediciones
        </Text>
      </View>

      {medicalInformation.map((section, index) => (
        <View key={index} className="mb-8">
          <View className="mb-4 border-b border-neutral-200 pb-2">
            <Text className="text-2xl font-semibold text-emerald-700">
              {section.title}
            </Text>
          </View>

          <Text className="text-base text-neutral-700 leading-6 mb-4">
            {section.content}
          </Text>

          {section.subpoints && (
            <View className="ml-4 space-y-2">
              {section.subpoints.map((point, pointIndex) => (
                <View key={pointIndex} className="flex-row items-start">
                  <Text className="text-emerald-600 mr-2">•</Text>
                  <Text className="text-base text-neutral-700 flex-1">
                    {point}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      <View className="mt-8 pb-12">
        <Text className="text-sm text-neutral-500 text-center">
          Consulte siempre a un profesional médico certificado para diagnóstico
          y tratamiento.
        </Text>
      </View>
    </ScrollView>
  );
}
