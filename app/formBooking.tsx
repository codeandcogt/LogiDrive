import { FormBookingScreen } from "@/src/screen";
import { View, StatusBar, SafeAreaView } from "react-native";

export default function FormBooking() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
      />
      <View style={{flex: 1}}>
        <FormBookingScreen/>
      </View>
    </SafeAreaView>
  );
}