import DepartmentStatistics from "@/components/reports/DepartmentStatistics";
import EmployeesPerDepartmentChart from "@/components/reports/EmployeesPerDepartmentChart";
import MonthlyJoiningTrendChart from "@/components/reports/MonthlyJoiningTrendChart";
import useEmployees from "@/hooks/useEmployees";

const Reports = () => {
    const { employees, loading, error } = useEmployees();

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-50">
                <p className="text-amber-900 font-medium animate-pulse">
                    Loading reports...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-600 bg-red-50 border border-red-200 rounded-xl font-medium">
                Something went wrong, Error:{" "}
                {error instanceof Error ? error.message : String(error)}
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <DepartmentStatistics employees={employees} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <EmployeesPerDepartmentChart employees={employees} />
                <MonthlyJoiningTrendChart />
            </div>
        </div>
    );
};

export default Reports;
