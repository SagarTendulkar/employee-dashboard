import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStatsSection from "@/components/dashboard/DashboardStatsSection";
import EmployeeDistribution from "@/components/dashboard/EmployeeDistribution";
import RecentAnnouncements from "@/components/dashboard/RecentAnnouncements";
import RecentEmployees from "@/components/dashboard/RecentEmployees";

const Dashboard = () => {
    return (
        <div className="space-y-8">
            <DashboardHeader />

            <DashboardStatsSection />

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <EmployeeDistribution />

                <RecentAnnouncements />
            </section>

            <RecentEmployees />
        </div>
    );
};

export default Dashboard;
