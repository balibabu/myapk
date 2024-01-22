import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Login } from "../services/api/auth";
import { useDispatch } from "react-redux";
import { saveTokenThunk } from "../states/userdata/userThunk";
import { GetNoteList } from "../services/api/Note";
import { batchInsertNotes } from "../states/noteapp/noteappSlice";
import { batchInsert } from "../services/db/noteSync";
export default function LoginPage({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [btnClicked, setBtnClicked] = useState(false);
    const dispatch = useDispatch();


    const handleLogin = async () => {
        setBtnClicked(true);
        if (!username || !password) {
            Alert.alert("Please enter both username and password");
            return;
        }

        try {
            const token = await Login(username, password);
            if (token) {
                dispatch(saveTokenThunk(token));
                const notes = await GetNoteList(token);
                dispatch(batchInsertNotes(notes));
                await batchInsert(notes);
                navigation.navigate('Notes');
            } else {
                Alert.alert("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            Alert.alert("An error occurred. Please try again later.");
        }
        setBtnClicked(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="username."
                    placeholderTextColor="#003f5c"
                    onChangeText={(username) => setUsername(username)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={btnClicked}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8093f1",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: "#ffddd2",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
});