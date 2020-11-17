import React, {useState} from 'react'
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import PageSidebar from '../components/Sidebar/pageSideBar';
import PageNavbar from '../components/Navbar/pageNav';
import { alex, payton, van, kass } from '../components/ContentSection/Data';
import AboutContentSection from '../components/ContentSection/indexAbout';


const AboutUsPage = () => {

    const[isOpen, setIsOpen] = useState(false);

    const toggle = () =>{
        setIsOpen(!isOpen)
    }

    return (
        <>
            <ScrollToTop />
            <PageSidebar isOpen={isOpen} toggle={toggle} />
            <PageNavbar toggle={toggle}/>
            <AboutContentSection {...alex} />
            <AboutContentSection {...payton}/>
            <AboutContentSection {...van}/>
            <AboutContentSection {...kass}/>
            <Footer/>
        </>
    )
}

export default AboutUsPage
