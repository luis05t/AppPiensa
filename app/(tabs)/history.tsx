import { FlatList } from "react-native";
import TabsScreen from "@/components/TabsScreen";
import { RenderItem } from "@/components/RenderItem";
import { Diagnosis } from "@/interfaces/ListValues";
import { useEffect, useState } from "react";
import { http } from "@/services/http";
import { useAuth } from "@/hooks/useAuth";
import { Text } from "react-native";

const HistoryScreen = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { user } = useAuth();

  const fetchDiagnoses = async () => {
    try {
      const url =
        user?.role === "ADMIN"
          ? "/vital-signs"
          : `/vital-signs/${user?.userId}`;
      const data = await http.get<Diagnosis[]>(url);
      setDiagnoses(data);
    } catch (error) {
      console.error("Failed to fetch diagnoses", error);
    }
  };

  useEffect(() => {
    fetchDiagnoses();
  }, []);

  return (
    <TabsScreen>
      <FlatList
        data={diagnoses}
        renderItem={RenderItem}
        keyExtractor={(item) => item.vitalSignId}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-4">
            No diagnoses found
          </Text>
        }
        refreshing={refresh}
        onRefresh={() => {
          setRefresh(true);
          fetchDiagnoses().finally(() => setRefresh(false));
        }}
      />
    </TabsScreen>
  );
};

export default HistoryScreen;
