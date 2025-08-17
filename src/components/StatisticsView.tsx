import type { Workout } from "../data/exercises.js";
import "../styles/Statistics.css";

interface StatsProps {
  workouts: Workout[];
}

export function StatisticsView({ workouts }: StatsProps) {
  const completed = workouts.filter((w) => w.completedAt !== null);
  const avgDuration =
    completed.reduce((acc, w) => acc + (w.actualDuration || 0), 0) /
      (completed.length || 1);

  return (
    <scroll-view className="StatsContainer">
      <text className="Title">Statistiken</text>

      <view className="StatsCard">
        <text>Gesamt Workouts: {workouts.length}</text>
        <text>Abgeschlossen: {completed.length}</text>
        <text>Ø Dauer: {Math.round(avgDuration)} min</text>
      </view>

      {completed.map((w) => (
        <view key={w.id} className="WorkoutHistory">
          <text>{w.name}</text>
          <text>
            {w.actualDuration ? w.actualDuration + " sec" : w.duration + " min"}
          </text>
          <text>{w.completedAt?.split("T")[0]}</text>
        </view>
      ))}
    </scroll-view>
  );
}
