import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
type WorkoutTimerProps = NativeStackScreenProps<RootStackParamList, 'WorkoutTimer'>;

const WorkoutTimer = ({ route }: WorkoutTimerProps) => {
  const { workout } = route.params;
  const [sets, setSets] = useState<number>(workout.sets);
  const [rest, setRest] = useState<number>(workout.restTime);
  const intervalId = useRef(null);
  const [count, setCount] = useState<number>(workout.reps);
const [stop, setStop] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

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
    if (count === 0 && sets !== 0 && !stop) {
      setRest(workout.restTime);
      startRest();
    }
  }, [count, sets, stop]);
  const countSets = () => {
    setSets((prevSets) => (prevSets > 0 ? prevSets - 1 : 0));
  };

  useEffect(() => {
    if (rest === 0 && !stop) {
      countSets();
      setCount(workout.reps);
      startCountDown();
    }
  }, [rest, stop]);

  const pauseWorkout = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    if (restId.current) {
      clearInterval(restId.current);
    }
    setIsPaused(true);
  };
  
  const resumeWorkout = () => {
    if (count > 0) {
      startCountDown();
    } else if (rest > 0) {
      startRest();
    }
    setIsPaused(false);
  };

  const stopWorkout = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    if (restId.current) {
      clearInterval(restId.current);
    }
    setStop(true);
    setSets(workout.sets);
    setRest(workout.restTime);
    setCount(workout.reps);
    setIsPaused(false);
  };

  return (
    <LinearGradient colors={['#2C5364', '#203A43', '#0F2027']} style={styles.container}>
      <Text style={styles.text}>Rep: {count}</Text>
      <Text style={styles.text}>Sets: {sets}</Text>
      <Text style={styles.text}>Rest: {rest}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startCountDown} color="#711DB0" />
        <Button title="Pause" onPress={pauseWorkout} color="#711DB0" />
        <Button title="Resume" onPress={resumeWorkout} color="#711DB0" />
        <Button title="Stop" onPress={stopWorkout} color="#711DB0" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});
export default WorkoutTimer;
