import { Stack } from "expo-router";

export default function App() {
  return (
    <Stack>
      <Stack.Screen name="historial" options={{ headerShown: false }} />
      <Stack.Screen name="information" options={{ headerShown: false }} />
    </Stack>
  );
}
