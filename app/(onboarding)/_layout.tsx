import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="intro" />
      <Stack.Screen name="features" />
      <Stack.Screen name="terms" />
    </Stack>
  );
}