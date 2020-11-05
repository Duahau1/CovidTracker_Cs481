import React, {useState} from 'react'
import Footer from '../components/Footer';
import World from '../components/Globe/Globe';
import ScrollToTop from '../components/ScrollToTop';
import PageSidebar from '../components/Sidebar/pageSideBar';
import PageNavbar from '../components/Navbar/pageNav';

const GlobePage = () => {
   
    const[isOpen, setIsOpen] = useState(false);

    const toggle = () =>{
        setIsOpen(!isOpen)
    }

    return (
        <>
            <ScrollToTop />
            <PageSidebar isOpen={isOpen}  toggle={toggle} />
            <PageNavbar toggle={toggle} />
            <World />
            <Footer/>
        </>
    )
}

export default GlobePage
