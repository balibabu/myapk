import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import convertTimestampToStringWithTime from "./utils/time";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../../services/crud/note/delete";
import { Confirmation } from "./utils/alert";
import { getNotesIdsTime, getReqNotes } from "../../services/api/Note";

let epochTime, cloudImg;
export default function Note(props) {
	const token = useSelector((state) => state.user.token);
	const dispatch = useDispatch();


	if (props.isSynced) {
		epochTime = new Date(props.note.created_time).getTime();
		cloudImg = require('../../../assets/cloud_synced.png');
	} else {
		cloudImg = require('../../../assets/cloud_unsynced.png');
		epochTime = props.note.id;
	}

	const onNoteClick = () => {
		props.navigation.navigate('Editor', { ...props.note });
	}
	const deleteHandler = async () => {
		console.log('deleting');
		const status = await Confirmation();
		if (status) {
			deleteNote(props.note.id, token, dispatch, props.isSynced);
		}
	}
	return (
		<TouchableWithoutFeedback onPress={onNoteClick}
			onLongPress={deleteHandler}>
			<View style={{ ...styles.noteCard, backgroundColor: props.note.color }}>
				<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{props.note.title}</Text>
				<Image source={cloudImg} style={styles.image} />
				<Text style={styles.createdTime}>{convertTimestampToStringWithTime(epochTime)}</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}


const styles = StyleSheet.create({
	noteCard: {
		height: 50,
		paddingHorizontal: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomColor: '#dcdcdc',
		borderBottomWidth: 1,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	createdTime: {
		fontSize: 10,
		color: 'grey',
		position: 'absolute',
		right: 10,
		bottom: 5
	},
	image: {
		width: 20,
		height: 20,
	}
});
