import { FlatList } from "react-native";
import TabsScreen from "@/components/TabsScreen";
import { RenderItem } from "@/components/RenderItem";
import { Diagnosis } from "@/interfaces/ListValues";

const mockDiagnoses: Diagnosis[] = [
  {
    id: "1",
    patientName: "Juan Pérez",
    heartRate: 170,
    temperature: 36.5,
    date: new Date(2025, 0, 28),
  },
  {
    id: "4",
    patientName: "Luis Tinoco",
    heartRate: 71,
    temperature: 35.1,
    date: new Date(2025, 0, 14),
  },
  {
    id: "5",
    patientName: "Ana Rodríguez",
    heartRate: 120,
    temperature: 38.2,
    date: new Date(2025, 1, 14),
  },
  {
    id: "6",
    patientName: "Carlos Gómez",
    heartRate: 58,
    temperature: 36.7,
    date: new Date(2025, 1, 18),
  },
  {
    id: "7",
    patientName: "Marta Hernández",
    heartRate: 83,
    temperature: 34.9,
    date: new Date(2025, 2, 2),
  },
  {
    id: "8",
    patientName: "Pedro Vargas",
    heartRate: 130,
    temperature: 37.1,
    date: new Date(2025, 2, 5),
  },
  {
    id: "9",
    patientName: "Sofía Castro",
    heartRate: 45,
    temperature: 36.0,
    date: new Date(2025, 2, 10),
  },
  {
    id: "11",
    patientName: "Diego Rojas",
    heartRate: 110,
    temperature: 35.5,
    date: new Date(2025, 2, 20),
  },
  {
    id: "12",
    patientName: "Valeria Méndez",
    heartRate: 72,
    temperature: 36.8,
    date: new Date(2025, 2, 25),
  },
];

export default function HistoryScreen() {
  console.log(mockDiagnoses[0].date);
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
