// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, Button, FlatList } from 'react-native';

// WorkoutEntry.js
const WorkoutEntry = ({ name, sets, reps }) => {
    return (
        <View style={entryStyles.entry}>
            <Text style={entryStyles.name}>{name}</Text>
            <Text style={entryStyles.details}>Sets: {sets}</Text>
            <Text style={entryStyles.details}>Reps: {reps}</Text>
        </View>
    );
};

const entryStyles = StyleSheet.create({
    entry: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    details: {
        fontSize: 16,
    },
});

// WorkoutList.js
const initialWorkouts = [
    { id: '1', name: 'Push-ups', sets: 3, reps: 15 },
    { id: '2', name: 'Squats', sets: 3, reps: 20 },
    { id: '3', name: 'Burpees', sets: 3, reps: 10 },
];

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState(initialWorkouts);

    const renderItem = ({ item }) => (
        <WorkoutEntry name={item.name} sets={item.sets} reps={item.reps} />
    );

    return (
        <View style={listStyles.container}>
            <FlatList
                data={workouts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={listStyles.list}
            />
        </View>
    );
};

const listStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 20,
    },
});

// App.js
export default function App() {
    return (
        <SafeAreaView style={appStyles.container}>
            <ScrollView>
                <Text style={appStyles.title}>Workout Tracker</Text>
                <WorkoutList />
            </ScrollView>
        </SafeAreaView>
    );
}

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
});