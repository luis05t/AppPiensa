import {
  CardioTechIcon,
  HistoryIcon,
  InformationIcon,
} from "@/assets/icons/icons";
import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          animation: "shift",
          tabBarActiveTintColor: "#7CB342",
          headerStyle: {
            backgroundColor: "#b1ffe0",
          },
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity className="flex-1 flex-row justify-end items-center mr-11 shadow-neutral-300">
              <CardioTechIcon size="xs" />
              <Text className="font-bold text-green-600">Cardio Tech+</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity className="flex-1 flex-row justify-end items-center mr-6 shadow-neutral-300">
              <InformationIcon color={"#43a047"} />
            </TouchableOpacity>
          ),
        }}
      >
        <Tabs.Screen
          name="history"
          options={{
            tabBarIcon: ({ color }) => <HistoryIcon color={color} />,
            title: "Historial",
          }}
        />
        <Tabs.Screen
          name="information"
          options={{
            tabBarIcon: ({ color }) => <InformationIcon color={color} />,
            title: "Información",
          }}
        />
      </Tabs>
    </View>
  );
}
