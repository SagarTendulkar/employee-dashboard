import type { Employee } from "@/types/employee";
import { useMemo } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

interface EmployeesPerDepartmentChartProps {
    employees: Employee[];
}

const EmployeesPerDepartmentChart = ({
    employees,
}: EmployeesPerDepartmentChartProps) => {
    const data = useMemo(() => {
        const counts = employees.reduce<Record<string, number>>(
            (acc, employee) => {
                const department = employee.company.department;
                acc[department] = (acc[department] ?? 0) + 1;
                return acc;
            },
            {},
        );

        return Object.entries(counts)
            .map(([department, employeeCount]) => ({
                department,
                employees: employeeCount,
            }))
            .sort((a, b) => b.employees - a.employees);
    }, [employees]);

    return (
        <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-amber-900">
                    Employees per Department
                </h2>
                <p className="text-sm text-amber-700">
                    Live headcount by department
                </p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar
                            dataKey="employees"
                            radius={[8, 8, 0, 0]}
                            fill="#d97706"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default EmployeesPerDepartmentChart;
