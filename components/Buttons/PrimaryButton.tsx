import { ExternalPathString, Link, RelativePathString } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function PrimaryButton({
  text,
  href,
}: {
  text: string;
  href: React.ComponentProps<typeof Link>["href"];
}) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity className="bg-green-600 rounded-lg p-2 items-center justify-center h-14 active:bg-green-700 my-2">
        <Text className="text-white font-semibold text-lg">{text}</Text>
      </TouchableOpacity>
    </Link>
  );
}
