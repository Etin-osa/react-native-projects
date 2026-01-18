import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { AppProvider } from '@/hooks/lfc-app-context';
import 'react-native-reanimated';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
    const [loaded] = useFonts({
        BodoniModa_ExtraBold: require('../assets/fonts/BodoniModa_48pt-ExtraBold.ttf'),
    })

    if (!loaded) {
        return null;
    }

    return (
        <GestureHandlerRootView>
            <AppProvider>
                <KeyboardProvider>
                    <Stack>
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen name="(open-banking)/index" options={{ headerShown: false }} />
                        <Stack.Screen name="(mood-selector)/index" options={{ headerShown: false }} />
                        <Stack.Screen name="(life-time-counter)/index" options={{ headerShown: false }} />
                        {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
                    </Stack>
                </KeyboardProvider>
            </AppProvider>
        </GestureHandlerRootView>
    );
}