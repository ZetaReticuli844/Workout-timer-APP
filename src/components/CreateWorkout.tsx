import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CounterInput from "react-native-counter-input";
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutTimer from '../screens/WorkoutTimer';
import { TouchableOpacity } from 'react-native';


type Props=NativeStackScreenProps<RootStackParamList,'CreateWorkout'>

const CreateWorkout = ({navigation}:Props) => {
  const [workout, setWorkout] = useState<Workout>({
    id: 0,
    name: '',
    sets: 0,
    reps: 0,
    restTime: 0,
  });

  const [storedWorkouts, setStoredWorkouts] = useState<Workout[]>([]);

  const fetchWorkouts = async () => {
    try {
      const value = await AsyncStorage.getItem('workouts');
      if (value !== null) {
        setStoredWorkouts(JSON.parse(value));
      } else {
        setStoredWorkouts([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveWorkout = async (workout: Workout) => {
    try {
      const existingWorkouts = JSON.parse(await AsyncStorage.getItem('workouts')) || [];
      const newWorkout = {
        ...workout,
        id: existingWorkouts.length + 1,
      };
      existingWorkouts.push(newWorkout);
      await AsyncStorage.setItem('workouts', JSON.stringify(existingWorkouts));
      console.log('Workout saved successfully');
    } catch (e) {
      console.error('Failed to save the workout', e);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const deleteWorkout = async (id: number) => {
    try {
      let existingWorkouts = JSON.parse(await AsyncStorage.getItem('workouts')) || [];
      let updatedWorkouts = existingWorkouts.filter(workout => workout.id !== id);
      await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
      console.log('Workout deleted successfully');
      fetchWorkouts();
    } catch (e) {
      console.error('Failed to delete the workout', e);
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      fetchWorkouts();
    } catch (e) {
      console.error(e);
    }
    console.log('Done.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Workout</Text>
      <Text>Workout Name</Text>
      <View style={styles.inputText}>
        <TextInput placeholder='ENTER WORKOUT NAME' onChangeText={(text) => setWorkout({ ...workout, name: text })} />
      </View>
      <Text>Set</Text>
      <CounterInput horizontal='true' onChange={(input) => setWorkout({ ...workout, sets: input })} />
      <Text>Rep</Text>
      <CounterInput horizontal='true' onChange={(input) => setWorkout({ ...workout, reps: input })} />
      <Text>Rest Time</Text>
      <CounterInput horizontal='true' onChange={(input) => setWorkout({ ...workout, restTime: input })} />
      <View style={styles.btnContainer}>
        <Button title='Save' onPress={async () => {
          await saveWorkout(workout);
          setWorkout({
            id: 0,
            name: '',
            sets: 0,
            reps: 0,
            restTime: 0,
          });
          fetchWorkouts();
        }} />
      </View>
      <View>
        {storedWorkouts.length > 0 ? (
          storedWorkouts.map((workout) => (
            <View key={workout.id} style={styles.workoutContainer}>
              <Text>Name: {workout.name}</Text>
              <Text>Sets: {workout.sets}</Text>
              <Text>Reps: {workout.reps}</Text>
              <Text>Rest Time: {workout.restTime}</Text>
              <Button title="Delete workout" onPress={() => deleteWorkout(workout.id)} />
              <TouchableOpacity onPress={() => navigation.navigate('WorkoutTimer', {
                workout: workout,
              })}>
                <Text>Start Workout</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No workouts</Text>
        )}
      </View>
      <Button title='Clear' onPress={clearAll} />
    </View>
  );
}

export default CreateWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputText: {
    width: 300,
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  btnContainer: {
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
  workoutContainer: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  
});

