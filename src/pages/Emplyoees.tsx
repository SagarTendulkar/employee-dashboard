import Pagination from "@/components/common/Pagination";
import AddEmployeeModal from "@/components/employee/AddEmployeeModal";
import BulkDeleteModal from "@/components/employee/BulkDeleteModal";
import DeleteEmployeeModal from "@/components/employee/DeleteEmployeeModal";
import DepartmentFilter from "@/components/employee/DepartmentFilter";
import EditEmployeeModal from "@/components/employee/EditEmployeeModal";
import EmployeeDetailsModal from "@/components/employee/EmployeeDetailsModal";
import type { FormData } from "@/components/employee/EmployeeForm";
import EmployeeSkeleton from "@/components/employee/EmployeeSkeleton";
import EmployeeTable, {
    type SortDirection,
    type SortField,
} from "@/components/employee/EmployeeTable";
import SearchBar from "@/components/employee/SearchBar";
import useEmployees from "@/hooks/useEmployees";
import type { Employee } from "@/types/employee";
import { exportToCSV } from "@/utils/exportToCSV";
import { parseEmployeesCSV } from "@/utils/importFromCSV";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { LuDownload, LuTrash2, LuUpload, LuUserPlus } from "react-icons/lu";

const ITEMS_PER_PAGE = 10;

const Employees = () => {
    const { employees: serverEmployees, loading, error } = useEmployees();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [sortField, setSortField] = useState<SortField>("name");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null,
    );
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(
        null,
    );
    const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(
        null,
    );
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync Server state to Local state for mock editing operations
    useEffect(() => {
        if (serverEmployees && serverEmployees.length > 0) {
            setEmployees(serverEmployees);
        }
    }, [serverEmployees]);

    // Reset pagination window when search or sort triggers change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortField, sortDirection, selectedDepartment]);

    const departments = useMemo(() => {
        return Array.from(
            new Set(employees.map((employee) => employee.company.department)),
        ).sort();
    }, [employees]);

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

        if (selectedDepartment) {
            result = result.filter(
                (employee) =>
                    employee.company.department === selectedDepartment,
            );
        }

        const sortedEmployees = [...result];

        sortedEmployees.sort((a, b) => {
            let valueA: string;
            let valueB: string;

            switch (sortField) {
                case "email":
                    valueA = a.email.toLowerCase();
                    valueB = b.email.toLowerCase();
                    break;
                case "department":
                    valueA = a.company.department.toLowerCase();
                    valueB = b.company.department.toLowerCase();
                    break;
                case "name":
                default:
                    valueA = `${a.firstName} ${a.lastName}`.toLowerCase();
                    valueB = `${b.firstName} ${b.lastName}`.toLowerCase();
                    break;
            }

            return sortDirection === "asc"
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        });

        return sortedEmployees;
    }, [searchTerm, employees, sortField, sortDirection, selectedDepartment]);

    const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedEmployees = filteredEmployees.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE,
    );

    const handleSortChange = (field: SortField) => {
        if (field === sortField) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const handleToggleSelect = (id: number) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleToggleSelectAll = () => {
        const pageIds = paginatedEmployees.map((employee) => employee.id);
        const allSelected = pageIds.every((id) => selectedIds.has(id));

        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (allSelected) {
                pageIds.forEach((id) => next.delete(id));
            } else {
                pageIds.forEach((id) => next.add(id));
            }
            return next;
        });
    };

    const handleBulkDelete = () => {
        setEmployees((prev) =>
            prev.filter((employee) => !selectedIds.has(employee.id)),
        );
        setSelectedIds(new Set());
        setIsBulkDeleteOpen(false);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleImportFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = ""; // allow re-importing the same file later
        if (!file) return;

        try {
            const imported = await parseEmployeesCSV(file);
            setEmployees((prev) => [...prev, ...imported]);
        } catch {
            // Silently ignore malformed files for now; a toast/error state
            // would be a good follow-up here.
        }
    };

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
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <EmployeeSkeleton />
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
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                </div>

                {/* Actions Wrapper: Flex container holds Department selector and control buttons together */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                    <DepartmentFilter
                        value={selectedDepartment}
                        departments={departments}
                        onChange={setSelectedDepartment}
                    />
                    <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 flex-wrap">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv"
                            onChange={handleImportFile}
                            className="hidden"
                        />
                        <button
                            onClick={handleImportClick}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border border-amber-200 bg-white text-amber-900 hover:bg-amber-50 transition shadow-sm cursor-pointer whitespace-nowrap"
                        >
                            <LuUpload className="text-base" />
                            Import CSV
                        </button>

                        <button
                            onClick={() => exportToCSV(filteredEmployees)}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border border-amber-200 bg-white text-amber-900 hover:bg-amber-50 transition shadow-sm cursor-pointer whitespace-nowrap"
                        >
                            <LuDownload className="text-base" />
                            Export CSV
                        </button>

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

            {/* Bulk actions bar, only shown once something is selected */}
            {selectedIds.size > 0 && (
                <div className="flex items-center justify-between gap-4 bg-amber-100/60 border border-amber-300 rounded-2xl px-4 py-3">
                    <p className="text-sm font-semibold text-amber-900">
                        {selectedIds.size} selected
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSelectedIds(new Set())}
                            className="px-3 py-1.5 text-xs font-semibold text-amber-900 bg-white hover:bg-amber-50 border border-amber-200 rounded-lg transition-colors"
                        >
                            Clear
                        </button>
                        <button
                            onClick={() => setIsBulkDeleteOpen(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            <LuTrash2 className="text-sm" />
                            Delete Selected
                        </button>
                    </div>
                </div>
            )}

            {/* Main Data Table */}
            <EmployeeTable
                employees={paginatedEmployees}
                onView={setSelectedEmployee}
                onEdit={setEditingEmployee}
                onDelete={setDeletingEmployee}
                sortField={sortField}
                sortDirection={sortDirection}
                onSortChange={handleSortChange}
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
                onToggleSelectAll={handleToggleSelectAll}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

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
            {isBulkDeleteOpen && (
                <BulkDeleteModal
                    count={selectedIds.size}
                    onClose={() => setIsBulkDeleteOpen(false)}
                    onConfirm={handleBulkDelete}
                />
            )}
        </div>
    );
};

export default Employees;
