import React, {useState} from 'react';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
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
