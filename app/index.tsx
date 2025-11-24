import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";

export default function index() {

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(open-banking)')
        }, 10);

        return () => clearTimeout(timer);
    }, [])

    return (
        <View></View>
    );
}
