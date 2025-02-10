import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AuthScreen from "@/components/AuthScreen";
import { CardioTechIcon } from "@/assets/icons/icons";
import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";
import EmailInput from "@/components/Inputs/MainTextInput";
import PasswordInput from "@/components/Inputs/PasswordInput";
import PrimarySendButton from "@/components/Buttons/PrimarySendButton";
import { http } from "@/services/http";
import { useAuth } from "@/hooks/useAuth";

export interface Token {
  userId: string;
  accessToken: string;
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { keyboardVisible } = useKeyboardVisible();
  const router = useRouter();
  const { loadUser } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const { accessToken } = await http.post<Token>("/auth/login", {
        email,
        password,
      });
      if (accessToken) {
        await loadUser();
        router.replace("/(tabs)/history");
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
          paddingBottom: keyboardVisible ? 80 : 20,
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

          <View className="space-y-6">
            <EmailInput
              textValue={email}
              setTextValue={setEmail}
              placeHolder="Correo Electrónico"
            />

            <PasswordInput
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            <PrimarySendButton
              handleFormSubmit={handleLogin}
              isLoading={isLoading}
            />
          </View>

          {!keyboardVisible && (
            <View className="mt-10 left-0 right-0 items-center">
              <View className="flex-row mb-5">
                <Text className="text-gray-600">Nuevo en Cardio Tech? </Text>
                <Link href={"/(auth)/register"} asChild replace>
                  <TouchableOpacity>
                    <Text className="text-green-600 font-semibold">
                      Únete Ahora
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
