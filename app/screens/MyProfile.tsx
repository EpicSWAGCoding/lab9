import {FC, useEffect, useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {onAuthStateChanged, signInWithEmailAndPassword, User} from "firebase/auth";
import {FIREBASE_AUTH, FIRESTORE_DB} from "../firebase";
import {useNavigation} from "@react-navigation/native";
import {addDoc, collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";

const MyProfile:FC = () => {

    const navigation = useNavigation();

    const auth = FIREBASE_AUTH;
    const user = auth.currentUser;
    if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
    }

    const [name, setName] = useState(user?.displayName);
    const [po4ta, setPo4ta] = useState(user?.email);
    const [photo, setPhoto] = useState(user?.photoURL);
    const [emailVer, setEmailVer] = useState(user?.emailVerified);
    const [id, setId] = useState(user?.uid);

    // const [user, setUser] = useState<User | null>(null);
    // const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('user', user);

        })
    }, [])

    const [roleUser, setRoleUser] = useState()
    const [docId, setDocId] = useState("")

    const citiesRef = collection(FIRESTORE_DB, "User");

    const q = query(citiesRef, where("uid", "==", user?.uid));

    const Zapros = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setDocId(doc.id);
        });
    }

    const getUsers = async () => {
        try {
            console.log(docId)
            const docRef = doc(FIRESTORE_DB, "User", docId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                console.log("Document data:", userData);
                if (userData && userData.role) {
                    setRoleUser(userData.role); // Устанавливаем значение роли в состояние
                } else {
                    console.log("Role not found in document!");
                    }
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addDateUser = async () => {
        try {
            await addDoc(collection(FIRESTORE_DB, "User"), {
                role: "user",
                uid: id
            });
            console.log("Данные успешно добавлены в базу данных!");
        } catch (error) {
            console.error("Ошибка при добавлении данных в базу данных:", error);
        }
    }

    return (
        <View className="flex items-center">
            <Text>Мой профиль</Text>
            <View className='flex flex-col justify-center items-center space-x-2'>
                <Text className='text-gray-400'>displayName: {name}</Text>
                <Text className='text-gray-400'>email: {po4ta}</Text>
                <Text className='text-gray-400'>photoURL: {photo}</Text>
                <Text className='text-gray-400'>emailVerified: {emailVer}</Text>
                <Text className='text-gray-400'>uid: {id}</Text>
                <Text className='text-gray-400'>Role: {roleUser}</Text>

            </View>
            <TouchableOpacity onPress={addDateUser} className='bg-orange-300 p-3 mt-4'>
                <Text className='text-center text-base text-white'>Нажать что бы добавить пользователя в бд</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Zapros} className='bg-orange-300 p-3 mt-4'>
                <Text className='text-center text-base text-white'>Нажать что бы получить uid вошедшего пользователя</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={getUsers} className='bg-orange-300 p-3 mt-4'>
                <Text className='text-center text-base text-white'>Нажать что бы появилась роль у пользователя</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("UpdateProfile")} className='bg-orange-300 p-3 mt-4'>
                <Text className='text-center text-base text-white'>Обновить профиль</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={() => navigation.navigate("TestAddDate")} className='bg-orange-300 p-3 mt-4'>*/}
            {/*    <Text className='text-center text-base text-white'>TestAddDate</Text>*/}
            {/*</TouchableOpacity>*/}
            {roleUser === "admin" && (
                <View>
                    <Text>
                        ЭТО ПАНЕЛЬКА ТОЛЬКО ДЛЯ АДМИНА
                    </Text>
                </View>
            )}
        </View>
    );
}

export default MyProfile;