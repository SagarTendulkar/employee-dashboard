const DashboardHeader = () => {
    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="mb-8 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-amber-700">
                    👋 Good Morning
                </p>

                <h1 className="mt-1 text-3xl font-bold text-amber-950">
                    Dashboard Overview
                </h1>

                <p className="mt-2 text-sm text-amber-700">
                    Welcome back, Sagar. Here's what's happening today.
                </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-amber-700">
                    Today
                </p>

                <p className="mt-1 font-semibold text-amber-900">{today}</p>
            </div>
        </div>
    );
};

export default DashboardHeader;
