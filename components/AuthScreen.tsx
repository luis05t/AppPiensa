import { ScreenProps } from "@/types/ScreenProps";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function AuthScreen({ children }: ScreenProps) {
  return (
    <LinearGradient
      colors={["#F0FDF4", "#97e7cf", "#F0FDF4"]}
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        className="flex-1"
      >
        {children}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
