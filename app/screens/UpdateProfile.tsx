import {FC, useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { FIREBASE_AUTH } from "../firebase";
import {updateProfile} from "firebase/auth"
import {signInWithEmailAndPassword} from "firebase/auth";

const UpdateProfile:FC = () => {

    const navigation = useNavigation();

    const auth = FIREBASE_AUTH;

    const hundleUpdate = async () => {
        try {
            if (auth.currentUser) {
                const response = await updateProfile(auth.currentUser, {
                    displayName: name
                });
            }
            navigation.navigate("MyProfile")
        } catch (error) {
            console.log(error)
        }
    }

    const [name, setName] = useState('');

    return (
        <View className="flex items-center">
            <Text className='text-gray-400'>Введите ваше имя:</Text>
            <TextInput
                value={name}
                placeholder='Введите имя...'
                className='border border-dotted p-2 text-gray-500 border-amber-400 mt-1'
                onChangeText={(text) => setName(text)}
            />
            <TouchableOpacity onPress={hundleUpdate} className='bg-orange-300 p-3 mt-4'>
                <Text className='text-center text-base text-white'>Обновить профиль</Text>
            </TouchableOpacity>
        </View>
    );
}

export default UpdateProfile;