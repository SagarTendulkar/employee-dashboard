import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

interface DepartmentFormProps {
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    defaultValues?: FormData;
}

const schema = z.object({
    name: z.string().min(2, {
        message: "Department name must be at least 2 characters",
    }),
});

export type FormData = z.infer<typeof schema>;

const DepartmentForm = ({
    onSubmit,
    onCancel,
    defaultValues,
}: DepartmentFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
                <label className="text-xs font-semibold text-amber-900">
                    Department Name
                </label>
                <input
                    {...register("name")}
                    placeholder="Engineering"
                    className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {errors.name && (
                    <p className="text-xs text-red-600 font-medium mt-0.5">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Form Actions Layout */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-100 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors border border-amber-200"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-xl transition-colors shadow-sm"
                >
                    Save Department
                </button>
            </div>
        </form>
    );
};

export default DepartmentForm;
