import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, {
    scrollTo,
    useAnimatedReaction,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useSharedValue
} from 'react-native-reanimated'
import MaskedView from '@react-native-masked-view/masked-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const MOOD_GRADIENTS = [
    ['#FF6B9D', '#C44569'],
    ['#FFA07A', '#FF6347'],
    ['#98D8C8', '#6BCF7F'],
    ['#74B9FF', '#0984E3'],
    ['#A29BFE', '#6C5CE7'],
]

const MOOD_DATA = MOOD_GRADIENTS.map((gradient, index) => ({
    color: gradient[0],
    label: `Mood ${index + 1}`
}))

const BUTTON_CONTAINER_GAP = 9

type ButtonRowProps = {
    moodIndex: number
    variant?: 'outline' | 'filled'
}

const ButtonRow = ({ moodIndex, variant = 'outline' }: ButtonRowProps) => {
    return (
        <View style={styles.buttonRow}>
            {[0, 1, 2].map((btnIndex) => (
                <View 
                    key={btnIndex} 
                    style={[
                        styles.moodButton,
                        variant === 'outline' ? styles.moodButtonOutline : styles.moodButtonFilled,
                    ]}
                >
                    <Text 
                        style={[
                            styles.moodButtonText,
                            variant === 'outline' ? styles.moodButtonTextOutline : styles.moodButtonTextFilled
                        ]}
                    >
                        Mood {moodIndex * 3 + btnIndex + 1}
                    </Text>
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
                    {MOOD_DATA.map((item, index) => (
                        <View key={index} style={styles.topItemContainer}>
                            <View style={[styles.placeholderCard, { backgroundColor: item.color }]} />
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

                <View style={{ position: 'relative' }}>
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
                        {MOOD_DATA.map((_, index) => (
                            <View key={index} style={styles.bottomItemContainer}>
                                <View style={styles.topPlaceholder} />
                                <ButtonRow moodIndex={index} variant="outline" />
                            </View>
                        ))}
                    </Animated.ScrollView>

                    <MaskedView
                        style={{
                            transform: [{ translateY: -50 }],
                            pointerEvents: 'none',
                        }}
                        maskElement={
                            <View style={styles.maskView} />
                        }
                    >
                        <View style={{ backgroundColor: 'white' }}>
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
                                {MOOD_DATA.map((_, index) => (
                                    <View 
                                        key={index} 
                                        style={[
                                            styles.bottomItemContainer, 
                                            { flexDirection: 'row', justifyContent: 'center' }
                                        ]}
                                    >
                                        {[0, 1, 2].map((btnIndex) => 
                                            <View 
                                                style={{ 
                                                    flex: 1, 
                                                    justifyContent: 'center', 
                                                    alignItems: 'center' 
                                                }} 
                                                key={btnIndex}
                                            >
                                                <Text>Mood {index * 3 + btnIndex + 1}</Text>
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </Animated.ScrollView>
                        </View>
                    </MaskedView>
                </View>
                <View style={{ height: insets.bottom }} />
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
    bottomItemContainer: {
        width: SCREEN_WIDTH,
        paddingHorizontal: 10,
        gap: 20,
    },
    topPlaceholder: {
        height: 100, 
        backgroundColor: '#2A2D2E',
        borderRadius: 20,
        width: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: BUTTON_CONTAINER_GAP,
    },
    moodButton: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moodButtonOutline: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'transparent',
    },
    moodButtonFilled: {
        backgroundColor: 'transparent',
    },
    moodButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    moodButtonTextOutline: {
        color: 'white',
    },
    moodButtonTextFilled: {
        color: 'black',
    },
    replicaScroll: {
        height: 50,
        backgroundColor: 'transparent',
        pointerEvents: 'none',
    },
    maskView: { 
        height: 50, width: (SCREEN_WIDTH / 3) - 13, 
        pointerEvents: 'none', 
        marginHorizontal: 'auto', 
        backgroundColor: 'red', 
        borderRadius: 25
    }
})
