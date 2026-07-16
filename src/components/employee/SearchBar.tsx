import { LuSearch } from "react-icons/lu";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <div className=" relative items-center">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search employees..."
                className="w-full rounded-lg border pl-10 pr-4 py-2"
            />
        </div>
    );
};

export default SearchBar;
