import React, {useState} from 'react';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import Game from '../components/TicTacToe/Game';
import { GameRules } from '../components/TicTacToe/GameRules'
import Grid from '@material-ui/core/Grid';
import PageSidebar from '../components/Sidebar/pageSideBar';
import PageNavbar from '../components/Navbar/pageNav';

const TicTacToePage = () => {

    const[isOpen, setIsOpen] = useState(false);

    const toggle = () =>{
        setIsOpen(!isOpen)
    }

    return (
        <>
            <ScrollToTop />
            <PageSidebar isOpen={isOpen} toggle={toggle} />
            <PageNavbar toggle={toggle} />
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

