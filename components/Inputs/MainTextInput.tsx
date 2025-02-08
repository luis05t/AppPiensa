import { MainTextInputProps } from "@/interfaces/MainTextInputProps";
import { View, TextInput } from "react-native";

export default function MainTextInput({
  placeHolder,
  textValue,
  setTextValue,
}: MainTextInputProps) {
  return (
    <View className="flex-row items-center h-16 bg-white rounded-lg border border-green-100 mb-6">
      <TextInput
        placeholder={placeHolder}
        placeholderTextColor="#157759"
        value={textValue}
        onChangeText={setTextValue}
        keyboardType="email-address"
        className="flex-1 text-gray-900 text-lg px-6 py-2"
      />
    </View>
  );
}
