import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const FloatButton = ({title,onClick}) => {
  return (
    <TouchableOpacity style={styles.floatingButtonStyle} onPress={onClick}>
      <Text style={styles.buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    floatingButtonStyle: {
		padding:10,
		position: 'absolute',
		bottom: 20,
		right: 20,
		borderRadius: 20,
		borderWidth: 4,
		borderColor: '#588157',
		backgroundColor: '#06d6a0',
	  },
	  buttonTextStyle: {
		fontSize: 20,
		fontWeight: 'bold',
	  },
});
