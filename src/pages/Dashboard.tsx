import StatCard from "@/components/dashboard/StatCard";
import { dashboardStats } from "@/config/dashboardStats";
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
