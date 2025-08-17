import { useState, useEffect } from "@lynx-js/react";
import type { Exercise, Workout } from "./data/exercises.jsx";
import { defaultExercises, exerciseCategories } from "./data/exercises.jsx";
import { NavigationBar } from "./components/NavigationBar.jsx";
import { DashboardView } from "./components/DashboardView.jsx";
import { CreateWorkoutView } from "./components/CreateWorkoutView.jsx";
import { TimerView } from "./components/TimerView.jsx";
import { StatisticsView } from "./components/StatisticsView.jsx";
import "./styles/App.css";

export interface AppProps {
  onRender?: () => void;
}

export function App({ onRender }: AppProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
const [exercises, setExercises] = useState<Exercise[]>(defaultExercises);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [activeView, setActiveView] = useState<"dashboard" | "create" | "timer" | "statistics">("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  useEffect(() => {
    onRender?.();
  }, [onRender]);

  // workout helpers
  const createWorkout = (name: string, selectedExercises: Exercise[]) => {
    const newWorkout: Workout = {
      id: Date.now(),
      name,
      exercises: selectedExercises,
      completedAt: null,
      duration: selectedExercises.reduce((sum, ex) => sum + ex.duration, 0),
    };
    setWorkouts([...workouts, newWorkout]);
  };

  const deleteWorkout = (id: number) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  const startWorkout = (workout: Workout) => {
    setCurrentWorkout(workout);
    setTimerSeconds(0);
    setCurrentExerciseIndex(0);
    setActiveView("timer");
  };

  const completeWorkout = () => {
    if (!currentWorkout) return;
    setWorkouts(
      workouts.map((w) =>
        w.id === currentWorkout.id
          ? { ...w, completedAt: new Date().toISOString(), actualDuration: timerSeconds }
          : w
      )
    );
    setCurrentWorkout(null);
    setActiveView("dashboard");
    setIsTimerRunning(false);
  };

  return (
    <view className="AppContainer">
      <NavigationBar activeView={activeView} setActiveView={setActiveView} />

      {activeView === "dashboard" && (
        <DashboardView
          workouts={workouts}
          exercises={exercises}
          deleteWorkout={deleteWorkout}
          startWorkout={startWorkout}
          setActiveView={setActiveView}
          isTimerRunning={isTimerRunning}
        />
      )}

      {activeView === "create" && (
        <CreateWorkoutView
          createWorkout={createWorkout}
          exercises={exercises}
          exerciseCategories={exerciseCategories}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          setActiveView={setActiveView}
        />
      )}

      {activeView === "timer" && currentWorkout && (
        <TimerView
          currentWorkout={currentWorkout}
          timerSeconds={timerSeconds}
          setTimerSeconds={setTimerSeconds}
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          currentExerciseIndex={currentExerciseIndex}
          setCurrentExerciseIndex={setCurrentExerciseIndex}
          completeWorkout={completeWorkout}
          setActiveView={setActiveView}
        />
      )}

      {activeView === "statistics" && (
        <StatisticsView workouts={workouts} />
      )}
    </view>
  );
}
