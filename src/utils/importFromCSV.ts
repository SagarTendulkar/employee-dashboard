import type { Employee } from "@/types/employee";

// Parses a single CSV line, respecting quoted cells that may contain commas.
const parseLine = (line: string): string[] => {
    const cells: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            cells.push(current.trim());
            current = "";
        } else {
            current += char;
        }
    }
    cells.push(current.trim());
    return cells;
};

/**
 * Parses a CSV file matching the shape produced by exportToCSV:
 * headers "Name,Email,Department", one employee per row.
 * "Name" is split on the first space into first/last name.
 */
export const parseEmployeesCSV = (file: File): Promise<Employee[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            try {
                const text = String(reader.result ?? "");
                const lines = text
                    .split(/\r?\n/)
                    .map((line) => line.trim())
                    .filter((line) => line.length > 0);

                if (lines.length === 0) {
                    resolve([]);
                    return;
                }

                // Skip the header row.
                const rows = lines.slice(1);

                const employees: Employee[] = rows.map((line, index) => {
                    const [name = "", email = "", department = ""] =
                        parseLine(line);
                    const [firstName = "", ...rest] = name.split(" ");
                    const lastName = rest.join(" ");

                    return {
                        id: Date.now() + index,
                        firstName: firstName || "Unknown",
                        lastName,
                        email,
                        image: "https://dummyjson.com/icon/emilys/128",
                        company: { department: department || "Unassigned" },
                    };
                });

                resolve(employees);
            } catch (err) {
                reject(err);
            }
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
};
