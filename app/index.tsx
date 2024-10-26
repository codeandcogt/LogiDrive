import { SplashScreenCustom } from "@/src/screen";
import { useSessionStore } from "@/src/store";
import { useFonts } from "expo-font";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function App() {
    // const {session}= useSessionStore()
    const [isLoading, setIsLoading] = useState(true);
  
    const [fontsLoaded] = useFonts({
        "Urbanist-Black": require("../assets/fonts/Urbanist-Black.ttf"),
        "Urbanist-Bold": require("../assets/fonts/Urbanist-Bold.ttf"),
        "Urbanist-ExtraBold": require("../assets/fonts/Urbanist-ExtraBold.ttf"),
        "Urbanist-Medium": require("../assets/fonts/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../assets/fonts/Urbanist-Regular.ttf"),
        "Urbanist-SemiBold": require("../assets/fonts/Urbanist-SemiBold.ttf"),
    });

    useEffect(() => {
        if (fontsLoaded) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 2000); // 2 segundos

            return () => clearTimeout(timer);
        }
    }, [fontsLoaded]);
  
    if (!fontsLoaded || isLoading) {
        return <SplashScreenCustom />;
    } 
  
    return <Redirect href={"/login"} />;
}