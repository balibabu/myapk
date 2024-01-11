import { Alert } from "react-native";
import { deleteNoteSql } from "../../../db/notedb";

export const onDelete = async (id) => {
    const confirmDelete = await new Promise((resolve) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this note?",
            [
                { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
                { text: "Delete", onPress: () => resolve(true) },
            ],
            { cancelable: true }
        );
    });

    if (!confirmDelete) return;
    deleteNoteSql(id);
}