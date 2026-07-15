import { FiBell, FiUser } from "react-icons/fi";

const Header = () => {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <h1 className="text-lg font-semibold">Employee Dashboard</h1>

            <div className="mx-8 flex-1">
                <input
                    type="text"
                    placeholder="Search employees..."
                    className="w-full rounded-md border px-3 py-2 outline-none"
                />
            </div>

            <div className="flex items-center gap-4">
                <FiBell size={20} />
                <div className="flex items-center gap-2">
                    <FiUser size={20} />
                    <span>Sagar</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
