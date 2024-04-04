import {FC} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const Main:FC = () => {

    const navigation = useNavigation();

    return (
        <View className="flex items-center">
            <Text>Дома</Text>
            <TouchableOpacity onPress={() => navigation.navigate("MyProfile")} className='bg-orange-300 p-3 mt-4'>
                <Text className='text-center text-base text-white'>Мой профиль</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Main;