import React, {useState} from 'react';
import Footer from '../components/Footer';
import PageNavbar from '../components/Navbar/pageNav';
import ScrollToTop from '../components/ScrollToTop';
import PageSidebar from '../components/Sidebar/pageSideBar';
import Game from '../components/TicTacToe';

const TicTacToePage = () => {

    const[isOpen, setIsOpen] = useState(false);

    const toggle = () =>{
        setIsOpen(!isOpen)
    }

    return (
        <>
            <ScrollToTop />
            <PageSidebar isOpen={isOpen} toggle={toggle} />
            <PageNavbar toggle={toggle}/>
            <Game />
            <Footer/>
        </>
    )
}

export default TicTacToePage
