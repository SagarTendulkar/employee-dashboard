import EmployeeDetailsModal from "@/components/employee/EmployeeDetailsModal";
import EmployeeTable from "@/components/employee/EmployeeTable";
import SearchBar from "@/components/employee/SearchBar";
import SortDropdown from "@/components/employee/SortDropdown";
import useEmployees from "@/hooks/useEmployees";
import type { Employee } from "@/types/employee";
import { useMemo, useState } from "react";

export type SortOption = "name-asc" | "name-desc";

const Employee = () => {
    const { employees, loading, error } = useEmployees();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("name-asc");
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null,
    );

    const filteredEmployees = useMemo(() => {
        let result = employees;

        if (searchTerm) {
            const search = searchTerm.trim().toLowerCase();
            result = employees.filter((employee) => {
                return (
                    employee.firstName.toLowerCase().includes(search) ||
                    employee.lastName.toLowerCase().includes(search) ||
                    `${employee.firstName} ${employee.lastName}`
                        .toLowerCase()
                        .includes(search) ||
                    employee.email.toLowerCase().includes(search)
                );
            });
        }

        const sortedEmployees = [...result];

        sortedEmployees.sort((a, b) => {
            const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
            const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

            switch (sortBy) {
                case "name-asc":
                    return nameA.localeCompare(nameB);
                case "name-desc":
                    return nameB.localeCompare(nameA);
                default:
                    return 0;
            }
        });

        return sortedEmployees;
    }, [searchTerm, employees, sortBy]);

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
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Toolbar Section: Combines search and sort side-by-side */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-50/50 p-4 border border-amber-200/60 rounded-2xl shadow-sm">
                <div className="w-full sm:max-w-md">
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                </div>
                <div className="w-full sm:w-auto shrink-0">
                    <SortDropdown value={sortBy} onChange={setSortBy} />
                </div>
            </div>

            {/* Main Data Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden">
                <EmployeeTable
                    employees={filteredEmployees}
                    onView={setSelectedEmployee}
                />
            </div>
            {selectedEmployee && (
                <EmployeeDetailsModal
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                />
            )}
        </div>
    );
};

export default Employee;
