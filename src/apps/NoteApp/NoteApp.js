import { useEffect, useState } from "react";
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Note from "./Note";
import { FloatButton } from "./utils/FloatButton";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotesThunk } from "../../states/noteapp/noteappThunks";

export default function NoteApp({ navigation }) {
    const notes = useSelector((state) => state.noteapp);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllNotesThunk());
    }, [])


    const renderNote = ({ item }) => (
        <Note key={item.id} note={item} navigation={navigation} />
    );


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={styles.loginBtn}><Text>Login For Cloud Backup</Text></View>
            </TouchableOpacity>
            <FlatList
                data={notes}
                keyExtractor={(note) => note.id.toString()}
                renderItem={renderNote}
            />
            <FloatButton title={'add'} onClick={() => navigation.navigate('Editor')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#354f52',
        flex: 1,
    },
    buttonStyle: {
        width: 70,
        height: 70,
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#0077b6',
        backgroundColor: '#90e0ef',
        justifyContent: 'center', // Center vertically
        alignItems: 'center',
    },
    loginBtn: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: 'blue'
    }
});