import { Image } from "expo-image";

export default function SecondImage () {
    return (
        <Image source={require("@/assets/images/person_2.jpg")} style={{ width: '100%', height: '100%' }} />
    );
}