import axios from "axios";
import { API_BASE_URL } from "../global/variables";

export async function GetNoteList(token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/note/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export async function AddNote(token, note) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/note/`,
            { ...note },
            {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            }
        );

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            console.error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function UpdateNote(token, newNote) {
    try {
        const response = await axios.put(`${API_BASE_URL}/note/id/${newNote.id}/`, {
            ...newNote
        }, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function DeleteNote(token, id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/note/id/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        if (response.status === 204) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function GetNoteDetail(token, id) {
    try {
        const response = await axios.get(`${API_BASE_URL}/note/id/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}