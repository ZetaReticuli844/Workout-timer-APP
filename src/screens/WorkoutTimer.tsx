import { StyleSheet, Text, View } from 'react-native'
import {useEffect,useState} from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type workoutTimerProps=NativeStackScreenProps<RootStackParamList,'WorkoutTimer'>



const WorkoutTimer = ({route}:workoutTimerProps) => {
  const {workout}=route.params;
  

  return (
    <View>
      <Text>Name:{workout.name}</Text>
      <Text>Sets:{workout.sets}</Text>
      <Text>Reps:{workout.reps}</Text>
      <Text>Rest:{workout.restTime}</Text>


    </View>
  )
}

export default WorkoutTimer

const styles = StyleSheet.create({})