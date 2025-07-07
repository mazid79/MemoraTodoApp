
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { IconButton, Switch, Card, Text, useTheme } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import { TasksContext } from '../context/TasksContext';


interface TodoItemProps {
    id: string;
    title: string;
    completed: boolean;
    dueDate?: string;
    onPress: () => void;
}

const TodoItem = ({ id, title, completed, dueDate, onPress }: TodoItemProps) => {
    const { toggleTask, deleteTask } = React.useContext(TasksContext);
    const { colors } = useTheme(); 

    const handleDelete = () => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to permanently delete this task?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => deleteTask(id), style: "destructive" }
            ]
        );
    };
    
    const renderRightActions = () => (
        <View style={styles.deleteButtonContainer}>
            <IconButton icon="delete" iconColor="white" size={30} onPress={handleDelete} />
        </View>
    );
    
    
    const formattedDate = dueDate ? new Date(dueDate).toLocaleString([], {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : '';

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <Card style={styles.taskCard} onPress={onPress} mode={completed ? 'outlined' : 'elevated'}>
                {/* --- Updated Card layout to show due date --- */}
                <Card.Content>
                    <View style={styles.cardContent}>
                        <View style={styles.titleContainer}>
                            <Text variant="titleMedium" style={completed ? styles.completedTask : {}}>{title}</Text>
                            {dueDate && (
                                <View style={styles.dueDateContainer}>
                                    <IconButton icon="bell-ring-outline" size={16} iconColor={colors.primary} style={{ margin: 0, padding: 0 }} />
                                    <Text variant="bodySmall" style={{ color: colors.primary }}>{formattedDate}</Text>
                                </View>
                            )}
                        </View>
                        <Switch value={completed} onValueChange={() => toggleTask(id)} />
                    </View>
                </Card.Content>
            </Card>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    taskCard: { marginVertical: 4, marginHorizontal: 8 },
    cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    titleContainer: { flex: 1, marginRight: 8 },
    completedTask: { textDecorationLine: 'line-through', opacity: 0.6 },
    deleteButtonContainer: { backgroundColor: '#ff4d4d', justifyContent: 'center', alignItems: 'center', width: 100, marginVertical: 4, borderRadius: 12 },
    dueDateContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 }
});

export default TodoItem;