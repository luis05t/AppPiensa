import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import AuthScreen from "@/components/AuthScreen";
import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";
import { CardioTechIcon } from "@/assets/icons/icons";
import PasswordInput from "@/components/Inputs/PasswordInput";
import PrimarySendButton from "@/components/Buttons/PrimarySendButton";
import MainTextInput from "@/components/Inputs/MainTextInput";
import { Link, useRouter } from "expo-router";
import { http } from "@/services/http";
import { Token } from "./login";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { keyboardVisible } = useKeyboardVisible();

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const { accessToken } = await http.post<Token>("/auth/register", {
        name,
        email,
        password,
      });
      if (accessToken) {
        Alert.alert("Registro Completado", "Ahora puedes iniciar sesión", [
          { text: "Aceptar" },
        ]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthScreen>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: keyboardVisible ? 100 : 20,
        }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={keyboardVisible}
      >
        <View className="flex-1 justify-center p-6">
          {(!keyboardVisible || Platform.OS === "ios") && (
            <View className="items-center mb-12">
              <CardioTechIcon size="m" />
              <Text className="text-4xl font-bold text-gray-900 mb-2">
                Cardio Tech+
              </Text>
              <Text className="text-lg text-gray-600">
                Tu Viaje De Bienestar Comienza Aquí
              </Text>
            </View>
          )}

          <View>
            <MainTextInput
              setTextValue={setName}
              textValue={name}
              placeHolder="Nombre"
            />
            <MainTextInput
              textValue={email}
              setTextValue={setEmail}
              placeHolder="Correo Electrónico"
            />
            <PasswordInput
              password={password}
              setPassword={setPassword}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
            />
            <PrimarySendButton
              handleFormSubmit={handleRegister}
              isLoading={isLoading}
              text="Registrarse"
            />
          </View>

          {!keyboardVisible && (
            <View className="mt-10 left-0 right-0 items-center">
              <View className="flex-row">
                <Text className="text-gray-600">Ya tienes una cuenta? </Text>
                <Link href={"/(auth)/login"} asChild replace>
                  <TouchableOpacity>
                    <Text className="text-green-600 font-semibold">
                      Iniciar Sesión
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </AuthScreen>
  );
}
