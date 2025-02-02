import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

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
    <LinearGradient
      colors={["#F0FDF4", "#97e7cf", "#F0FDF4"]}
      className="flex-1"
    >
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        className="flex-1"
      >
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
                <MaterialIcons
                  name="health-and-safety"
                  size={56}
                  color="#16A34A"
                  className="mb-6"
                />
                <Text className="text-4xl font-bold text-gray-900 mb-2">
                  HealthCare+
                </Text>
                <Text className="text-lg text-gray-600">
                  Your Wellness Journey Starts Here
                </Text>
              </View>
            )}

            {/* Formulario */}
            <View className="space-y-6">
              {/* Email Input */}
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

              {/* Password Input */}
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
                    <MaterialCommunityIcons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color="#16A34A"
                    />
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
                <View className="flex-row">
                  <Text className="text-gray-600">New to HealthCare+? </Text>
                  <TouchableOpacity>
                    <Text className="text-green-600 font-semibold">
                      Join Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
