
import React, { useContext, useState, useLayoutEffect } from 'react';
import { StyleSheet, Alert, ScrollView, View } from 'react-native';
import {
    Button,
    TextInput,
    Surface,
    useTheme,
    Text,
} from 'react-native-paper';
import { TasksContext } from '../context/TasksContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type RootStackParamList = {
    'Task Details': { taskId: string };
};

type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, 'Task Details'>;

export default function TaskDetailScreen() {
    const { params } = useRoute<TaskDetailScreenRouteProp>();
    const { tasks, editTask, deleteTask } = useContext(TasksContext);
    const navigation = useNavigation();
    const theme = useTheme();

    const task = tasks.find(t => t.id === params.taskId);

    const [title, setTitle] = useState(task?.title || '');
    const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate) : undefined);
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Edit Task' });
    }, [navigation]);

    const handleSave = () => {
        if (title.trim() && task) {
            editTask(task.id, title.trim(), dueDate);
            navigation.goBack();
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => {
                    if(task) {
                        deleteTask(task.id);
                        navigation.goBack();
                    }
                }}
            ]
        );
    };

    const onPickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowPicker(false);
        if (event.type === 'set' && selectedDate) {
            const newDueDate = dueDate ? new Date(dueDate) : new Date();
            if (pickerMode === 'date') {
                newDueDate.setFullYear(selectedDate.getFullYear());
                newDueDate.setMonth(selectedDate.getMonth());
                newDueDate.setDate(selectedDate.getDate());
            } else {
                newDueDate.setHours(selectedDate.getHours());
                newDueDate.setMinutes(selectedDate.getMinutes());
            }
            setDueDate(newDueDate);
        }
    };

    const showDatePicker = () => {
        setPickerMode('date');
        setShowPicker(true);
    };
    
    const showTimePicker = () => {
        setPickerMode('time');
        setShowPicker(true);
    };

    return (
        <Surface style={styles.container}>
            <ScrollView>
                <TextInput
                    label="Task Title"
                    value={title}
                    onChangeText={setTitle}
                    mode="outlined"
                    style={styles.input}
                />

                <Text variant="titleMedium" style={{marginBottom: 8}}>Edit Reminder</Text>
                
                <Button onPress={showDatePicker} icon="calendar" mode="outlined" style={styles.button}>
                    {dueDate ? dueDate.toLocaleDateString() : 'Set Date'}
                </Button>
                <Button onPress={showTimePicker} icon="clock-outline" mode="outlined" style={styles.button}>
                    {dueDate ? dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) : 'Set Time'}
                </Button>

                {showPicker && (
                    <DateTimePicker
                        value={dueDate || new Date()}
                        mode={pickerMode}
                        is24Hour={true}
                        display="default"
                        onChange={onPickerChange}
                    />
                )}
            </ScrollView>

            <View style={styles.actionButtons}>
                <Button 
                    icon="delete" 
                    mode="elevated" 
                    onPress={handleDelete} 
                    textColor={theme.colors.error}
                >
                    Delete
                </Button>
                <Button 
                    icon="check" 
                    mode="contained" 
                    onPress={handleSave}
                >
                    Save Changes
                </Button>
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        marginBottom: 20,
    },
    button: {
        marginBottom: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(128, 128, 128, 0.3)'
    }
});