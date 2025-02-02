import { FlatList } from "react-native";
import TabsScreen from "@/components/TabsScreen";
import { RenderItem } from "@/components/RenderItem";
import { Diagnosis } from "@/interfaces/ListValues";

const mockDiagnoses: Diagnosis[] = [
  {
    id: "1",
    patientName: "Juan Pérez",
    heartRate: 75,
    temperature: 36.5,
    date: new Date(2024, 2, 15),
  },
  {
    id: "2",
    patientName: "María García",
    heartRate: 92,
    temperature: 37.8,
    date: new Date(2024, 2, 14),
  },
];

export default function HistoryScreen() {
  return (
    <TabsScreen>
      <FlatList
        data={mockDiagnoses}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
      />
    </TabsScreen>
  );
}
