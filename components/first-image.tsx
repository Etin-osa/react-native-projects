import { Image } from "expo-image";

export default function FirstImage () {
    return (
        <Image source={require("@/assets/images/person_1.jpg")} style={{ width: '100%', height: '100%' }} />
    );
}