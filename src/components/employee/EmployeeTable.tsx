import type { Employee } from "@/types/employee";
import {
    LuArrowDown,
    LuArrowUp,
    LuArrowUpDown,
    LuEye,
    LuPencil,
    LuTrash,
} from "react-icons/lu";
import EmployeeMobileCard from "./EmployeeMobileCard";

export type SortField = "name" | "email" | "department";
export type SortDirection = "asc" | "desc";

interface EmployeeTableProps {
    employees: Employee[];
    onView: (employee: Employee) => void;
    onEdit: (employee: Employee) => void;
    onDelete: (employee: Employee) => void;
    sortField: SortField;
    sortDirection: SortDirection;
    onSortChange: (field: SortField) => void;
    selectedIds: Set<number>;
    onToggleSelect: (id: number) => void;
    onToggleSelectAll: () => void;
}

const columns: { field: SortField; label: string }[] = [
    { field: "name", label: "Name" },
    { field: "email", label: "Email" },
    { field: "department", label: "Department" },
];

const EmployeeTable = ({
    employees,
    onView,
    onEdit,
    onDelete,
    sortField,
    sortDirection,
    onSortChange,
    selectedIds,
    onToggleSelect,
    onToggleSelectAll,
}: EmployeeTableProps) => {
    const allSelected =
        employees.length > 0 &&
        employees.every((employee) => selectedIds.has(employee.id));

    const sortIcon = (field: SortField) => {
        if (sortField !== field) {
            return <LuArrowUpDown size={14} className="opacity-40" />;
        }
        return sortDirection === "asc" ? (
            <LuArrowUp size={14} />
        ) : (
            <LuArrowDown size={14} />
        );
    };

    return (
        <>
            {/* Desktop table, hidden on mobile */}
            <div className="hidden sm:block w-full overflow-x-auto rounded-2xl border border-amber-200 bg-white shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="bg-amber-50/70 border-b border-amber-200 text-amber-900 font-semibold">
                            <th className="p-4 w-10">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={onToggleSelectAll}
                                    className="h-4 w-4 accent-amber-700"
                                />
                            </th>
                            <th className="p-4 w-16">Avatar</th>
                            {columns.map((column) => (
                                <th className="p-4" key={column.field}>
                                    <button
                                        onClick={() =>
                                            onSortChange(column.field)
                                        }
                                        className="flex items-center gap-2 font-semibold cursor-pointer hover:text-amber-700"
                                    >
                                        {column.label}
                                        {sortIcon(column.field)}
                                    </button>
                                </th>
                            ))}
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100 text-amber-950">
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr
                                    key={employee.id}
                                    className={`hover:bg-amber-50/30 transition-colors ${
                                        selectedIds.has(employee.id)
                                            ? "bg-amber-50/50"
                                            : ""
                                    }`}
                                >
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.has(
                                                employee.id,
                                            )}
                                            onChange={() =>
                                                onToggleSelect(employee.id)
                                            }
                                            className="h-4 w-4 accent-amber-700"
                                        />
                                    </td>
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
                                            {employee.company?.department ||
                                                "N/A"}
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
                                            <button
                                                onClick={() => onEdit(employee)}
                                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                                            >
                                                <LuPencil className="text-sm" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onDelete(employee)
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
                                    colSpan={6}
                                    className="p-8 text-center text-amber-700/60 font-medium"
                                >
                                    No employee records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards, hidden on sm and up */}
            <div className="sm:hidden space-y-3">
                {employees.length > 0 ? (
                    employees.map((employee) => (
                        <EmployeeMobileCard
                            key={employee.id}
                            employee={employee}
                            selected={selectedIds.has(employee.id)}
                            onToggleSelect={onToggleSelect}
                            onView={onView}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <div className="p-8 text-center text-amber-700/60 font-medium bg-white rounded-2xl border border-amber-200">
                        No employee records found.
                    </div>
                )}
            </div>
        </>
    );
};

export default EmployeeTable;
