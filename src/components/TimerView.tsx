import { useEffect } from "@lynx-js/react";
import type { Workout } from "../data/exercises.js";
import "../styles/Timer.css";

interface TimerProps {
  currentWorkout: Workout;
  timerSeconds: number;
  setTimerSeconds: (n: number) => void;
  isTimerRunning: boolean;
  setIsTimerRunning: (b: boolean) => void;
  currentExerciseIndex: number;
  setCurrentExerciseIndex: (i: number) => void;
  completeWorkout: () => void;
  setActiveView: (v: "dashboard" | "timer") => void;
}

export function TimerView({
  currentWorkout,
  timerSeconds,
  setTimerSeconds,
  isTimerRunning,
  setIsTimerRunning,
  currentExerciseIndex,
  setCurrentExerciseIndex,
  completeWorkout,
  setActiveView,
}: TimerProps) {
  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(timerSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const exercise = currentWorkout.exercises[currentExerciseIndex];
  const nextExercise = () => {
    if (currentExerciseIndex < currentWorkout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      completeWorkout();
    }
  };

  return (
    <view className="TimerContainer">
      <text className="Title">{currentWorkout.name}</text>

      <view className="ExerciseInfo">
        <text>{exercise.name}</text>
        <text>{exercise.duration} min</text>
      </view>

      <text className="TimerDisplay">
        {Math.floor(timerSeconds / 60)
          .toString()
          .padStart(2, "0")}
        :
        {(timerSeconds % 60).toString().padStart(2, "0")}
      </text>

      <view className="TimerActions">
        <button bindtap={() => setIsTimerRunning(!isTimerRunning)}>
          {isTimerRunning ? "Pause" : "Start"}
        </button>
        <button bindtap={() => setTimerSeconds(0)}>Reset</button>
      </view>

      <view className="NavActions">
        <button bindtap={() => setActiveView("dashboard")}>Abbrechen</button>
        <button bindtap={nextExercise}>Weiter</button>
      </view>
    </view>
  );
}
