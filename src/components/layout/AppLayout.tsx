import Dashboard from "@/pages/Dashboard";
import Header from "./Header";
import SideBar from "./Sidebar";

const Applayout = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <div className="flex ">
                <SideBar />
                <main className="flex-1">
                    <Dashboard />
                </main>
            </div>
        </div>
    );
};

export default Applayout;
