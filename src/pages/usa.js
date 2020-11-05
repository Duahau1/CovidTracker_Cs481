import React, {useState} from 'react'
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import USAMap from '../components/map/usamap';
import PageSidebar from '../components/Sidebar/pageSideBar';
import PageNavbar from '../components/Navbar/pageNav';

const USAPage = () => {
   
    const[isOpen, setIsOpen] = useState(false);

    const toggle = () =>{
        setIsOpen(!isOpen)
    }

    return (
        <>
            <ScrollToTop />
            <PageSidebar isOpen={isOpen} toggle={toggle} />
            <PageNavbar toggle={toggle}/>
            <USAMap />
            <Footer/>

        </>
    )
}

export default USAPage
