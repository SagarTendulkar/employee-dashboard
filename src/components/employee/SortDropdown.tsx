interface SortDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

// Fixed: Destructured properties from a single props argument with accurate TypeScript binding
const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
    return (
        <div className="flex items-center gap-2 max-w-xs">
            <label
                htmlFor="sort-select"
                className="text-sm font-medium text-amber-900 shrink-0"
            >
                Sort By:
            </label>
            <select
                id="sort-select"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl text-sm text-amber-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 cursor-pointer"
            >
                <option value="name-asc">Name (A - Z)</option>
                <option value="name-desc">Name (Z - A)</option>
            </select>
        </div>
    );
};

export default SortDropdown;
