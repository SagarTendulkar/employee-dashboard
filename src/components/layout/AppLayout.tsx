import Dashboard from "@/pages/Dashboard";
import Header from "./Header";
import SideBar from "./Sidebar";
import Employee from "@/pages/Emplyoee";

const Applayout = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <div className="flex ">
                <SideBar />
                <main className="flex-1">
                    <Dashboard />
                    <Employee />
                </main>
            </div>
        </div>
    );
};

export default Applayout;
