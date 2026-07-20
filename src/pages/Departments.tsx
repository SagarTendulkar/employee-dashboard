import AddDepartmentModal from "@/components/department/AddDepartmentModal";
import DeleteDepartmentModal from "@/components/department/DeleteDepartmentModal";
import type { FormData } from "@/components/department/DepartmentForm";
import DepartmentTable from "@/components/department/DepartmentTable";
import EditDepartmentModal from "@/components/department/EditDepartmentModal";
import SearchBar from "@/components/employee/SearchBar";
import useEmployees from "@/hooks/useEmployees";
import type { Department } from "@/types/department";
import { useEffect, useMemo, useState } from "react";
import { LuBuilding2 } from "react-icons/lu";

const Departments = () => {
    const { employees, loading, error } = useEmployees();
    const [departments, setDepartments] = useState<Department[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] =
        useState<Department | null>(null);
    const [deletingDepartment, setDeletingDepartment] =
        useState<Department | null>(null);
    const [seeded, setSeeded] = useState(false);

    // Seed the department list from the unique departments found on the
    // employee records. This only runs once, the first time employee data
    // arrives, so later local add/edit/delete isn't overwritten.
    useEffect(() => {
        if (!seeded && employees.length > 0) {
            const uniqueNames = Array.from(
                new Set(employees.map((employee) => employee.company.department)),
            ).sort();

            setDepartments(
                uniqueNames.map((name, index) => ({
                    id: index + 1,
                    name,
                })),
            );
            setSeeded(true);
        }
    }, [employees, seeded]);

    // Live employee count per department name, computed from employee data.
    const employeeCounts = useMemo(() => {
        return employees.reduce<Record<string, number>>((counts, employee) => {
            const department = employee.company.department;
            counts[department] = (counts[department] ?? 0) + 1;
            return counts;
        }, {});
    }, [employees]);

    const filteredDepartments = useMemo(() => {
        if (!searchTerm) return departments;

        const search = searchTerm.trim().toLowerCase();
        return departments.filter((department) =>
            department.name.toLowerCase().includes(search),
        );
    }, [departments, searchTerm]);

    const handleAddDepartment = (data: FormData) => {
        setDepartments((prev) => [
            ...prev,
            { id: Date.now(), name: data.name },
        ]);
        setIsAddModalOpen(false);
    };

    const handleEditDepartment = (data: FormData) => {
        if (!editingDepartment) return;

        setDepartments((prev) =>
            prev.map((department) =>
                department.id === editingDepartment.id
                    ? { ...department, name: data.name }
                    : department,
            ),
        );
        setEditingDepartment(null);
    };

    const handleDeleteDepartment = () => {
        if (!deletingDepartment) return;

        setDepartments((prev) =>
            prev.filter((department) => department.id !== deletingDepartment.id),
        );
        setDeletingDepartment(null);
    };

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-50">
                <p className="text-amber-900 font-medium animate-pulse">
                    Loading departments...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-600 bg-red-50 border border-red-200 rounded-xl font-medium">
                Something went wrong, Error:{" "}
                {error instanceof Error ? error.message : String(error)}
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-amber-50/50 p-4 border border-amber-200/60 rounded-2xl shadow-sm">
                <div className="w-full md:max-w-md">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search departments..."
                    />
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-xl transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                    <LuBuilding2 className="text-base" />
                    <span>Add Department</span>
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden">
                <DepartmentTable
                    departments={filteredDepartments}
                    employeeCounts={employeeCounts}
                    onEdit={setEditingDepartment}
                    onDelete={setDeletingDepartment}
                />
            </div>

            {isAddModalOpen && (
                <AddDepartmentModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddDepartment}
                />
            )}
            {editingDepartment && (
                <EditDepartmentModal
                    department={editingDepartment}
                    onClose={() => setEditingDepartment(null)}
                    onSubmit={handleEditDepartment}
                />
            )}
            {deletingDepartment && (
                <DeleteDepartmentModal
                    department={deletingDepartment}
                    employeeCount={
                        employeeCounts[deletingDepartment.name] ?? 0
                    }
                    onClose={() => setDeletingDepartment(null)}
                    onConfirm={handleDeleteDepartment}
                />
            )}
        </div>
    );
};

export default Departments;
