import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import convertTimestampToStringWithTime from "./utils/time";
import { useDispatch } from "react-redux";
import { deleteNoteThunk } from "../../states/noteapp/noteappThunks";

export default function Note(props) {
	const dispatch = useDispatch();

	const onNoteClick = () => {
		props.navigation.navigate('Editor', { ...props.note });
	}
	return (
		<TouchableWithoutFeedback onPress={onNoteClick} onLongPress={() => dispatch(deleteNoteThunk(props.note.id))}>
			<View style={{ ...styles.noteCard, backgroundColor: props.note.color }}>
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
