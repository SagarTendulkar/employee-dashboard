const RecentAnnouncements = () => {
    return (
        <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-amber-900">
                Recent Announcements
            </h2>

            <div className="space-y-4">
                <p className="rounded-lg bg-amber-50 p-3">
                    Annual meeting on Friday.
                </p>

                <p className="rounded-lg bg-amber-50 p-3">
                    New employees joining next week.
                </p>

                <p className="rounded-lg bg-amber-50 p-3">HR policy updated.</p>
            </div>
        </section>
    );
};

export default RecentAnnouncements;
