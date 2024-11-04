import { Stack, Redirect } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="login">
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
