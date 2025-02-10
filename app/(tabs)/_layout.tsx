import {
  CardioTechIcon,
  HistoryIcon,
  InformationIcon,
  MqttIcon,
} from "@/assets/icons/icons";
import { Link, Tabs, useRouter } from "expo-router";
import React from "react";
import { View, Text, Platform, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";

export default function TabsLayout() {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <>
      <Tabs
        screenOptions={{
          animation: "shift",
          tabBarStyle: { backgroundColor: "#F0FDF4" },
          tabBarActiveTintColor: "#7CB342",
          headerStyle: {
            backgroundColor: "#b1ffe0",
          },
          headerTitle: "",
          headerRight: () =>
            user?.role === "ADMIN" ? (
              <View className="justify-center flex-row items-center">
                <Link href={"/(admin)/admin"} asChild>
                  <TouchableOpacity className="mr-4">
                    <MaterialIcons
                      name="admin-panel-settings"
                      size={24}
                      color="#16A34A"
                    />
                  </TouchableOpacity>
                </Link>
                <TouchableOpacity
                  className="mr-4"
                  onPress={async () => {
                    Alert.alert("Cerrar sesión", "¿Estás seguro?", [
                      {
                        text: "Cancelar",
                        style: "cancel",
                      },
                      {
                        text: "Cerrar sesión",
                        onPress: async () => {
                          await logout();
                          router.replace("/");
                        },
                      },
                    ]);
                  }}
                >
                  <MaterialIcons name="logout" size={24} color="#16A34A" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                className="mr-4"
                onPress={async () => {
                  await logout();
                  router.replace("/");
                }}
              >
                <MaterialIcons name="logout" size={24} color="#16A34A" />
              </TouchableOpacity>
            ),
          headerLeft: () => (
            <View
              className={
                Platform.OS === "ios"
                  ? "flex-1 flex-row justify-end items-center mr-11"
                  : "flex-row space-x-2 mx-4 items-center"
              }
            >
              <CardioTechIcon size="xs" />
              <Text className="font-bold text-green-600">Cardio Tech+</Text>
            </View>
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
        <Tabs.Screen
          name="mqtt"
          options={{
            tabBarIcon: ({ color }) => <MqttIcon color={color} />,
            title: "Mqtt",
          }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}
