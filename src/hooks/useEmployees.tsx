import { getEmployees } from "@/services/employeeService";
// import type { Employee } from "@/types/employee";
import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

const useEmployees = () => {
    // const [employees, setEmployees] = useState<Employee[]>([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchEmployees = async () => {
    //         setLoading(true);
    //         setError(null);
    //         try {
    //             const res = await getEmployees();
    //             setEmployees(res);
    //         } catch (error: unknown) {
    //             if (error instanceof Error) {
    //                 setError(error.message);
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchEmployees();
    // }, []);

    const { data, isLoading, error } = useQuery({
        queryKey: ["employees"],
        queryFn: getEmployees,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {
        employees: data ?? [],
        loading: isLoading,
        error,
    };
};

export default useEmployees;
