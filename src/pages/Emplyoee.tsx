import useEmployees from "@/hooks/useEmployees";
import { LuUser, LuBriefcase } from "react-icons/lu";

const Employee = () => {
    // Fixed typo from 'Emplyoee' to 'Employee'
    const { employees, loading, error } = useEmployees();

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-50">
                <p className="text-amber-900 font-medium animate-pulse">
                    Loading employees...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-600 bg-red-50 border border-red-200 rounded-xl font-medium">
                Something went wrong, Error: {error}
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-amber-950 mb-6">
                Staff Directory
            </h1>

            {/* Grid Layout for Employee Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {employees?.map((employee) => (
                    <div
                        key={employee.id}
                        className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
                    >
                        <div>
                            {/* Header with Icon and Name */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                                    <LuUser className="text-xl" />
                                </div>
                                <h2 className="text-lg font-semibold text-amber-950">
                                    {employee.firstName} {employee.lastName}
                                </h2>
                            </div>

                            {/* Details Stack */}
                            <div className="space-y-1.5 pl-1">
                                <p className="text-sm text-amber-900/80 break-all">
                                    <span className="font-medium text-amber-900">
                                        Email:
                                    </span>{" "}
                                    {employee.email}
                                </p>

                                {/* Dynamic nested company department mapping */}
                                <div className="flex items-center gap-1.5 text-sm text-amber-800">
                                    <LuBriefcase className="text-amber-600 shrink-0" />
                                    <span>
                                        {employee.company?.department ||
                                            "No Department Assigned"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Employee;
