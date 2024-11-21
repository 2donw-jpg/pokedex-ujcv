import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
      <Stack.Screen name="(profile)" options={{ headerShown: false }}/>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="scanner" />
      <Stack.Screen name="details" />
    </Stack>
  );
}
