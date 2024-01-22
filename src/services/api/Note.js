import axios from "axios";
import { API_BASE_URL } from "./_baseUrl";

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
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
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
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function DeleteNote(token, id) {
    console.log('id', id);
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
        console.log('inside api', error);
        return false;
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


export async function getNotesIdsTime(token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/note/sync/`, {
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

export async function getReqNotes(token, ids) {
    try {
        const response = await axios.get(`${API_BASE_URL}/note/ids/`, {
            headers: {
                'Authorization': `Token ${token}`,
                'ids': ids
            },
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}