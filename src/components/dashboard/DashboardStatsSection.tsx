import { dashboardStats } from "@/config/dashboardStats";
import StatCard from "./StatCard";

const Dashboard = () => {
    return (
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Stat Cards */}
                {dashboardStats.map((info) => (
                    <StatCard
                        key={info.label}
                        title={info.label}
                        value={info.value}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
