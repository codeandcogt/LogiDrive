import { VehicleReservationCard } from "@/src/components";
import { useTracking } from "@/src/hooks";
import { SafeAreaView, StatusBar, View } from "react-native";

export const TranckingScreen = () => {
  const { data, handleAccepte } = useTracking();
  return (
    <SafeAreaView style={{ flex: 1, paddingTop:20 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {data?.map((item, index) => (
        <VehicleReservationCard
          key={index}
          item={item}
          onPress={()=>handleAccepte(item)}
          style={{ marginBottom: 20 }}
        />
      ))}
    </SafeAreaView>
  );
};
