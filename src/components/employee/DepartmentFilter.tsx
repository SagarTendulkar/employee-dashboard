interface DepartmentFilterProps {
    value: string;
    departments: string[];
    onChange: (department: string) => void;
}

const DepartmentFilter = ({
    value,
    departments,
    onChange,
}: DepartmentFilterProps) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border border-amber-200 bg-white px-4 py-2.5 outline-none focus:border-amber-400"
        >
            <option value="">All Departments</option>

            {departments.map((department) => (
                <option key={department} value={department}>
                    {department}
                </option>
            ))}
        </select>
    );
};

export default DepartmentFilter;
