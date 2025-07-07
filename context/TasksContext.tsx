
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { LayoutAnimation, UIManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Todo } from '../types';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


interface TasksContextData {
  tasks: Todo[];
  addTask: (title: string, dueDate?: Date) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newTitle: string, newDueDate?: Date) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const TasksContext = createContext<TasksContextData>({} as TasksContextData);

export const TasksProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [tasks, setTasks] = useState<Todo[]>([]);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // --- Data Persistence Logic (Filled in) ---
    useEffect(() => {
        const loadTasks = async () => {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) setTasks(JSON.parse(storedTasks));
        };
        loadTasks();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    
    // --- Theme Toggle ---
    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    // --- Per-Task Notification Scheduler ---
    const scheduleNotificationForTask = async (task: Todo) => {
        if (!task.dueDate) return;
        const identifier = task.id;
        
        await Notifications.scheduleNotificationAsync({
            identifier,
            content: {
                title: "Task Reminder! ⏰",
                body: task.title,
                sound: true,
            },
            trigger: new Date(task.dueDate),
        });
    };

    const cancelNotificationForTask = async (taskId: string) => {
        await Notifications.cancelScheduledNotificationAsync(taskId);
    };

    // --- CRUD Functions (Filled in and Updated) ---
    const addTask = (title: string, dueDate?: Date) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        const newTask: Todo = {
            id: Date.now().toString(),
            title,
            completed: false,
            dueDate: dueDate?.toISOString(),
        };
        if (newTask.dueDate) {
            scheduleNotificationForTask(newTask);
        }
        setTasks([newTask, ...tasks]);
    };

    const toggleTask = (id: string) => {
        setTasks(
            tasks.map(task => {
                if (task.id === id) {
                    const updatedTask = { ...task, completed: !task.completed };
                    if (updatedTask.completed) {
                        cancelNotificationForTask(id);
                    } else if (updatedTask.dueDate) {
                        scheduleNotificationForTask(updatedTask);
                    }
                    return updatedTask;
                }
                return task;
            })
        );
    };
  
    const deleteTask = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        cancelNotificationForTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    };

    const editTask = (id: string, newTitle: string, newDueDate?: Date) => {
        setTasks(
            tasks.map(task => {
                if (task.id === id) {
                    const updatedTask = { ...task, title: newTitle, dueDate: newDueDate?.toISOString() };
                    cancelNotificationForTask(id).then(() => scheduleNotificationForTask(updatedTask));
                    return updatedTask;
                }
                return task;
            })
        );
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, editTask, theme, toggleTheme }}>
            {children}
        </TasksContext.Provider>
    );
};