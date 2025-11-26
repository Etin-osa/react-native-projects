import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { ReduceMotion, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const cards = [
    {
        id: 1,
        title: 'Play Station',
        subTitle: 'Games',
        randomDay: daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)],
        amountToday: '-$281.50',
        totalAmount: '$637.55',
        color: '#EBCBF1',
        iconColor: '#d8b2ea',
        iconName: 'playstation'
    },
    {
        id: 2,
        title: 'Amazon',
        subTitle: 'Products',
        randomDay: daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)],
        amountToday: '-$1234',
        totalAmount: '-$6637.70',
        color: '#eef1ab',
        iconColor: '#e1e985',
        iconName: 'amazon'
    },
    {
        id: 3,
        title: 'Spotify Family',
        subTitle: 'Entertainment',
        randomDay: daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)],
        amountToday: '-$26',
        totalAmount: '$2349.55',
        color: '#ad79f0',
        iconColor: '#9a6de0',
        iconName: 'spotify'
    },
    {
        id: 4,
        title: 'Shopify',
        subTitle: 'Business',
        randomDay: daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)],
        amountToday: '-$25.55',
        totalAmount: '$637.55',
        color: '#c9d1f0',
        iconColor: '#b0b9e0',
        iconName: 'shopify'
    },
]

export default function index() {
    const [animated, setAnimated] = useState(-1)
    const scrollRef = useRef<ScrollView>(null)
    const insets = useSafeAreaInsets()
    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 7, backgroundColor: '#FAFAFA' }}>
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <ProfileView 
                            leftView={
                                <View style={[styles.profile, { width: 57, height: 57, borderWidth: 2, borderColor: 'white' }]}>
                                </View>
                            } 
                            rightView={
                                <View style={[styles.profile, styles.profileBottom]}>
                                </View>
                            }
                        />
                        <View style={styles.headerBtn}>
                            <AntDesign name="plus" size={15} color="black" />
                        </View>
                    </View>
                    <View>
                        <Entypo name="chevron-thin-down" size={24} color="black" />
                    </View>
                </View>

                <View style={{ marginTop: 30, marginBottom: 40 }}>
                    <Text style={styles.subHeader}>Expenses</Text>
                    <Text style={styles.title}>Week</Text>
                </View>

                <View>
                    {cards.map((card, i) => <ExpenseCard 
                        key={card.id} 
                        index={i} 
                        scrollRef={scrollRef} 
                        animated={animated}
                        setAnimated={setAnimated}
                        card={card}
                    />)}
                </View>
            </ScrollView>
            <StatusBar style="dark" />
        </SafeAreaView>
    );
}

const ProfileView = ({ leftView, rightView }: { 
    leftView?: React.ReactNode
    rightView?: React.ReactNode
}) => (
    <View style={styles.profiles}>
        {leftView}
        {rightView}
    </View>
)

const ExpenseCard = ({ index, scrollRef, animated, card, setAnimated }: { 
    index: number, 
    scrollRef: React.RefObject<ScrollView | null>,
    animated: number,
    setAnimated: React.Dispatch<React.SetStateAction<number>>
    card: typeof cards[0]
}) => {
    const height = useSharedValue(200)
    const opacity = useSharedValue(0)
    const daysMemoed = useMemo(() => daysOfWeek.map(_ => Math.random() * 200), [])
    const opacityAnimated = useAnimatedStyle(() => ({
        opacity: opacity.value 
    }), [opacity])

    useEffect(() => {
        if (animated === 2 || animated === 3) {
            scrollRef.current?.scrollToEnd({ animated: true })
        }

        height.value = withSpring(index === animated ? index === cards.length - 1 ? 460 : 490 : index === cards.length - 1 ? 180 : 200, {
            stiffness: 940,
            damping: 80,
            mass: 4,
            overshootClamping: false,
            energyThreshold: 6e-9,
            velocity: 0,
            reduceMotion: ReduceMotion.System,
        })

        opacity.value = withTiming(index === animated ? 1 : 0, { duration: 300 })
    }, [animated])

    return (
        <Animated.View
            style={{
                ...styles.card,
                marginTop: index > 0 ? -40 : 0,
                ...(index === cards.length -1 ? styles.cardLast : {}),
                backgroundColor: card.color,
                height
            }}
        >
            <Pressable
                style={{ flex: 1 }}
                onPress={() => { setAnimated(index === animated ? -1 : index) }}
            >
                <ProfileView
                    leftView={
                        <View style={[styles.profile, { backgroundColor: card.iconColor }]}>
                            <FontAwesome5 name={card.iconName} size={26} color="black" />
                        </View>
                    }
                    rightView={index % 2 === 1 ? <></> :
                        <View style={[styles.profile, styles.profileBottom]}>
                            {/* <Image source={require("@/assets/images/person_1.jpg")} style={{ width: '100%', height: '100%' }} /> */}
                        </View>
                    }
                />
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.cardSubTitle}>{card.subTitle}</Text>
                        <Text style={styles.cardTitle}>{card.title}</Text>
                    </View>
                    <View>
                        <Text style={[styles.cardSubTitle, { textAlign: 'right' }]}>{card.randomDay}</Text>
                        <Text style={[styles.cardTitle, { textAlign: 'right' }]}>{card.amountToday}</Text>
                    </View>
                </View>
                <Animated.View style={[styles.chart, opacityAnimated]}>
                    {daysOfWeek.map((day, ind) => (
                        <View style={{ flex: 1 }} key={day}>
                            <View style={{ width: '100%', height: 200, justifyContent: 'flex-end' }}>
                                <View style={{
                                    ...styles.eachChart, 
                                    height: daysMemoed[ind],
                                    backgroundColor: day === card.randomDay ? '#000' : 'transparent'
                                }}></View>
                            </View>
                            <Text style={{ textAlign: 'center' }}>{day.slice(0, 3)}</Text>
                        </View>
                    ))}
                </Animated.View>
                <Animated.View style={[styles.totalView, opacityAnimated]}>
                    <Text style={styles.cardSubTitle}>All Time:</Text>
                    <Text style={styles.cardTitle}>{card.totalAmount}</Text>
                </Animated.View>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profiles: {
        flexDirection: 'row',
        width: 100,
    },
    profile: {
        width: 55,
        height: 55,
        borderRadius: 100,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    profileBottom: {
        transform: [{ translateX: -15 }],
        zIndex: -1 
    },
    headerBtn: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subHeader: {
        fontSize: 26,
        color: 'gray',
    },
    title: {
        fontSize: 100,
        lineHeight: 100
    },
    card: {
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        height: 200,
        backgroundColor: 'lightgray',
        borderColor: 'white',
        overflow: 'hidden',
        padding: 10,
    },
    cardHeader: { 
        marginVertical: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 5 
    },
    cardLast: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    cardTitle: {
        fontSize: 30,
        lineHeight: 35,
    },
    cardSubTitle: {
        fontSize: 16,
        color: '#00000049'
    },
    chart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 5,
        gap: 8,
        marginTop: 20,
        marginBottom: 15
    },
    eachChart: {
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 4
    },
    totalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5
    }
});
/**
 * const newRef = useRef();

    const onButtonPress = () => {
    newRef?.current?.measureInWindow( (fx, fy, width, height) => {
        console.log('X offset to frame: ' + fx);
        console.log('Y offset to frame: ' + fy);
        console.log('Component width is: ' + width);
        console.log('Component height is: ' + height);
    });        
    };
 */