
import React, { useContext, useState, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import {
    Button,
    TextInput,
    FAB,
    Modal,
    Portal,
    Card,
    Text,
    ProgressBar,
    MD3Colors,
    IconButton,
} from 'react-native-paper';
import { TasksContext } from '../context/TasksContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import TodoItem from '../components/TodoItem';

type RootStackParamList = {
  'To-Do List': undefined;
  'Task Details': { taskId: string };
};
type TodoListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'To-Do List'>;

export default function TodoListScreen() {
    const { tasks, addTask, theme, toggleTheme } = useContext(TasksContext);
    const navigation = useNavigation<TodoListScreenNavigationProp>();
    
    const [modalVisible, setModalVisible] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [taskDueDate, setTaskDueDate] = useState(new Date());

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon={theme === 'dark' ? 'white-balance-sunny' : 'moon-waning-crescent'}
                    onPress={toggleTheme}
                    iconColor={theme === 'dark' ? MD3Colors.neutral90 : '#fff' }
                />
            ),
        });
    }, [navigation, theme, toggleTheme]);

    const completedTasksCount = tasks.filter(t => t.completed).length;
    const totalTasksCount = tasks.length;
    const progress = totalTasksCount > 0 ? completedTasksCount / totalTasksCount : 0;
  
    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle.trim(), taskDueDate);
            setModalVisible(false);
        }
    };

    // ---  DATE/TIME HANDLERS ---
    
    
    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event.type === 'set' && selectedDate) {
            const newDate = new Date(taskDueDate); 
            newDate.setFullYear(selectedDate.getFullYear());
            newDate.setMonth(selectedDate.getMonth());
            newDate.setDate(selectedDate.getDate());
            setTaskDueDate(newDate);
        }
    };

    
    const onTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event.type === 'set' && selectedDate) {
            const newDate = new Date(taskDueDate); 
            newDate.setHours(selectedDate.getHours());
            newDate.setMinutes(selectedDate.getMinutes());
            setTaskDueDate(newDate); 
        }
    };

    const openAddModal = () => {
        setNewTaskTitle('');
        setTaskDueDate(new Date());
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Portal>
                <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainer}>
                    <Card style={styles.modalCard}>
                        {/* Using ScrollView to see both pickers */}
                        <ScrollView>
                            <Card.Title title="Add a New Task" titleVariant="headlineSmall" />
                            <Card.Content>
                                <TextInput
                                    label="Task Title"
                                    value={newTaskTitle}
                                    onChangeText={setNewTaskTitle}
                                    mode="outlined"
                                    style={{ marginBottom: 16 }}
                                />
                                
                                <Text variant="titleMedium" style={{ marginBottom: 8 }}>Set Reminder Date</Text>
                                <DateTimePicker
                                    value={taskDueDate}
                                    mode="date"
                                    display="inline"
                                    onChange={onDateChange}
                                />
                                
                                <Text variant="titleMedium" style={{ marginBottom: 8, marginTop: 16 }}>Set Reminder Time</Text>
                                <DateTimePicker
                                    value={taskDueDate}
                                    mode="time"
                                    display="inline"
                                    onChange={onTimeChange}
                                />
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={() => setModalVisible(false)}>Cancel</Button>
                                <Button mode="contained" onPress={handleAddTask}>Add Task</Button>
                            </Card.Actions>
                        </ScrollView>
                    </Card>
                </Modal>
            </Portal>
            
            <Card style={styles.progressCard}>
                <Card.Content>
                    <Text variant="titleMedium">Your Daily Progress</Text>
                    <ProgressBar progress={progress} style={styles.progressBar} />
                    <Text variant="bodySmall" style={styles.progressText}>{`${completedTasksCount} of ${totalTasksCount} tasks completed`}</Text>
                </Card.Content>
            </Card>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TodoItem
                        id={item.id}
                        title={item.title}
                        completed={item.completed}
                        dueDate={item.dueDate}
                        onPress={() => navigation.navigate('Task Details', { taskId: item.id })}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text variant="headlineSmall">All clear!</Text>
                        <Text variant="bodyMedium">Ready to add a new task?</Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 80 }}
            />

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={openAddModal}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    modalCard: {
        width: '90%',
        maxHeight: '90%',
    },
    progressCard: { marginHorizontal: 8, marginTop: 8, marginBottom: 4 },
    progressBar: { marginTop: 12, height: 8, borderRadius: 4 },
    progressText: { marginTop: 4, textAlign: 'right', opacity: 0.7 },
    emptyContainer: { marginTop: 100, alignItems: 'center' },
});