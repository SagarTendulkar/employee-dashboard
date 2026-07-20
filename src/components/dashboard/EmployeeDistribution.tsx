import { employeeDistribution } from "@/config/chartData";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const EmployeeDistribution = () => {
    return (
        <section className="xl:col-span-2 rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-amber-900">
                    Employee Distribution
                </h2>

                <p className="text-sm text-amber-700">
                    Employees by department
                </p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={employeeDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="department" />

                        <YAxis />

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

export default EmployeeDistribution;
