import type { Employee } from "@/types/employee";
import { LuTriangle, LuX } from "react-icons/lu";

interface DeleteEmployeeModalProps {
    employee: Employee;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteEmployeeModal = ({
    employee,
    onClose,
    onConfirm,
}: DeleteEmployeeModalProps) => {
    return (
        // Full-screen backdrop overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-sm">
            {/* Modal Box */}
            <div className="relative w-full max-w-md bg-white rounded-3xl border border-amber-200 shadow-2xl p-6 overflow-hidden">
                {/* Close corner cross icon */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-amber-800 hover:text-amber-950 hover:bg-amber-100 rounded-xl transition-colors"
                >
                    <LuX className="text-xl" />
                </button>

                {/* Content Block */}
                <div className="flex flex-col items-center text-center space-y-4 pt-2">
                    {/* Soft red alert warning anchor badge */}
                    <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                        <LuTriangle className="text-3xl animate-bounce" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-amber-950">
                            Delete Employee Record?
                        </h2>
                        <p className="text-sm text-amber-900/80 leading-relaxed px-2">
                            Are you sure you want to permanently remove{" "}
                            <span className="font-semibold text-amber-950">
                                {employee.firstName} {employee.lastName} ?
                            </span>
                        </p>
                    </div>
                </div>

                {/* Action Buttons Layout */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-6 pt-4 border-t border-amber-100">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto order-2 sm:order-1 px-4 py-2.5 text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-full sm:w-auto order-1 sm:order-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm transition-colors"
                    >
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteEmployeeModal;
