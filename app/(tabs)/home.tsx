import { HomeScreen } from "@/src/screen";
import { SafeAreaView, Text, View, StatusBar, Platform, StyleSheet } from "react-native";

export default function Home() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={false}
      />
      <SafeAreaView style={styles.container}>
        <HomeScreen />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  }
});