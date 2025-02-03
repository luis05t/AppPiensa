import React, { useEffect } from "react";
import { View, Text, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export const CustomAlert = ({
  visible,
  title,
  message,
  onClose,
}: CustomAlertProps) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="bg-white rounded-2xl p-6 items-center w-full max-w-xs">
          <MaterialIcons
            name="notifications"
            size={40}
            color="#16a34a"
            className="mb-4"
          />

          <Text className="text-xl font-bold text-center text-gray-900 mb-2">
            {title}
          </Text>

          <Text className="text-base text-center text-gray-600">{message}</Text>
        </View>
      </View>
    </Modal>
  );
};
