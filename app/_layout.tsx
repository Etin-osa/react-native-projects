import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
    const [loaded] = useFonts({
        BodoniModa_Bold: require('../assets/fonts/BodoniModa_48pt-Bold.ttf'),
        BodoniModa_ExtraBold: require('../assets/fonts/BodoniModa_48pt-ExtraBold.ttf'),
    })

    if (!loaded) {
        return null;
    }

    return (
        <GestureHandlerRootView>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(open-banking)/index" options={{ headerShown: false }} />
                <Stack.Screen name="(mood-selector)/index" options={{ headerShown: false }} />
                {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
            </Stack>
        </GestureHandlerRootView>
    );
}