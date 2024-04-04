import Navigation from "./app/navigation/Navigation";
import {LogBox} from "react-native";
import * as Updates from 'expo-updates'
import {useEffect} from "react";

export default function App() {

    async function onFetchUpdateAsync() {
        try {
            const update = await Updates.checkForUpdateAsync();

            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    useEffect(() => {
        onFetchUpdateAsync
    }, [])

    return (
        <Navigation />
    )
}

LogBox.ignoreAllLogs()