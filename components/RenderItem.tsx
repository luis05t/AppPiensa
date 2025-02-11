import { Diagnosis } from "@/interfaces/ListValues";
import { View, Text } from "react-native";

export const RenderItem = ({ item }: { item: Diagnosis }) => (
  <View className="bg-white rounded-xl p-4 mt-3 shadow-sm shadow-neutral-300">
    <View className="flex-row justify-between mb-3">
      <Text className="text-base font-semibold text-neutral-800">
        {item.user.name}
      </Text>
      <Text className="text-xs text-neutral-500">
        {JSON.stringify(item.timestamp).slice(1, 11)}
      </Text>
    </View>

    <View className="flex-row justify-between">
      <View className="items-center">
        <Text className="text-xs text-neutral-500 mb-1">Ritmo cardíaco</Text>
        <Text className="text-base font-medium text-emerald-600">
          {item.BPM} lpm
        </Text>
      </View>

      <View className="items-center">
        <Text className="text-xs text-neutral-500 mb-1">Temperatura</Text>
        <Text className="text-base font-medium text-emerald-600">
          {item.temp}°C
        </Text>
      </View>
    </View>
  </View>
);
