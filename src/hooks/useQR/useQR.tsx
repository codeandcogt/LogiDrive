import { useRouter } from "expo-router";

export const useQR = () => {
    const router = useRouter();


    const handleBack =()=>{
        router.replace("/map")
    }
    
    return { handleBack }
}
