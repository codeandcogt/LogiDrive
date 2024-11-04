import { InspectionCard } from "@/src/components/atoms/inspectionCard";
import { useInspection } from "@/src/hooks";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

export const InspectionScreen = () => {
  const { data, handleCamera } = useInspection();
  return (
    <SafeAreaView style={{ paddingTop: 25 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {data?.map((item, index) => (
        <InspectionCard key={index} data={item} onPress={handleCamera} />
      ))}
    </SafeAreaView>
  );
};
