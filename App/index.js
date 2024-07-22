// Filename: index.js
// Combined code from all files

import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, Dimensions, TouchableOpacity } from 'react-native';

// SnakeGame.js
const { width, height } = Dimensions.get('window');
const CELL_SIZE = 20;
const CELL_COUNT_X = Math.floor(width / CELL_SIZE);
const CELL_COUNT_Y = Math.floor(height / CELL_SIZE);

const createSnake = () => [
    { x: Math.floor(CELL_COUNT_X / 2), y: Math.floor(CELL_COUNT_Y / 2) }
];

const randomFood = (snake) => {
    let position;
    do {
        position = {
            x: Math.floor(Math.random() * CELL_COUNT_X),
            y: Math.floor(Math.random() * CELL_COUNT_Y)
        };
    } while (snake.some(s => s.x === position.x && s.y === position.y));
    return position;
};

const SnakeGame = () => {
    const [snake, setSnake] = useState(createSnake());
    const [food, setFood] = useState(randomFood(snake));
    const [direction, setDirection] = useState('RIGHT');
    const [playing, setPlaying] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const changeDirection = (newDirection) => {
        if (
            (direction === 'UP' && newDirection === 'DOWN') ||
            (direction === 'DOWN' && newDirection === 'UP') ||
            (direction === 'LEFT' && newDirection === 'RIGHT') ||
            (direction === 'RIGHT' && newDirection === 'LEFT')
        ) {
            return;
        }
        setDirection(newDirection);
    };

    const updateSnake = () => {
        setSnake(prevSnake => {
            const head = prevSnake[0];
            const newHead = { ...head };
            switch (direction) {
                case 'UP': newHead.y -= 1; break;
                case 'DOWN': newHead.y += 1; break;
                case 'LEFT': newHead.x -= 1; break;
                case 'RIGHT': newHead.x += 1; break;
            }

            const newSnake = [newHead, ...prevSnake.slice(0, -1)];
            if (newHead.x === food.x && newHead.y === food.y) {
                newSnake.push(prevSnake[prevSnake.length - 1]);
                setFood(randomFood(newSnake));
            }

            if (
                newHead.x < 0 || newHead.x >= CELL_COUNT_X ||
                newHead.y < 0 || newHead.y >= CELL_COUNT_Y ||
                newSnake.slice(1).some(s => s.x === newHead.x && s.y === newHead.y)
            ) {
                stopGame();
                Alert.alert("Game Over", "You lost!");
            }

            return newSnake;
        });
    };

    const startGame = () => {
        setSnake(createSnake());
        setFood(randomFood(snake));
        setPlaying(true);
        setDirection('RIGHT');
        setIntervalId(setInterval(updateSnake, 200));
    };

    const stopGame = () => {
        setPlaying(false);
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    const handleSwipe = (direction) => {
        changeDirection(direction);
    };

    return (
        <View style={styles.gameContainer}>
            <View style={styles.grid}>
                {Array.from({ length: CELL_COUNT_Y }).map((_, y) => (
                    <View style={styles.row} key={y}>
                        {Array.from({ length: CELL_COUNT_X }).map((_, x) => (
                            <View
                                style={[
                                    styles.cell,
                                    { backgroundColor: snake.some(s => s.x === x && s.y === y) ? 'green' :
                                                      (food.x === x && food.y === y ? 'red' : 'white') },
                                ]}
                                key={x}
                            />
                        ))}
                    </View>
                ))}
            </View>
            {playing ? (
              <Button onPress={stopGame} title="Stop Game" />
            ) : (
              <Button onPress={startGame} title="Start Game" />
            )}
            <View style={styles.controls}>
                <TouchableOpacity onPress={() => handleSwipe('UP')} style={styles.controlButton}><Text>↑</Text></TouchableOpacity>
                <View style={styles.horizontalControls}>
                    <TouchableOpacity onPress={() => handleSwipe('LEFT')} style={styles.controlButton}><Text>←</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSwipe('RIGHT')} style={styles.controlButton}><Text>→</Text></TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handleSwipe('DOWN')} style={styles.controlButton}><Text>↓</Text></TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    gameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    grid: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    controls: {
        marginTop: 20,
        alignItems: 'center',
    },
    horizontalControls: {
        flexDirection: 'row',
    },
    controlButton: {
        padding: 10,
        backgroundColor: '#ddd',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Snake Game</Text>
            <SnakeGame />
        </SafeAreaView>
    );
}