  export interface Exercise {
    id: number;
    name: string;
    duration: number; // Minuten pro Satz oder Übung
    category: string;
  }

  export interface Workout {
    id: number;
    name: string;
    duration: number; // Gesamtdauer in Minuten
    exercises: Exercise[];
    completedAt?: string | null;
    actualDuration?: number;
  }

  export const defaultExercises: Exercise[] = [
    { id: 1, name: "Push-ups", duration: 5, category: "strength" },
    { id: 2, name: "Squats", duration: 8, category: "strength" },
    { id: 3, name: "Plank", duration: 3, category: "core" },
    { id: 4, name: "Running", duration: 20, category: "cardio" },
    { id: 5, name: "Burpees", duration: 6, category: "cardio" },
    { id: 6, name: "Pull-ups", duration: 7, category: "strength" },
    { id: 7, name: "Jumping Jacks", duration: 4, category: "cardio" },
    { id: 8, name: "Lunges", duration: 6, category: "strength" },
    { id: 9, name: "Mountain Climbers", duration: 5, category: "core" },
    { id: 10, name: "Cycling", duration: 25, category: "cardio" },
  ];

  export const exerciseCategories = ["all", "strength", "cardio", "core"];

  export const defaultWorkouts: Workout[] = [
    {
      id: 1,
      name: "Morning Strength",
      duration: 20,
      exercises: [defaultExercises[0], defaultExercises[1], defaultExercises[2]],
      completedAt: null,
    },
    {
      id: 2,
      name: "Cardio Blast",
      duration: 30,
      exercises: [defaultExercises[4], defaultExercises[6], defaultExercises[9]],
      completedAt: null,
    },
  ];
