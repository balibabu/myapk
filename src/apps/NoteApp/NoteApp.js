import { useEffect, useState } from "react";
import { Button, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Note from "./Note";
import { FloatButton } from "./utils/FloatButton";
import { useDispatch, useSelector } from "react-redux";
import { uploadUnsyncedNotes } from "../../services/crud/note/manualSync";
import { fetchNotesFromTable, getNetworkStats, syncWithCloud } from "../../services/crud/note/startupActions";

export default function NoteApp({ navigation }) {
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.noteapp);
    const [online, setOnline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getNetworkStats(dispatch, setOnline);
        fetchNotesFromTable(dispatch);
    }, [])

    async function uploadHandler() {
        setIsLoading(true);
        await uploadUnsyncedNotes(notes.unsynced, dispatch, token);
        setIsLoading(false);

    }

    async function downloadHandler() {
        setIsLoading(true);
        await syncWithCloud(notes, token, dispatch);
        setIsLoading(false);
    }


    const renderNote = ({ item }) => (
        <Note key={item.id} note={item} navigation={navigation} isSynced={item.action === undefined} />
    );

    return (
        <View style={styles.container}>
            {!(token && online) && <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={styles.loginBtn}><Text>Login For Cloud Backup</Text></View>
            </TouchableOpacity>}

            <FlatList
                data={[...notes.unsynced.filter((note) => note.action !== 'delete'), ...notes.synced]}
                keyExtractor={(note) => note.id.toString()}
                renderItem={renderNote}
            />
            <TouchableOpacity onPress={uploadHandler} disabled={isLoading}><Text style={{ ...styles.loginBtn, backgroundColor: 'green' }}>Upload Unsynced</Text></TouchableOpacity>
            <TouchableOpacity onPress={downloadHandler} disabled={isLoading}><Text style={{ ...styles.loginBtn, backgroundColor: 'skyblue' }}>Fetch Latest</Text></TouchableOpacity>
            {isLoading && <Image source={require('../../../assets/loading.png')} style={styles.image} />}
            <FloatButton title={'add'} onClick={() => navigation.navigate('Editor')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#354f52',
        flex: 1,
    },
    loginBtn: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: 'blue'
    },
    image: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 15,
        right: 95,
        zIndex: 1,
    }
});