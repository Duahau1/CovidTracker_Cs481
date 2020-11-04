import React, {useState} from 'react';
import Footer from '../components/Footer';
import PageNavbar from '../components/Navbar/pageNav';
import ScrollToTop from '../components/ScrollToTop';
import PageSidebar from '../components/Sidebar/pageSideBar';
import Game from '../components/TicTacToe';
import Sidebar from '../components/Sidebar';
import Game from '../components/TicTacToe/Game';
import { GameRules } from '../components/TicTacToe/GameRules'
import Grid from '@material-ui/core/Grid';

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
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle}/>
            <Grid container
              spacing={5}
              alignItems="center"
              justify="center"
              direction="row">
              <Game />
              <GameRules />
            </Grid>
            <Footer/>
        </>
    )
}

export default TicTacToePage
