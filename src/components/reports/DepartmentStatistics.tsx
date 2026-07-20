import StatCard from "@/components/dashboard/StatCard";
import type { Employee } from "@/types/employee";
import { useMemo } from "react";

interface DepartmentStatisticsProps {
    employees: Employee[];
}

const DepartmentStatistics = ({ employees }: DepartmentStatisticsProps) => {
    const stats = useMemo(() => {
        const counts = employees.reduce<Record<string, number>>(
            (acc, employee) => {
                const department = employee.company.department;
                acc[department] = (acc[department] ?? 0) + 1;
                return acc;
            },
            {},
        );

        const entries = Object.entries(counts);
        const totalDepartments = entries.length;
        const averagePerDepartment = totalDepartments
            ? Math.round(employees.length / totalDepartments)
            : 0;

        const largest = entries.reduce(
            (max, entry) => (entry[1] > max[1] ? entry : max),
            entries[0] ?? ["—", 0],
        );
        const smallest = entries.reduce(
            (min, entry) => (entry[1] < min[1] ? entry : min),
            entries[0] ?? ["—", 0],
        );

        return {
            totalDepartments,
            averagePerDepartment,
            largest: largest[0],
            smallest: smallest[0],
        };
    }, [employees]);

    return (
        <section>
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-amber-900">
                    Department Statistics
                </h2>
                <p className="text-sm text-amber-700">
                    Summary across all departments
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                    title="Total Departments"
                    value={stats.totalDepartments}
                />
                <StatCard
                    title="Avg. Employees / Dept"
                    value={stats.averagePerDepartment}
                />
                <StatCard title="Largest Department" value={stats.largest} />
                <StatCard
                    title="Smallest Department"
                    value={stats.smallest}
                />
            </div>
        </section>
    );
};

export default DepartmentStatistics;
