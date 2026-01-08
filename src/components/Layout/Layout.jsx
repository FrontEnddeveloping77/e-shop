import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Layout.css";
import Footer from './../Footer/Footer';


const Layout = () => {
    return (
        <div className="layout-wrapper">
            <Navbar />

            <main className="main-container">
                <Outlet />
            </main>

            <Footer></Footer>
        </div>
    );
};

export default Layout;