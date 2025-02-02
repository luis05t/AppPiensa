import { Link } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={["#b1ffe0", "#F0FDF4"]}
      className="flex-1 justify-center items-center p-8"
    >
      <StatusBar style="dark" />
      <View className="flex-1 justify-center items-center w-full">
        <View className="items-center mb-40 gap-4">
          <MaterialIcons
            name="health-and-safety"
            size={72}
            color="#16A34A"
            className="mb-6"
          />
          <Text className="text-4xl font-bold text-gray-900 mb-2 text-center">
            Bienvenido a Cardio Tech
          </Text>
          <Text className="text-lg text-gray-600 text-center px-8">
            Tu aplicación de bienestar y salud
          </Text>
        </View>

        {/* Botones de acción */}
        <View className="w-full space-y-4 absolute bottom-10">
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity className="bg-green-600 rounded-lg p-2 items-center justify-center h-14 active:bg-green-700">
              <Text className="text-white font-semibold text-lg">
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(auth)/register" asChild>
            <TouchableOpacity className="border-2 border-green-600 rounded-lg p-2 items-center justify-center h-14 active:bg-green-50">
              <Text className="text-green-600 font-semibold text-lg">
                Crear una cuenta
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}
