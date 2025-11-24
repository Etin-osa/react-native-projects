import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { ReduceMotion, useSharedValue, withSpring } from "react-native-reanimated";

const cards = [
    {
        id: 1,
        title: 'Play Station',
    },
    {
        id: 2,
        title: 'Amazon',
    },
    {
        id: 3,
        title: 'Spotify Family',
    },
    {
        id: 4,
        title: 'Taco Bell'
    }
]

export default function index() {
    const [animated, setAnimated] = useState(-1)
    const scrollRef = useRef<ScrollView>(null)

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 7 }}>
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <View style={styles.profiles}>
                            <View style={styles.profile}></View>
                            <View style={[styles.profile, styles.profileBottom]}></View>
                        </View>
                        <View style={styles.headerBtn}>
                            <AntDesign name="plus" size={15} color="black" />
                        </View>
                    </View>
                    <View>
                        <Entypo name="chevron-thin-down" size={24} color="black" />
                    </View>
                </View>

                <View style={{ marginVertical: 25 }}>
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
                    />)}
                </View>
            </ScrollView>
            <StatusBar style="dark" />
        </SafeAreaView>
    );
}

const ExpenseCard = ({ index, scrollRef, animated, setAnimated }: { 
    index: number, 
    scrollRef: React.RefObject<ScrollView | null>,
    animated: number,
    setAnimated: React.Dispatch<React.SetStateAction<number>>
}) => {
    const height = useSharedValue(index === animated ? 400 : 200)

    useEffect(() => {
        if (animated === 2 || animated === 3) {
            scrollRef.current?.scrollToEnd({ animated: true })
        } 
        
        if (animated === -1) {
            scrollRef.current?.scrollTo({ y: 0, animated: true })
        }

        height.value = withSpring(index === animated ? 400 : 200, {
            stiffness: 940,
            damping: 80,
            mass: 4,
            overshootClamping: false,
            energyThreshold: 6e-9,
            velocity: 0,
            reduceMotion: ReduceMotion.System,
        })
    }, [animated])

    return (
        <Animated.View
            style={{
                ...styles.card,
                marginTop: index > 0 ? -40 : 0,
                ...(index === cards.length -1 ? styles.cardLast : {}),
                height
            }}
        >
            <Pressable
                style={{ flex: 1 }}
                onPress={() => { setAnimated(index === animated ? -1 : index) }}
            >

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
        width: 85,
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'gray',
        borderWidth: 2,
        borderColor: 'white',
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
        borderWidth: 3,
        borderColor: 'white',
        overflow: 'hidden',
    },
    cardLast: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
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