import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function SecondaryButton({
  text,
  href,
}: {
  text: string;
  href: React.ComponentProps<typeof Link>["href"];
}) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity className="border-2 border-green-600 rounded-lg p-2 items-center justify-center h-14 active:bg-green-50 my-2">
        <Text className="text-green-600 font-semibold text-lg">{text}</Text>
      </TouchableOpacity>
    </Link>
  );
}
