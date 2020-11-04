import React, {useState} from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop';
import Sidebar from '../components/Sidebar';
import USAMap from '../components/map/usamap';

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
            <USAMap />
            <Footer/>
        </>
    )
}

export default USAPage
