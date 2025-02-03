import { EyeIcon } from "@/assets/icons/icons";
import { PasswordInputProps } from "@/interfaces/PasswordInputProps";
import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";

export default function PasswordInput({
  password,
  setPassword,
  showPassword,
  setShowPassword,
}: PasswordInputProps) {
  return (
    <View className="flex-row items-center h-16 bg-white rounded-lg border border-green-100 mb-6">
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#157759"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        className="flex-1 text-gray-900 text-lg px-6 py-0"
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        className="mr-6"
      >
        <EyeIcon size="xs" showPassword />
      </TouchableOpacity>
    </View>
  );
}
