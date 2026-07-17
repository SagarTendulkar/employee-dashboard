import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";
import Departments from "@/pages/Departments";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Employees from "@/pages/Emplyoees";
import Applayout from "@/components/layout/AppLayout";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Applayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
