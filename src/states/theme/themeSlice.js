import { createSlice } from "@reduxjs/toolkit"

const initialTheme = {
    mode: 'light',
    dark: {
        nav: {
            background: '#02405e',
            text: 'white'
        },
        page: {
            background: '#023047',
            text: 'white'
        }
    },
    light: {
        nav: {
            background: '#219ebc',
            text: 'black'
        },
        page: {
            background: '#8ecae6',
            text: 'black'
        }
    }
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: { ...initialTheme.dark },
    reducers: {
        changeMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            state.nav = initialTheme[state.mode].nav;
            state.page = initialTheme[state.mode].page;
        },
        changeColor: (state, action) => {
            const { key1, key2, value } = action.payload;
            state[key1][key2] = value;
        },

    }
})

export const { changeColor } = themeSlice.actions;
export default themeSlice.reducer;