interface Workout {
    id: number;
    name: string;
    sets: number;
    reps: number;
    restTime: number;
  }


  type RootStackParamList = {
    Home: undefined;
    CreateWorkout: undefined;
    WorkoutTimer: {workout: Workout};
  
  };