import { Home, Plus, BarChart } from "lucide-react";
import "../styles/NavigationBar.css";

interface NavigationProps {
  activeView: string;
  setActiveView: (view: "dashboard" | "create" | "statistics") => void;
}

export function NavigationBar({ activeView, setActiveView }: NavigationProps) {
  return (
    <view className="NavBar">
      <button
        className={activeView === "dashboard" ? "NavBtn Active" : "NavBtn"}
        bindtap={() => setActiveView("dashboard")}
      >
        <Home size={20} />
        <text>Home</text>
      </button>

      <button
        className={activeView === "create" ? "NavBtn Active" : "NavBtn"}
        bindtap={() => setActiveView("create")}
      >
        <Plus size={20} />
        <text>Create</text>
      </button>

      <button
        className={activeView === "statistics" ? "NavBtn Active" : "NavBtn"}
        bindtap={() => setActiveView("statistics")}
      >
        <BarChart size={20} />
        <text>Stats</text>
      </button>
    </view>
  );
}
