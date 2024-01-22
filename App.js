import NoteApp from './src/apps/NoteApp/NoteApp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Editor } from './src/apps/NoteApp/Editor';
import LoginPage from './src/Home/Login';
import { Provider } from 'react-redux';
import { store } from './src/states/store';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import createTables from './src/services/crud/note/startupActions';


const Stack = createStackNavigator();
export default function App() {
    useEffect(() => {
        createTables();
    }, [])

    return (
        <Provider store={store}>
            <StatusBar style='dark' />
            <NavigationContainer>
                <Stack.Navigator screenOptions={navStyle} initialRouteName='Notes'>
                    <Stack.Screen name='Login' component={LoginPage} />
                    <Stack.Screen name="Notes" component={NoteApp} />
                    <Stack.Screen name="Editor" component={Editor} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const navStyle = {
    headerStyle: { backgroundColor: '#415a77', height: 75 },
    headerTintColor: 'white',
    ...TransitionPresets.SlideFromRightIOS,
}