import React, {useState} from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection';
import ScrollToTop from '../components/ScrollToTop';
import Sidebar from '../components/Sidebar'

const USAPage = () => {
   
    const[isOpen, setIsOpen] = useState(false);

    const toggle = () =>{
        setIsOpen(!isOpen)
    }

    return (
        <>
            <ScrollToTop />
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle}/>
            <HeroSection />
            <h1>USA Map Page</h1>
            <Footer/>
        </>
    )
}

export default USAPage
