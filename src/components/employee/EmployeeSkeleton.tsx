const EmployeeSkeleton = () => {
    return (
        <>
            {/* Desktop table skeleton */}
            <div className="hidden sm:block w-full overflow-x-auto rounded-2xl border border-amber-200 bg-white shadow-sm">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="bg-amber-50/70 border-b border-amber-200">
                            <th className="p-4 w-10"></th>
                            <th className="p-4 w-16">Avatar</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Department</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <tr key={i}>
                                <td className="p-4">
                                    <div className="h-4 w-4 rounded bg-amber-100 animate-pulse" />
                                </td>
                                <td className="p-4">
                                    <div className="h-10 w-10 rounded-full bg-amber-100 animate-pulse" />
                                </td>
                                <td className="p-4">
                                    <div className="h-4 w-32 rounded bg-amber-100 animate-pulse" />
                                </td>
                                <td className="p-4">
                                    <div className="h-4 w-40 rounded bg-amber-100 animate-pulse" />
                                </td>
                                <td className="p-4">
                                    <div className="h-5 w-20 rounded-full bg-amber-100 animate-pulse" />
                                </td>
                                <td className="p-4">
                                    <div className="h-6 w-28 mx-auto rounded bg-amber-100 animate-pulse" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile card skeleton */}
            <div className="sm:hidden space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="p-4 rounded-2xl border border-amber-200 bg-white shadow-sm space-y-3"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-amber-100 animate-pulse" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-2/3 rounded bg-amber-100 animate-pulse" />
                                <div className="h-3 w-1/2 rounded bg-amber-100 animate-pulse" />
                            </div>
                        </div>
                        <div className="h-8 w-full rounded bg-amber-100 animate-pulse" />
                    </div>
                ))}
            </div>
        </>
    );
};

export default EmployeeSkeleton;
