import { createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

export const saveTokenThunk = createAsyncThunk('user/setItemAsync', async (token) => {
    try {
        await SecureStore.setItemAsync('userToken', token);
        return token;
    } catch (error) {
        console.log('Error saving token to SecureStore:', error);
        return null;
    }
});

export const getTokenThunk = createAsyncThunk('user/getItemAsync', async () => {
    try {
        const token = await SecureStore.getItemAsync('userToken');
        return token;
    } catch (error) {
        console.log('Error getting token from SecureStore:', error);
        return null;
    }
});

export const deleteTokenThunk = createAsyncThunk('user/deleteItemAsync', async () => {
    try {
        await SecureStore.deleteItemAsync('userToken');
    } catch (error) {
        console.log('Error deleting token from SecureStore:', error);
    }
});