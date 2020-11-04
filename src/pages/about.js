import React, {useState} from 'react'
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import PageNavbar from '../components/Navbar/pageNav';
import ScrollToTop from '../components/ScrollToTop';
import PageSidebar from '../components/Sidebar/pageSideBar';

const AboutUsPage = () => {

    const[isOpen, setIsOpen] = useState(false);

    const toggle = () =>{
        setIsOpen(!isOpen)
    }

    return (
        <>
            <ScrollToTop />
            <PageSidebar isOpen={isOpen} toggle={toggle} />
            <PageNavbar toggle={toggle} />
            <HeroSection />
            <h1>This is the About Us Page</h1>
            <Footer/>
        </>
    )
}

export default AboutUsPage
