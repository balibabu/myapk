import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FloatButton } from './utils/FloatButton';
import { useDispatch } from 'react-redux';
import { addNoteThunk, updateNoteThunk } from '../../states/noteapp/noteappThunks';


const dummyDetails = { title: '', description: '', color: '#a2d2ff' }
export const Editor = (props) => {
	const [noteDetails, setNoteDetails] = useState(dummyDetails);
	const [color, setColor] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		if (props.route.params) {
			setNoteDetails(props.route.params);
		}
	}, [])


	const handleSaveNote = async () => {
		if (props.route.params) {
			console.log('update');
			dispatch(updateNoteThunk(noteDetails));
		} else {
			const id = new Date().getTime().toString();
			console.log('insert');
			dispatch(addNoteThunk({ id, ...noteDetails }));
		}
		props.navigation.goBack();
	};

	const changeColor = () => {
		setColor((prev) => {
			const nextColor = (prev + 1) % Colors.length;
			setNoteDetails((prev) => ({ ...prev, color: Colors[nextColor] }));
			return nextColor;
		});
	}

	return (
		<View style={styles.container}>
			<View style={{ ...styles.titleAndColorContainer, backgroundColor: noteDetails.color }}>
				<TextInput
					placeholder="Title                                           "
					value={noteDetails.title}
					onChangeText={(text) => setNoteDetails((prev) => ({ ...prev, title: text }))}
					style={styles.titleStyle}
				/>
				<TouchableOpacity style={{ borderRadius: 10, backgroundColor: noteDetails.color }} onPress={changeColor}>
					<View style={styles.colorPicker}></View>
				</TouchableOpacity>

			</View>
			<View style={{ ...styles.inputAreaStyle, backgroundColor: noteDetails.color }} onPress={() => console.log('hi')}>
				<TextInput
					value={noteDetails.description}
					onChangeText={(text) => setNoteDetails((prev) => ({ ...prev, description: text }))}
					multiline
					style={styles.descriptionStyle}
					placeholder={'description' + '\n'.repeat(50)}
				/>
			</View>
			<FloatButton title={'save'} onClick={handleSaveNote} />
		</View>
	);
};

const Colors = [
	"#a2d2ff",
	"#d4a373",
	"#a7c957",
	"#ff8fab",
	"#c77dff",
	"#2ec4b6",
	"#ffea00",
	"#ffc8dd",
	"#ffd6ff"
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#004E5A",
		padding: 15,
	},
	colorPicker: {
		width: 30,
		height: 30,
		borderWidth: 1,
		borderRadius: 10,
	},

	titleAndColorContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 5,
		paddingLeft: 15,
		backgroundColor: "skyblue",
		borderRadius: 10,
	},
	titleStyle: {
		fontSize: 22,
	},
	inputAreaStyle: {
		flex: 1,
		backgroundColor: "#a5d3fb",
		borderRadius: 10,
		padding: 5,
		paddingHorizontal: 10,
		marginTop: 7,
	},
	descriptionStyle: {
		textAlignVertical: 'top',
		fontSize: 17,
	},
});