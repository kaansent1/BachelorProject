import type { Workout, Exercise } from "../data/exercises.tsx";
import "../styles/Dashboard.css";

interface DashboardProps {
  workouts: Workout[];
  exercises: Exercise[];
  deleteWorkout: (id: number) => void;
  startWorkout: (w: Workout) => void;
  setActiveView: (v: "dashboard" | "create" | "statistics" | "timer") => void;
  isTimerRunning: boolean;
}

export function DashboardView({
  workouts,
  deleteWorkout,
  startWorkout,
  setActiveView,
  isTimerRunning,
}: DashboardProps) {
  return (
    <scroll-view className="Dashboard">
      <text className="Title">Workout Planner</text>

      {isTimerRunning && (
        <view className="RunningInfo">
          <text>⚡ Timer läuft gerade!</text>
        </view>
      )}

      {workouts.length === 0 ? (
        <text className="EmptyText">Keine Workouts geplant.</text>
      ) : (
        workouts.map((w) => (
          <view key={w.id} className="WorkoutCard">
            <view className="CardHeader">
              <text className="WorkoutName">{w.name}</text>
              <text className="WorkoutDuration">{w.duration} min</text>
            </view>
            <view className="CardActions">
              <view className="StartBtn" bindtap={() => startWorkout(w)}>
                <text>Start</text>
              </view>
              <view className="DeleteBtn" bindtap={() => deleteWorkout(w.id)}>
                <text>Löschen</text>
              </view>
            </view>
          </view>
        ))
      )}

      <view className="AddBtn" bindtap={() => setActiveView("create")}>
        <text>+ Workout hinzufügen</text>
      </view>
    </scroll-view>
  );
}