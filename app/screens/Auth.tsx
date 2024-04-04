import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import navigation from "../navigation/Navigation";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from "../firebase";
import {useState} from "react";
import firebase from "firebase/compat";
import auth = firebase.auth;
import {signInWithEmailAndPassword} from "firebase/auth"; // Импортируйте функцию аутентификации

const Auth = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = FIREBASE_AUTH;
    
    const handleLogin = async () => {
      try {
          const response = await signInWithEmailAndPassword(auth, email, password);
          console.log(response)
          navigation.navigate("Main")
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
                        value={email}
                        placeholder='Введите Email...'
                        className='border border-dotted p-2 text-gray-500 border-amber-400 mt-1'
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View className='mt-3'>
                    <Text className='text-gray-400'>ПАРОЛЬ:</Text>
                    <TextInput
                        value={password}
                        secureTextEntry
                        placeholder='Введите пароль...'
                        className='border text-gray-500 border-dotted p-2 border-amber-400 mt-1'
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <TouchableOpacity onPress={handleLogin} className='bg-orange-300 p-3 mt-4'>
                    <Text className='text-center text-base text-white'>Войти</Text>
                </TouchableOpacity>

                <View className='mt-6 flex-row justify-center'>
                    <Text className=''>Нету аккаунта? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                        <Text className='text-amber-500'>Создать аккаунт</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Auth;