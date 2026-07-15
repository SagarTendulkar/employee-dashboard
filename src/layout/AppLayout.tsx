import Header from "./Header";
import SideBar from "./Sidebar";

const Applayout = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <div className="flex ">
                <SideBar />
                <main className="flex-1">
                    <h1>Dashboard</h1>
                </main>
            </div>
        </div>
    );
};

export default Applayout;
