import {
    LuBell,
    LuChevronDown,
    LuMenu,
    LuMessageSquare,
    LuSearch,
} from "react-icons/lu";

const Navbar = () => {
    return (
        <header className="flex h-16 items-center justify-between border-b border-amber-200 bg-amber-50 px-6">
            {/* Left */}
            <div className="flex items-center gap-5">
                <button className="rounded-lg p-2 transition hover:bg-amber-100">
                    <LuMenu size={22} className="text-amber-900" />
                </button>

                <div className="relative w-96">
                    <LuSearch
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500"
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search employees, departments..."
                        className="w-full rounded-xl border border-amber-200 bg-white py-2.5 pl-10 pr-4 outline-none transition focus:border-amber-400"
                    />
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-5">
                <button className="relative rounded-lg p-2 transition hover:bg-amber-100">
                    <LuBell size={22} className="text-amber-900" />

                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                        3
                    </span>
                </button>

                <button className="relative rounded-lg p-2 transition hover:bg-amber-100">
                    <LuMessageSquare size={22} className="text-amber-900" />

                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                        5
                    </span>
                </button>

                <button className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-amber-100">
                    <img
                        src="https://i.pravatar.cc/100"
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                    />

                    <div className="text-left">
                        <p className="text-sm font-semibold text-amber-900">
                            Sagar Tendulkar
                        </p>

                        <p className="text-xs text-amber-700">Admin</p>
                    </div>

                    <LuChevronDown className="text-amber-800" size={18} />
                </button>
            </div>
        </header>
    );
};

export default Navbar;
