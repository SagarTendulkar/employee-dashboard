import type { Department } from "@/types/department";
import { LuPencil, LuTrash, LuUsers } from "react-icons/lu";

interface DepartmentMobileCardProps {
    department: Department;
    employeeCount: number;
    onEdit: (department: Department) => void;
    onDelete: (department: Department) => void;
}

const DepartmentMobileCard = ({
    department,
    employeeCount,
    onEdit,
    onDelete,
}: DepartmentMobileCardProps) => {
    return (
        <div className="p-4 rounded-2xl border border-amber-200 bg-white shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-amber-950 truncate">
                    {department.name}
                </p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 shrink-0">
                    <LuUsers className="text-sm" />
                    {employeeCount}
                </span>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-amber-100">
                <button
                    onClick={() => onEdit(department)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                >
                    <LuPencil className="text-sm" />
                    <span>Edit</span>
                </button>
                <button
                    onClick={() => onDelete(department)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                >
                    <LuTrash className="text-sm" />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
};

export default DepartmentMobileCard;
