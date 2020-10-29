import React, {useState} from 'react'
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop';
import Sidebar from '../components/Sidebar'

const SigninPage = () => {

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
            <h1>This is the Sign In Page</h1>
            <Footer/>
        </>
    )
}

export default SigninPage
