import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar/>

            <main className="page-shell flex-1">
                <Outlet/>
            </main>

            <Footer/>
        </div>
    )
}