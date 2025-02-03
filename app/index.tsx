import { View, Text, TouchableOpacity } from "react-native";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import MainScreen from "../components/MainScreen";
import { CardioTechIcon } from "@/assets/icons/icons";
import { Link } from "expo-router";

export default function WelcomeScreen() {
  return (
    <MainScreen>
      <View className="justify-center items-center w-full top-32">
        <CardioTechIcon size="xl" />
      </View>
      <View className="flex-1 justify-center items-center w-full">
        <View className="justify-center content-center items-center mb-40 gap-4">
          <Text className="text-4xl font-bold text-gray-900 mb-2 text-center">
            Bienvenido a Cardio Tech+
          </Text>
          <Text className="text-lg text-gray-600 text-center px-8">
            Tu aplicación de bienestar y salud
          </Text>
        </View>
        <View className="w-full absolute bottom-14">
          <PrimaryButton text="Iniciar Sesión" href={"/(auth)/login"} />
          <SecondaryButton text="Crear una Cuenta" href={"/(auth)/register"} />
        </View>
      </View>
    </MainScreen>
  );
}
