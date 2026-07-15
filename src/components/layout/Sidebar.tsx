import { menuItems } from "@/config/navigation";

const SideBar = () => {
    return (
        <aside className="flex flex-col w-64 bg-amber-50 border-r border-amber-200">
            {/* Logo Container */}
            <div className="h-16 flex items-center px-6 border-b border-amber-200">
                <a
                    href="/"
                    className="text-xl font-bold text-amber-800 tracking-wide"
                >
                    Logo
                </a>
            </div>

            <nav className="flex-1 mt-4 px-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        // Assign the icon component to a Capitalized variable name
                        const Icon = item.icon;

                        return (
                            <li key={item.id}>
                                <a
                                    href={item.path}
                                    className="flex items-center gap-3 px-4 py-3 text-amber-900 rounded-lg transition-colors hover:bg-amber-100 hover:text-amber-950 font-medium"
                                >
                                    {/* Render the Icon component dynamically with size/styling */}
                                    <Icon className="text-xl text-amber-700 shrink-0" />
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;
