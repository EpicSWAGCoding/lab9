import {FC, useEffect, useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {onAuthStateChanged, signInWithEmailAndPassword, User} from "firebase/auth";
import {FIREBASE_AUTH, FIRESTORE_DB} from "../firebase";
import {useNavigation} from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";

const TestAddDate:FC = () => {

    const navigation = useNavigation();

    const addDate = async () => {
        try {
            await addDoc(collection(FIRESTORE_DB, "User"), {
                role: "Jo pa321",
                uid: "12235sdf"
            });
            console.log("Данные успешно добавлены в базу данных!");
        } catch (error) {
            console.error("Ошибка при добавлении данных в базу данных:", error);
        }
    }

    return (
        <View className="flex items-center">
            <Text>Тест для добавления записи</Text>
            <TouchableOpacity onPress={addDate} className='bg-orange-300 p-3 mt-4'>
                <Text className='text-center text-base text-white'>Добавить данные</Text>
            </TouchableOpacity>
        </View>
    );
}

export default TestAddDate;