import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Note from "./Note";
import { FloatButton } from "./utils/FloatButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotesThunk, syncNoteThunk } from "../../states/noteapp/noteappThunks";
import { getTokenThunk } from "../../states/userdata/userThunk";
import NetInfo from '@react-native-community/netinfo';

export default function NoteApp({ navigation }) {
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.noteapp);
    const [online, setOnline] = useState(false);

    useEffect(() => {
        dispatch(getAllNotesThunk());
        dispatch(getTokenThunk());
        NetInfo.fetch().then(state => {
            setOnline(state.isConnected)
        });
    }, [])


    const renderNote = ({ item }) => (
        <Note key={item.id} note={item} navigation={navigation} />
    );


    return (
        <View style={styles.container}>
            {!token && <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={styles.loginBtn}><Text>Login For Cloud Backup</Text></View>
            </TouchableOpacity>}

            <FlatList
                data={notes}
                keyExtractor={(note) => note.id.toString()}
                renderItem={renderNote}
            />

            {online ?
                <TouchableOpacity onPress={() => dispatch(syncNoteThunk(token))}>
                    <View style={styles.loginBtn}><Text>sync</Text></View>
                </TouchableOpacity> : <Text>you are offline</Text>
            }
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