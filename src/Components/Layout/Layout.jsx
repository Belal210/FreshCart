import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

export default function Layout() {

    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        <ScrollToTopButton/>
        </>
    )
}