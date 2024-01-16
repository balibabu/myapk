import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import convertTimestampToStringWithTime from "./utils/time";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../../services/crud/note/delete";

export default function Note(props) {
	const token = useSelector((state) => state.user.token);
	const dispatch = useDispatch();

	const onNoteClick = () => {
		props.navigation.navigate('Editor', { ...props.note });
	}
	const deleteHandler = () => {
		console.log('deleting');
		deleteNote(props.note.id, token, dispatch, props.note.action === undefined); //undefined means synced
	}
	// warning props.note.action !== undefined [synced or unsynced]
	return (
		<TouchableWithoutFeedback onPress={onNoteClick}
			onLongPress={deleteHandler}>
			<View style={{ ...styles.noteCard, backgroundColor: props.color }}>
				<Text style={styles.title}>{props.note.title}</Text>
				<Text style={styles.createdTime}>{convertTimestampToStringWithTime(props.note.id)}</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}


const styles = StyleSheet.create({
	noteCard: {
		height: 60,
		paddingHorizontal: 15,
		marginTop: 7,
		marginHorizontal: 15,
		borderRadius: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	createdTime: {
		fontSize: 10,
		// color: 'grey',
		position: 'absolute',
		right: 10,
		bottom: 5
	},
});
