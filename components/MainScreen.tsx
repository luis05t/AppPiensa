import { ScreenProps } from "@/types/ScreenProps";
import { LinearGradient } from "expo-linear-gradient";

export default function MainScreen({ children }: ScreenProps) {
  return (
    <LinearGradient colors={["#b1ffe0", "#F0FDF4"]} className="flex-1 px-6">
      {children}
    </LinearGradient>
  );
}
