import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

interface EmployeeFormProps {
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    defaultValues?: FormData;
}

const schema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters",
    }),
    email: z.email({
        message: "Please enter a valid email address",
    }),
    department: z.string().min(1, {
        message: "Department is required",
    }),
});

export type FormData = z.infer<typeof schema>;

const EmployeeForm = ({
    onSubmit,
    onCancel,
    defaultValues,
}: EmployeeFormProps) => {
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
            <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-amber-900">
                        First Name
                    </label>
                    <input
                        {...register("firstName")}
                        placeholder="John"
                        className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    {errors.firstName && (
                        <p className="text-xs text-red-600 font-medium mt-0.5">
                            {errors.firstName.message}
                        </p>
                    )}
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-amber-900">
                        Last Name
                    </label>
                    <input
                        {...register("lastName")}
                        placeholder="Doe"
                        className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    {errors.lastName && (
                        <p className="text-xs text-red-600 font-medium mt-0.5">
                            {errors.lastName.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
                <label className="text-xs font-semibold text-amber-900">
                    Email Address
                </label>
                <input
                    {...register("email")}
                    placeholder="john.doe@company.com"
                    className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {errors.email && (
                    <p className="text-xs text-red-600 font-medium mt-0.5">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Department */}
            <div className="space-y-1">
                <label className="text-xs font-semibold text-amber-900">
                    Department
                </label>
                <input
                    {...register("department")}
                    placeholder="Engineering"
                    className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {errors.department && (
                    <p className="text-xs text-red-600 font-medium mt-0.5">
                        {errors.department.message}
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
                    Save Employee
                </button>
            </div>
        </form>
    );
};

export default EmployeeForm;
