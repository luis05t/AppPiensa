import { Diagnosis } from "@/interfaces/ListValues";
import { TouchableOpacity, View, Text } from "react-native";

export const RenderItem = ({ item }: { item: Diagnosis }) => (
  <TouchableOpacity className="bg-white rounded-xl p-4 my-3 shadow-sm shadow-neutral-300">
    <View className="flex-row justify-between mb-3">
      <Text className="text-base font-semibold text-neutral-800">
        {item.patientName}
      </Text>
      <Text className="text-xs text-neutral-500">
        {(item.date, "dd/MM/yyyy HH:mm")}
      </Text>
    </View>

    <View className="flex-row justify-between">
      <View className="items-center">
        <Text className="text-xs text-neutral-500 mb-1">Ritmo cardíaco</Text>
        <Text className="text-base font-medium text-emerald-600">
          {item.heartRate} lpm
        </Text>
      </View>

      <View className="items-center">
        <Text className="text-xs text-neutral-500 mb-1">Temperatura</Text>
        <Text className="text-base font-medium text-emerald-600">
          {item.temperature}°C
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);
