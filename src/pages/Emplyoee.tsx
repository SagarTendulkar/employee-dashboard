import AddEmployeeModal from "@/components/employee/AddEmployeeModal";
import DeleteEmployeeModal from "@/components/employee/DeleteEmployeeModal";
import EditEmployeeModal from "@/components/employee/EditEmployeeModal";
import EmployeeDetailsModal from "@/components/employee/EmployeeDetailsModal";
import type { FormData } from "@/components/employee/EmployeeForm";
import EmployeeTable from "@/components/employee/EmployeeTable";
import SearchBar from "@/components/employee/SearchBar";
import SortDropdown from "@/components/employee/SortDropdown";
import useEmployees from "@/hooks/useEmployees";
import type { Employee } from "@/types/employee";
import { useMemo, useState } from "react";
import { LuUserPlus } from "react-icons/lu";

export type SortOption = "name-asc" | "name-desc";

const Employee = () => {
    const { employees, loading, error, setEmployees } = useEmployees();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("name-asc");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null,
    );
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(
        null,
    );
    const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(
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

    const handleAddEmployee = (data: FormData) => {
        const newEmployee: Employee = {
            id: Date.now(),
            image: "https://dummyjson.com/icon/emilys/128",
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            company: {
                department: data.department,
            },
        };
        setEmployees((prev) => [...prev, newEmployee]);
        setIsAddModalOpen(false);
    };

    const handleEditEmployee = (data: FormData) => {
        if (!editingEmployee) return;

        setEmployees((prev) =>
            prev.map((employee) =>
                employee.id === editingEmployee.id
                    ? {
                          ...employee,
                          firstName: data.firstName,
                          lastName: data.lastName,
                          email: data.email,
                          company: {
                              ...employee.company,
                              department: data.department,
                          },
                      }
                    : employee,
            ),
        );
        setEditingEmployee(null);
    };

    const handleDeleteEmployee = () => {
        if (!deletingEmployee) return;

        setEmployees((prev) =>
            prev.filter((employee) => employee.id !== deletingEmployee.id),
        );

        setDeletingEmployee(null);
    };

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-amber-50/50 p-4 border border-amber-200/60 rounded-2xl shadow-sm">
                <div className="w-full md:max-w-md">
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                    <div className="w-full sm:w-auto shrink-0">
                        <SortDropdown value={sortBy} onChange={setSortBy} />
                    </div>

                    <div className="w-full sm:w-auto shrink-0">
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-xl transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                        >
                            <LuUserPlus className="text-base" />
                            <span>Add Employee</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Data Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden">
                <EmployeeTable
                    employees={filteredEmployees}
                    onView={setSelectedEmployee}
                    onEdit={setEditingEmployee}
                    onDelete={setDeletingEmployee}
                />
            </div>
            {selectedEmployee && (
                <EmployeeDetailsModal
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                />
            )}
            {editingEmployee && (
                <EditEmployeeModal
                    employee={editingEmployee}
                    onClose={() => setEditingEmployee(null)}
                    onSubmit={handleEditEmployee}
                />
            )}
            {deletingEmployee && (
                <DeleteEmployeeModal
                    employee={deletingEmployee}
                    onClose={() => setDeletingEmployee(null)}
                    onConfirm={handleDeleteEmployee}
                />
            )}
            {isAddModalOpen && (
                <AddEmployeeModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddEmployee}
                />
            )}
        </div>
    );
};

export default Employee;
