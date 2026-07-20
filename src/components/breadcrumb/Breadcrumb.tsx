import { Link, useLocation } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";

const Breadcrumb = () => {
    const { pathname } = useLocation();

    const paths = pathname.split("/").filter(Boolean);

    return (
        <div className="mb-6 flex items-center text-sm text-amber-700">
            <Link to="/" className="hover:text-amber-900">
                Dashboard
            </Link>

            {paths.map((path, index) => {
                const route = "/" + paths.slice(0, index + 1).join("/");

                return (
                    <div key={route} className="flex items-center">
                        <LuChevronRight className="mx-2" />

                        <Link
                            to={route}
                            className="capitalize hover:text-amber-900"
                        >
                            {path}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
