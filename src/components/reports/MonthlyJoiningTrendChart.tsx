import { monthlyJoiningTrend } from "@/config/joiningTrend";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const MonthlyJoiningTrendChart = () => {
    return (
        <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-amber-900">
                    Monthly Joining Trend
                </h2>
                <p className="text-sm text-amber-700">
                    New joiners per month (mock data — no join-date field
                    available yet)
                </p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyJoiningTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="joiners"
                            stroke="#d97706"
                            strokeWidth={2}
                            dot={{ fill: "#d97706" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default MonthlyJoiningTrendChart;
