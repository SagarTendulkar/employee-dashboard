import DepartmentForm, { type FormData } from "./DepartmentForm";
import { LuX } from "react-icons/lu";

interface AddDepartmentModalProps {
    onClose: () => void;
    onSubmit: (data: FormData) => void;
}

const AddDepartmentModal = ({
    onClose,
    onSubmit,
}: AddDepartmentModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-white rounded-3xl border border-amber-200 shadow-2xl p-6">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-100">
                    <h2 className="text-xl font-bold text-amber-950">
                        Add New Department
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-amber-800 hover:text-amber-950 hover:bg-amber-100 rounded-lg transition-colors"
                    >
                        <LuX className="text-lg" />
                    </button>
                </div>

                <DepartmentForm onSubmit={onSubmit} onCancel={onClose} />
            </div>
        </div>
    );
};

export default AddDepartmentModal;
