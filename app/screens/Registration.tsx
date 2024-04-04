import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import {FIREBASE_AUTH, FIRESTORE_DB} from "../firebase";
import {addDoc, collection} from "firebase/firestore";

const Registration = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = FIREBASE_AUTH;
    const handleRegister = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response)
            navigation.navigate("Auth")
        } catch (error) {
            console.log(email, password)
            console.log(error)
        }
    }

    return (
        <View className='flex-1 justify-center items-center bg-white'>
            <StatusBar style='auto' />
            <Text className='text-center mt-3 text-2xl font-light text-orange-300'>
                EEgorov.INC
            </Text>
            {/* Additional components goes here */}
            <View className='mt-5 mx-5'>
                <View>
                    <Text className='text-gray-400'>EMAIL:</Text>
                    <TextInput
                        placeholder='Введите Email...'
                        value={email}
                        className='border border-dotted p-2 text-gray-500 border-amber-400 mt-1'
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View className='mt-3'>
                    <Text className='text-gray-400'>ПАРОЛЬ:</Text>
                    <TextInput
                        secureTextEntry
                        value={password}
                        placeholder='Введите пароль...'
                        className='border text-gray-500 border-dotted p-2 border-amber-400 mt-1'
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <TouchableOpacity onPress={handleRegister} className='bg-orange-300 p-3 mt-4'>
                    <Text className='text-center text-base text-white'>Зарегистрироваться</Text>
                </TouchableOpacity>

                <View className='mt-6 flex-row justify-center'>
                    <Text className=''> Есть аккаунт? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
                        <Text className='text-amber-500'>Войти</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Registration;