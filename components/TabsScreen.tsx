import { ScreenProps } from "@/types/ScreenProps";
import { LinearGradient } from "expo-linear-gradient";

export default function TabsScreen({ children }: ScreenProps) {
  return (
    <LinearGradient colors={["#b1ffe0", "#F0FDF4"]} className="flex-1 px-3">
      {children}
    </LinearGradient>
  );
}
