import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { IconSizes } from "@/interfaces/LogoSizes";

const measureSize: IconSizes = {
  xs: 24,
  s: 40,
  m: 56,
  l: 72,
  xl: 154,
};

export const CardioTechIcon = ({ size }: { size: keyof IconSizes }) => {
  return (
    <MaterialIcons
      name="health-and-safety"
      size={measureSize[size]}
      color="#16A34A"
    />
  );
};

export const EyeIcon = ({
  size,
  showPassword,
}: {
  size: keyof IconSizes;
  showPassword: boolean;
}) => {
  return (
    <MaterialCommunityIcons
      name={showPassword ? "eye-off" : "eye"}
      size={measureSize[size]}
      color="#16A34A"
    />
  );
};

export const HistoryIcon = (props: any) => {
  return (
    <MaterialCommunityIcons
      name="account-box-multiple-outline"
      size={24}
      color="black"
      {...props}
    />
  );
};

export const InformationIcon = (props: any) => {
  return (
    <MaterialIcons name="info-outline" size={24} color="black" {...props} />
  );
};

export const MqttIcon = (props: any) => {
  return (
    <MaterialCommunityIcons
      name="lan-connect"
      size={24}
      color="black"
      {...props}
    />
  );
};
