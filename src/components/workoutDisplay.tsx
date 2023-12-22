import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'

type workoutProps=PropsWithChildren<{
    workout: Workout;   
}>

const workoutDisplay = ({workout}:workoutProps) => {
  return (
    <View>
      <Text>{workout.name}</Text>
    </View>
  )
}

export default workoutDisplay

const styles = StyleSheet.create({})