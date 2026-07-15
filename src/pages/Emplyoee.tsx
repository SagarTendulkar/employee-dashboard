import EmployeeTable from "@/components/employee/EmployeeTable";
import useEmployees from "@/hooks/useEmployees";

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
            <EmployeeTable employees={employees} />
        </div>
    );
};

export default Employee;
