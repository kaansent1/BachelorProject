import { useState } from "@lynx-js/react";
import type { Exercise } from "../data/exercises.js";
import "../styles/CreateWorkout.css";

interface CreateWorkoutProps {
  createWorkout: (name: string, exercises: Exercise[]) => void;
  exercises: Exercise[];
  exerciseCategories: string[];
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  filterCategory: string;
  setFilterCategory: (v: string) => void;
  setActiveView: (v: "dashboard" | "create") => void;
}

export function CreateWorkoutView({
  createWorkout,
  exercises,
  exerciseCategories,
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  setActiveView,
}: CreateWorkoutProps) {
  const [workoutName, setWorkoutName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const toggleExercise = (ex: Exercise) => {
    if (selectedExercises.find((s) => s.id === ex.id)) {
      setSelectedExercises(selectedExercises.filter((s) => s.id !== ex.id));
    } else {
      setSelectedExercises([...selectedExercises, ex]);
    }
  };

  const handleSave = () => {
    if (!workoutName.trim() || selectedExercises.length === 0) return;
    createWorkout(workoutName, selectedExercises);
    setActiveView("dashboard");
  };

  return (
    <scroll-view className="CreateContainer">
      <text className="Title">Workout erstellen</text>

      <input
        className="TextInput"
        placeholder="Workout-Name"
        value={workoutName}
        bindinput={(e: any) => setWorkoutName(e.detail.value)}
      />

      <input
        className="TextInput"
        placeholder="Suche Übung..."
        value={searchTerm}
        bindinput={(e: any) => setSearchTerm(e.detail.value)}
      />

      <scroll-view className="ExerciseList">
        {exercises
          .filter((ex) =>
            ex.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((ex) => (
            <view
              key={ex.id}
              className={
                selectedExercises.find((s) => s.id === ex.id)
                  ? "ExerciseItem Selected"
                  : "ExerciseItem"
              }
              bindtap={() => toggleExercise(ex)}
            >
              <text>{ex.name}</text>
              <text>{ex.duration} min</text>
            </view>
          ))}
      </scroll-view>

      <view className="Actions">
        <button className="SaveBtn" bindtap={handleSave}>
          Speichern
        </button>
        <button className="CancelBtn" bindtap={() => setActiveView("dashboard")}>
          Abbrechen
        </button>
      </view>
    </scroll-view>
  );
}
