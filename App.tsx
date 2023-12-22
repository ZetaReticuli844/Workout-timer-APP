import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateWorkout from './src/components/CreateWorkout';
import WorkoutTimer from './src/screens/WorkoutTimer';
import { StackNavigationProp } from '@react-navigation/stack';

//stack navigator
const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Home: undefined;
  CreateWorkout: undefined;
  WorkoutTimer: {workout: Workout};

};

type NavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: NavigationProp;
};


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
        <Stack.Screen name="WorkoutTimer" component={WorkoutTimer} />
      </Stack.Navigator>
    
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})