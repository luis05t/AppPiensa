import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function WelcomeLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          animation: "fade_from_bottom",
          animationDuration: 300,
          animationMatchesGesture: true,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
