import React, {useState} from 'react'
import ContentSection from '../components/ContentSection';
import { homeObjectOne } from '../components/ContentSection/Data';
import { homeObjectTwo } from '../components/ContentSection/Data';
import { homeObjectThree } from '../components/ContentSection/Data';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop';
import Sidebar from '../components/Sidebar'

const Home = () => {
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
            <ContentSection {...homeObjectOne}/>
            <ContentSection {...homeObjectTwo}/>
            <ContentSection {...homeObjectThree}/>
            <Footer/>
        </>
    )
}

export default Home
