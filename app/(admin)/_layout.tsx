import { CardioTechIcon } from "@/assets/icons/icons";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Platform, Text } from "react-native";

export default function AdminLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          animation: "fade",
          headerStyle: {
            backgroundColor: "#b1ffe0",
          },
          headerTitle: "",
          headerLeft: () => (
            <View
              className={
                Platform.OS === "ios"
                  ? "flex-1 flex-row items-center"
                  : "flex-row space-x-2 mx-4 items-center"
              }
            >
              <CardioTechIcon size="xs" />
              <Text className="font-bold text-green-600">Cardio Tech+</Text>
            </View>
          ),
        }}
      >
        <Stack.Screen name="admin" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
