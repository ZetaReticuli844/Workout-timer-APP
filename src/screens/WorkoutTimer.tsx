import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type WorkoutTimerProps = NativeStackScreenProps<RootStackParamList, 'WorkoutTimer'>;

const WorkoutTimer = ({ route }: WorkoutTimerProps) => {
  const { workout } = route.params;
  const [sets, setSets] = useState<number>(workout.sets);
  const [rest, setRest] = useState<number>(workout.restTime);
  const intervalId = useRef(null);
  const [count, setCount] = useState<number>(workout.reps);

  const startCountDown = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    intervalId.current = setInterval(() => {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);
  };

  const restId = useRef(null);

  const startRest = () => {
    if (restId.current) {
      clearInterval(restId.current);
    }

    restId.current = setInterval(() => {
      setRest((prevRest) => (prevRest > 0 ? prevRest - 1 : 0));
    }, 1000);
  };

  useEffect(() => {
    if (count === 0 && sets !== 0) {
      setRest(workout.restTime);
      startRest();
    }
  }, [count]);

  const countSets = () => {
    setSets((prevSets) => (prevSets > 0 ? prevSets - 1 : 0));
  };

  useEffect(() => {
    if (rest === 0) {
      countSets();
      setCount(workout.reps);
      startCountDown();
    }
  }, [rest]);

  const pauseWorkout = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rep: {count}</Text>
      <Text style={styles.text}>Sets: {sets}</Text>
      <Text style={styles.text}>Rest: {rest}</Text>
      <Button title="Start" onPress={startCountDown} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#711DB0', // Purple color
    color: '#FFFFFF', // White text color
  },
});

export default WorkoutTimer;
