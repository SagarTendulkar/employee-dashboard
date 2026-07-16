import type { Employee } from "@/types/employee";
import { LuEye, LuPencil } from "react-icons/lu";

interface EmployeeTableProps {
    employees: Employee[];
    onView: (employee: Employee) => void;
}

const EmployeeTable = ({ employees, onView }: EmployeeTableProps) => {
    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-amber-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
                <thead>
                    <tr className="bg-amber-50/70 border-b border-amber-200 text-amber-900 font-semibold">
                        <th className="p-4 w-16">Avatar</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Department</th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 text-amber-950">
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr
                                key={employee.id}
                                className="hover:bg-amber-50/30 transition-colors"
                            >
                                <td className="p-4">
                                    <img
                                        src={employee.image}
                                        alt={`${employee.firstName} avatar`}
                                        className="w-10 h-10 rounded-full object-cover border border-amber-200 bg-amber-100"
                                    />
                                </td>
                                <td className="p-4 font-medium">
                                    {employee.firstName} {employee.lastName}
                                </td>
                                <td className="p-4 text-amber-900/80">
                                    {employee.email}
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                        {employee.company?.department || "N/A"}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onView(employee)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                                        >
                                            <LuEye className="text-sm" />
                                            <span>View</span>
                                        </button>
                                        <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors">
                                            <LuPencil className="text-sm" />
                                            <span>Edit</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="p-8 text-center text-amber-700/60 font-medium"
                            >
                                No employee records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
