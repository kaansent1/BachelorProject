import { Home, Plus, BarChart } from "lucide-react";
import "../styles/NavigationBar.css";

interface NavigationProps {
  activeView: string;
  setActiveView: (view: "dashboard" | "create" | "statistics") => void;
}

export function NavigationBar({ activeView, setActiveView }: NavigationProps) {
  return (
    <view className="NavBar">
      <view
        className={activeView === "dashboard" ? "NavBtn Active" : "NavBtn"}
        bindtap={() => setActiveView("dashboard")}
      >
        <Home size={20} />
        <text>Home</text>
      </view>

      <view
        className={activeView === "create" ? "NavBtn Active" : "NavBtn"}
        bindtap={() => setActiveView("create")}
      >
        <Plus size={20} />
        <text>Create</text>
      </view>

      <view
        className={activeView === "statistics" ? "NavBtn Active" : "NavBtn"}
        bindtap={() => setActiveView("statistics")}
      >
        <BarChart size={20} />
        <text>Stats</text>
      </view>
    </view>
  );
}