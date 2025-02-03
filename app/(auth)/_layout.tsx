import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          animation: "fade_from_bottom",
          animationDuration: 300,
          animationMatchesGesture: true,
        }}
      >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
