import type { Employee } from "@/types/employee";
import { LuEye, LuPencil, LuTrash } from "react-icons/lu";

interface EmployeeMobileCardProps {
    employee: Employee;
    selected: boolean;
    onToggleSelect: (id: number) => void;
    onView: (employee: Employee) => void;
    onEdit: (employee: Employee) => void;
    onDelete: (employee: Employee) => void;
}

const EmployeeMobileCard = ({
    employee,
    selected,
    onToggleSelect,
    onView,
    onEdit,
    onDelete,
}: EmployeeMobileCardProps) => {
    return (
        <div className="p-4 rounded-2xl border border-amber-200 bg-white shadow-sm space-y-3">
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onToggleSelect(employee.id)}
                    className="h-4 w-4 mt-1.5 accent-amber-700 shrink-0"
                />
                <img
                    src={employee.image}
                    alt={`${employee.firstName} avatar`}
                    className="w-10 h-10 rounded-full object-cover border border-amber-200 bg-amber-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                    <p className="font-medium text-amber-950 truncate">
                        {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-sm text-amber-900/70 truncate">
                        {employee.email}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-0.5 mt-1.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        {employee.company?.department || "N/A"}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-amber-100">
                <button
                    onClick={() => onView(employee)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                >
                    <LuEye className="text-sm" />
                    <span>View</span>
                </button>
                <button
                    onClick={() => onEdit(employee)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                >
                    <LuPencil className="text-sm" />
                    <span>Edit</span>
                </button>
                <button
                    onClick={() => onDelete(employee)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                >
                    <LuTrash className="text-sm" />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
};

export default EmployeeMobileCard;
