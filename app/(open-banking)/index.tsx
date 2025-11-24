import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from "react-native-safe-area-context";

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
    const scrollRef = useRef<ScrollView>(null);

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
            <ScrollView ref={scrollRef}>
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
                    {cards.map((card, i) => 
                        <Pressable 
                            key={card.id} 
                            style={[
                                styles.card, 
                                i > 0 && { marginTop: -40 },
                                i === cards.length -1 && styles.cardLast,
                                animated === card.id && { height: 400 }
                            ]}
                            onPress={() => {
                                if (animated === card.id) {
                                    setAnimated(-1)
                                    scrollRef.current?.scrollTo({ y: 0, animated: true })
                                    return;
                                }
                                setAnimated(card.id === animated ? -1 : card.id)
                                scrollRef.current?.scrollToEnd({ animated: true })
                            }}
                        ></Pressable>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
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
    },
    cardLast: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    }
});
