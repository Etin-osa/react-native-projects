import { BellCurveMask } from '@/components/bell-curve-mask'
import { CurveLines } from '@/components/curve-lines'
import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import MaskedView from '@react-native-masked-view/masked-view'
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, {
    interpolateColor,
    scrollTo,
    useAnimatedReaction,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useDerivedValue,
    useSharedValue
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

type MoodSection = {
    moods: [string, string, string]
    gradient: [string, string]
}

const MOOD_SECTIONS: MoodSection[] = [
    {
        moods: ["Joyful", "Cheerful", "Content"],
        gradient: ['#FF6B9D', '#C44569']
    },
    {
        moods: ["Nostalgic", "Curious", "Uncertain"],
        gradient: ['#FFA07A', '#FF6347']
    },
    {
        moods: ["Satisfied", "Calm", "Reflective"],
        gradient: ['#baece0', '#0c5e1c']
    },
    {
        moods: ["Melancholy", "Worried", "Disappointed"],
        gradient: ['#b0d5fa', '#032138']
    },
    {
        moods: ["Lonely", "Frustrated", "Happiness"],
        gradient: ['#171538', '#6C5CE7']
    },
    {
        moods: ["Heartbroken", "Despairing", "Devastated"],
        gradient: ['#b35050', '#273b7a']
    }
]

type ButtonRowProps = {
    moods: string[]
    variant?: 'outline' | 'filled'
}

const ButtonRow = ({ moods }: ButtonRowProps) => {
    return (
        <View style={styles.buttonRow}>
            {moods.map((mood, btnIndex) => (
                <View key={btnIndex} style={styles.moodButton}>
                    <Text style={styles.moodButtonText}>{mood}</Text>
                </View>
            ))}
        </View>
    )
}

export default function MoodSelector() {
    const insets = useSafeAreaInsets()
    const scrollX = useSharedValue(0)
    const activeScroll = useSharedValue(0)
    
    const topScrollRef = useAnimatedRef<Animated.ScrollView>()
    const bottomScrollRef = useAnimatedRef<Animated.ScrollView>()
    const replicaScrollRef = useAnimatedRef<Animated.ScrollView>()

    const onScrollTop = useAnimatedScrollHandler({
        onScroll: (event) => {
            if (activeScroll.value === 1) {
                scrollX.value = event.contentOffset.x
            }
        },
        onBeginDrag: () => {
            activeScroll.value = 1
        },
        onMomentumEnd: () => {
            activeScroll.value = 0
        },
    })

    const onScrollBottom = useAnimatedScrollHandler({
        onScroll: (event) => {
            if (activeScroll.value === 2) {
                scrollX.value = event.contentOffset.x
            }
        },
        onBeginDrag: () => {
            activeScroll.value = 2
        },
        onMomentumEnd: () => {
            activeScroll.value = 0
        }
    })

    const inputRange = MOOD_SECTIONS.map((_, index) => index * SCREEN_WIDTH)
    const outputRange1 = MOOD_SECTIONS.map(section => section.gradient[0])
    const outputRange2 = MOOD_SECTIONS.map(section => section.gradient[1])

    const gradientColors = useDerivedValue(() => {
        const c1 = interpolateColor(scrollX.value, inputRange, outputRange1)
        const c2 = interpolateColor(scrollX.value, inputRange, outputRange2)
        return [c1, c2]
    })

    useAnimatedReaction(
        () => scrollX.value,
        (currentScrollX) => {
            if (activeScroll.value === 1) {
                scrollTo(bottomScrollRef, currentScrollX, 0, false)
            } else if (activeScroll.value === 2) {
                scrollTo(topScrollRef, currentScrollX, 0, false)
            }
            scrollTo(replicaScrollRef, currentScrollX, 0, false)
        }
    )

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            
            <View style={styles.topSection}>
                <Animated.ScrollView
                    ref={topScrollRef}
                    horizontal
                    snapToInterval={SCREEN_WIDTH}
                    decelerationRate="fast"
                    bounces={true}
                    overScrollMode="always"
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScrollTop}
                    scrollEventThrottle={16}
                    // contentContainerStyle={styles.scrollContent}
                >
                    {MOOD_SECTIONS.map((section, index) => (
                        <View key={index} style={styles.topItemContainer}>
                            <View style={[styles.placeholderCard, { backgroundColor: section.gradient[0] }]} />
                        </View>
                    ))}
                </Animated.ScrollView>
                
                <SafeAreaView edges={['top']} style={styles.safeArea}>
                    <View style={styles.navigationHeader}>
                        <TouchableOpacity style={styles.circleButton}>
                            <Ionicons name="arrow-back" size={24} color="#11181C" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={[styles.circleButton, { paddingHorizontal: 20 }]}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
            
            <View style={styles.bottomSection}>
                <Text style={styles.headerText}>Select your today's mood</Text>

                <View style={styles.scrollContainer}>
                    <View style={styles.floatingMaskContainer} pointerEvents="none">
                        <BellCurveMask width={SCREEN_WIDTH} height={100} />
                    </View>

                    <Animated.ScrollView
                        ref={bottomScrollRef}
                        horizontal
                        snapToInterval={SCREEN_WIDTH}
                        decelerationRate="fast"
                        bounces={true}
                        overScrollMode="always"
                        showsHorizontalScrollIndicator={false}
                        onScroll={onScrollBottom}
                        scrollEventThrottle={16}
                    >
                        {MOOD_SECTIONS.map((section, index) => (
                            <View key={index} style={styles.bottomItemContainer}>
                                <CurveLines/>
                                <ButtonRow moods={section.moods} />
                            </View>
                        ))}
                    </Animated.ScrollView>
                                        
                    <MaskedView
                        style={{
                            transform: [{ translateY: -51 }],
                            pointerEvents: 'none',
                        }}
                        maskElement={
                            <View style={styles.maskView} />
                        }
                    >
                        <Canvas style={StyleSheet.absoluteFill}>
                            <Rect x={0} y={0} width={SCREEN_WIDTH} height={52}>
                                <LinearGradient
                                    start={vec(0, 0)}
                                    end={vec(SCREEN_WIDTH, 52)}
                                    colors={gradientColors}
                                />
                            </Rect>
                        </Canvas>
                        <Animated.ScrollView
                            ref={replicaScrollRef}
                            horizontal
                            snapToInterval={SCREEN_WIDTH}
                            decelerationRate="fast"
                            bounces={true}
                            overScrollMode="always"
                            showsHorizontalScrollIndicator={false}
                            pointerEvents="none"
                            scrollEnabled={false}
                            style={styles.replicaScroll}
                        >
                            {MOOD_SECTIONS.map((section, index) => (
                                <View 
                                    key={index} 
                                    style={[
                                        styles.bottomItemContainer, 
                                        { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10, pointerEvents: 'none' },
                                        
                                    ]}
                                >
                                    {section.moods.map((mood, btnIndex) => 
                                        <View 
                                            style={{ 
                                                flex: 1, 
                                                justifyContent: 'center', 
                                                alignItems: 'center',
                                                pointerEvents: 'none',
                                                borderRadius: 25,
                                            }} 
                                            key={btnIndex}
                                        >
                                            <Text>{mood}</Text>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </Animated.ScrollView>
                    </MaskedView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    topSection: {
        height: SCREEN_HEIGHT * 0.55,
        backgroundColor: Colors.light.background,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
    },
    safeArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    navigationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    circleButton: {
        padding: 12,
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: '#7f8081',
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#11181C',
    },
    bottomSection: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        paddingTop: 30,
    },
    headerText: {
        fontSize: 40,
        width: '70%',
        fontWeight: '600',
        color: Colors.dark.text,
        textAlign: 'center',
        marginBottom: 20,
        marginHorizontal: 'auto'
    },
    scrollContainer: {
        position: 'relative',
        paddingBottom: 10
    },
    topItemContainer: {
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 100,
    },
    placeholderCard: {
        width: '100%',
        height: 340,
        borderRadius: 30,
        opacity: 0.9,
    },
    floatingMaskContainer: {
        position: 'absolute',
        top: 0, 
        left: 0,
        width: SCREEN_WIDTH,
        height: 100, 
        zIndex: 10,
        pointerEvents: 'none',
    },
    bottomItemContainer: {
        width: SCREEN_WIDTH,
        gap: 9,
    },
    topPlaceholder: {
        height: 100, 
        backgroundColor: '#2A2D2E',
        borderRadius: 20,
        width: '100%',
        overflow: 'hidden',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 9,
        paddingHorizontal: 10
    },
    moodButton: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'transparent',
    },
    moodButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },
    replicaScroll: {
        height: 52,
        backgroundColor: 'transparent',
        pointerEvents: 'none',
    },
    maskView: { 
        height: 52, 
        width: (SCREEN_WIDTH / 3) - 10, 
        // width: SCREEN_WIDTH, 
        pointerEvents: 'none', 
        marginHorizontal: 'auto', 
        backgroundColor: 'red', 
        borderRadius: 25
    }
})
