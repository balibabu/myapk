import { Alert } from "react-native";

export const Confirmation = async () => {
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
    return confirmDelete;
}