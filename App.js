import NoteApp from './src/apps/NoteApp/NoteApp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Editor } from './src/apps/NoteApp/Editor';
import LoginPage from './src/Home/Login';
import { Provider } from 'react-redux';
import { store } from './src/states/store';
import { useEffect } from 'react';
import { createTableSql as createTableSqlSync } from './src/services/db/noteSync';
import { createTableSql } from './src/services/db/noteUnsync';


const Stack = createStackNavigator();
export default function App() {
    useEffect(() => {
        createTableSqlSync();
        createTableSql();
    }, [])

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle: { backgroundColor: '#415a77' },
                    headerTintColor: 'white',
                }}
                    initialRouteName='Notes'>
                    <Stack.Screen name='Login' component={LoginPage} />
                    <Stack.Screen name="Notes" component={NoteApp} />
                    <Stack.Screen name="Editor" component={Editor} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
