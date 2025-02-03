import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

export interface PrimarySendButtonProps {
  handleFormSubmit: () => void;
  isLoading: boolean;
  text?: string;
}

export default function PrimarySendButton({
  handleFormSubmit,
  isLoading,
  text = "Iniciar Sesión",
}: PrimarySendButtonProps) {
  return (
    <TouchableOpacity
      onPress={handleFormSubmit}
      disabled={isLoading}
      className="bg-green-600 rounded-lg p-4 items-center justify-center h-14 active:bg-green-700"
    >
      {isLoading ? (
        <Text className="text-white font-semibold text-lg">Cargando...</Text>
      ) : (
        <Text className="text-white font-semibold text-lg">{text}</Text>
      )}
    </TouchableOpacity>
  );
}
