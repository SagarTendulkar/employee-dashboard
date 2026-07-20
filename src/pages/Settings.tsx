import { useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

type Theme = "light" | "dark";

const Settings = () => {
    const [theme, setTheme] = useState<Theme>("light");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [weeklyDigest, setWeeklyDigest] = useState(false);

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            {/* Profile */}
            <section className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6 space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-amber-900">
                        Profile
                    </h2>
                    <p className="text-sm text-amber-700">
                        Your basic account information
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-amber-900">
                            Full Name
                        </label>
                        <input
                            defaultValue="Admin User"
                            className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-amber-900">
                            Email Address
                        </label>
                        <input
                            defaultValue="admin@company.com"
                            className="w-full px-3 py-2 text-sm bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-amber-100">
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-xl transition-colors shadow-sm">
                        Save Changes
                    </button>
                </div>
            </section>

            {/* Theme */}
            <section className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6 space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-amber-900">
                        Theme
                    </h2>
                    <p className="text-sm text-amber-700">
                        Choose how the dashboard looks
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setTheme("light")}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl border transition-colors ${
                            theme === "light"
                                ? "bg-amber-700 text-white border-amber-700 shadow-sm"
                                : "bg-white text-amber-900 border-amber-200 hover:bg-amber-50"
                        }`}
                    >
                        <LuSun className="text-base" />
                        Light
                    </button>
                    <button
                        onClick={() => setTheme("dark")}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl border transition-colors ${
                            theme === "dark"
                                ? "bg-amber-700 text-white border-amber-700 shadow-sm"
                                : "bg-white text-amber-900 border-amber-200 hover:bg-amber-50"
                        }`}
                    >
                        <LuMoon className="text-base" />
                        Dark
                    </button>
                </div>
                <p className="text-xs text-amber-700/70">
                    Dark mode isn't wired up to the rest of the app yet — this
                    is just the selector UI for now.
                </p>
            </section>

            {/* Preferences */}
            <section className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6 space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-amber-900">
                        Preferences
                    </h2>
                    <p className="text-sm text-amber-700">
                        Manage how you're notified
                    </p>
                </div>

                <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-amber-100 bg-amber-50/40 cursor-pointer">
                        <div>
                            <p className="text-sm font-medium text-amber-950">
                                Email Notifications
                            </p>
                            <p className="text-xs text-amber-700">
                                Get notified about employee changes
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={(e) =>
                                setEmailNotifications(e.target.checked)
                            }
                            className="h-5 w-5 accent-amber-700"
                        />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-amber-100 bg-amber-50/40 cursor-pointer">
                        <div>
                            <p className="text-sm font-medium text-amber-950">
                                Weekly Digest
                            </p>
                            <p className="text-xs text-amber-700">
                                Summary of headcount and department changes
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            checked={weeklyDigest}
                            onChange={(e) => setWeeklyDigest(e.target.checked)}
                            className="h-5 w-5 accent-amber-700"
                        />
                    </label>
                </div>
            </section>
        </div>
    );
};

export default Settings;
