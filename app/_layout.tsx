import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

    return (
        <GestureHandlerRootView>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(open-banking)/index" options={{ headerShown: false }} />
                {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
            </Stack>
        </GestureHandlerRootView>
    );
}
/*
<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
</ThemeProvider>
*/
