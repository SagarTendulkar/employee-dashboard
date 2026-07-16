import type { Employee } from "@/types/employee";
import { LuX, LuMail, LuBriefcase } from "react-icons/lu";

interface EmployeeDetailsModalProps {
    employee: Employee;
    onClose: () => void;
}

const EmployeeDetailsModal = ({
    employee,
    onClose,
}: EmployeeDetailsModalProps) => {
    return (
        // Full-screen semi-transparent overlay backdrop
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-sm animate-fade-in">
            {/* Modal Container Card */}
            <div className="relative w-full max-w-md bg-white rounded-3xl border border-amber-200 shadow-2xl p-6 overflow-hidden animate-scale-up">
                {/* Close Button top-right */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 cursor-pointer text-amber-800 hover:text-amber-950 hover:bg-amber-100 rounded-xl transition-colors"
                >
                    <LuX className="text-xl" />
                </button>

                {/* Profile Card Header Info */}
                <div className="flex flex-col items-center text-center space-y-4 pt-4">
                    <img
                        src={employee.image}
                        alt={`${employee.firstName} avatar`}
                        className="w-24 h-24 rounded-full object-cover border-4 border-amber-100 bg-amber-50 shadow-sm"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-amber-950">
                            {employee.firstName} {employee.lastName}
                        </h2>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 text-xs font-semibold tracking-wider text-amber-800 uppercase bg-amber-100/70 rounded-full">
                            <LuBriefcase className="text-sm" />
                            {employee.company?.department || "General Staff"}
                        </span>
                    </div>
                </div>

                {/* Meta details split section */}
                <div className="mt-6 pt-6 border-t border-amber-100 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
                        <LuMail className="text-lg text-amber-700 shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-amber-800/70 uppercase tracking-wider">
                                Email Address
                            </p>
                            <p className="text-sm text-amber-950 font-medium break-all">
                                {employee.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom action cancel toolbar */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-5 py-2.5 cursor-pointer text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors"
                    >
                        Close Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetailsModal;
