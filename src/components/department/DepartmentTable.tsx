import type { Department } from "@/types/department";
import { LuPencil, LuTrash, LuUsers } from "react-icons/lu";

interface DepartmentTableProps {
    departments: Department[];
    employeeCounts: Record<string, number>;
    onEdit: (department: Department) => void;
    onDelete: (department: Department) => void;
}

const DepartmentTable = ({
    departments,
    employeeCounts,
    onEdit,
    onDelete,
}: DepartmentTableProps) => {
    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-amber-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
                <thead>
                    <tr className="bg-amber-50/70 border-b border-amber-200 text-amber-900 font-semibold">
                        <th className="p-4">Department</th>
                        <th className="p-4">Employee Count</th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 text-amber-950">
                    {departments.length > 0 ? (
                        departments.map((department) => (
                            <tr
                                key={department.id}
                                className="hover:bg-amber-50/30 transition-colors"
                            >
                                <td className="p-4 font-medium">
                                    {department.name}
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                        <LuUsers className="text-sm" />
                                        {employeeCounts[department.name] ?? 0}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(department)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                                        >
                                            <LuPencil className="text-sm" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() =>
                                                onDelete(department)
                                            }
                                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                                        >
                                            <LuTrash className="text-sm" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={3}
                                className="p-8 text-center text-amber-700/60 font-medium"
                            >
                                No departments found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentTable;
