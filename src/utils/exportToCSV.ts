import type { Employee } from "@/types/employee";

export const exportToCSV = (employees: Employee[]) => {
    const headers = ["Name", "Email", "Department"];

    const rows = employees.map((employee) => [
        `${employee.firstName} ${employee.lastName}`,
        employee.email,
        employee.company?.department || "N/A", // 💡 Added optional chaining fallback guard
    ]);

    // 💡 Fix: Safely escape cells by wrapping strings in quotes and replacing existing inner quotes
    const csvContent = [headers, ...rows]
        .map((row) =>
            row
                .map((cell) => {
                    const stringValue =
                        cell === null || cell === undefined ? "" : String(cell);
                    // If the cell contains quotes, commas, or newlines, escape internal quotes and wrap the cell
                    if (
                        stringValue.includes('"') ||
                        stringValue.includes(",") ||
                        stringValue.includes("\n")
                    ) {
                        return `"${stringValue.replace(/"/g, '""')}"`;
                    }
                    return `"${stringValue}"`; // Safely wrap all textual fields
                })
                .join(","),
        )
        .join("\n");

    // Generate file structure blob content configuration
    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const today = new Date().toISOString().split("T")[0]; // Generates YYYY-MM-DD template

    link.href = url;
    link.download = `employees-${today}.csv`;

    // Append to virtual document tree execution pipeline
    document.body.appendChild(link);
    link.click();

    // Clean up memory leaks and temporary elements
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
