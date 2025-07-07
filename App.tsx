
import React, { useEffect, useContext } from 'react';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TasksContext, TasksProvider } from './context/TasksContext';
import * as Notifications from 'expo-notifications';
import TodoListScreen from './screens/TodoListScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get permissions for notifications!');
    return;
  }
}

export default function AppWrapper() {
  return (
    <TasksProvider>
      <App />
    </TasksProvider>
  );
}

function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const { theme } = useContext(TasksContext);

  const paperTheme =
    theme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  const navigationTheme =
    theme === 'dark'
      ? {
          ...NavigationDarkTheme,
          colors: {
            ...NavigationDarkTheme.colors,
            primary: paperTheme.colors.primary,
            background: '#121212',
            card: paperTheme.colors.elevation.level2,
          },
        }
      : {
          ...NavigationDefaultTheme,
          colors: {
            ...NavigationDefaultTheme.colors,
            primary: paperTheme.colors.primary,
            card: paperTheme.colors.elevation.level2,
          },
        };

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator>
          <Stack.Screen name="To-Do List" component={TodoListScreen} />
          <Stack.Screen name="Task Details" component={TaskDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}