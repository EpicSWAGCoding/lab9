import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Auth from "../screens/Auth";
import Main from "../screens/Main";
import Registration from "../screens/Registration";
import MyProfile from "../screens/MyProfile";
import UpdateProfile from "../screens/UpdateProfile";
import TestAddDate from "../screens/TestAddDate";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Registration" component={Registration} />
                <Stack.Screen name="MyProfile" component={MyProfile} />
                <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
                <Stack.Screen name="TestAddDate" component={TestAddDate} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;