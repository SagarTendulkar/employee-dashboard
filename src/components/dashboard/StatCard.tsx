interface StatCardProps {
    title: string;
    value: number | string;
}

const StatCard = ({ title, value }: StatCardProps) => {
    return (
        <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
                <h2 className="text-sm font-medium text-amber-800/80 tracking-wide uppercase">
                    {title}
                </h2>
                <h3 className="text-3xl font-bold text-amber-950">{value}</h3>
            </div>
        </div>
    );
};

export default StatCard;
