import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ColorPicker({ changeColor }) {
    const [color, setColor] = useState(0);
    const Colors = [
        "#a2d2ff",
        "#d4a373",
        "#a7c957",
        "#ff8fab",
        "#c77dff",
        "#2ec4b6",
        "#ffea00"
    ];

    const colorHandler = () => {
        setColor((prev) => {
            const nextColor = (prev + 1) % Colors.length;
            changeColor(Colors[nextColor]);
            return nextColor;
        });
    }

    return (
        <TouchableOpacity style={{ ...styles.container, backgroundColor: Colors[color] }} onPress={colorHandler}>
            <View style={styles.container}></View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#0077b6',
        borderRadius: 10,

    },
});
