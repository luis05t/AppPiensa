import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import { Link } from "expo-router";
import AuthScreen from "@/components/AuthScreen";
import { CardioTechIcon, EyeIcon } from "@/assets/icons/icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
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
                Your Wellness Journey Starts Here
              </Text>
            </View>
          )}

          <View className="space-y-6">
            <View className="bg-white rounded-lg border border-green-100">
              <TextInput
                placeholder="Email address"
                placeholderTextColor="#157759"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="px-6 py-4 text-gray-900 text-lg"
              />
            </View>

            <View className="bg-white rounded-lg border border-green-100">
              <View className="flex-row items-center px-6">
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#157759"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  className="flex-1 py-4 text-gray-900 text-lg"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="ml-2"
                >
                  <EyeIcon size="xs" showPassword={showPassword} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className="bg-green-600 rounded-lg p-4 items-center justify-center h-14 active:bg-green-700"
            >
              {isLoading ? (
                <Text className="text-white font-semibold text-lg">
                  Verifying...
                </Text>
              ) : (
                <Text className="text-white font-semibold text-lg">
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {!keyboardVisible && (
            <View className="mt-10 left-0 right-0 items-center">
              <View className="flex-row mb-5">
                <Text className="text-gray-600">Nuevo en Cardio Tech? </Text>
                <Link href={"/(auth)/register"} asChild>
                  <TouchableOpacity>
                    <Text className="text-green-600 font-semibold">
                      Únete Ahora
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>

              {/*TEST OF HISTORY SCREEN*/}
              <Link href={"/(tabs)/history"} asChild>
                <TouchableOpacity>
                  <Text className="text-green-200 font-semibold p-3 bg-lime-800 rounded-xl">
                    Ir a Historial
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          )}
        </View>
      </ScrollView>
    </AuthScreen>
  );
}
