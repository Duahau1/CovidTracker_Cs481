import React, {useEffect, useState} from 'react';
import {FaBars} from 'react-icons/fa'
import {animateScroll as scroll} from 'react-scroll'
import {
    Nav, 
    NavBarContainer, 
    NavLogo, 
    MobileIcon, 
    NavMenu, 
    NavItem, 
    NavLinks, 
    NavBtn, 
    NavBtnLink} from './NavbarElements';


const Navbar = ({toggle}) => {
    const [scrollNav, setScrollNav] = useState(false)

    const changeNav = ()=> {
        if(window.scrollY >= 80){
            setScrollNav(true)
        }else{
            setScrollNav(false)
        }
    }

    useEffect(() =>{
        window.addEventListener('scroll', changeNav)
    }, [])

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <>
          <Nav scrollNav={scrollNav}>
              <NavBarContainer>
                  <NavLogo to="/" onClick={toggleHome}>PKVA</NavLogo>
                  <MobileIcon onClick={toggle}>
                      <FaBars />
                  </MobileIcon>
                  <NavMenu>
                      <NavItem>
                          <NavLinks to="covid" 
                          smooth={true} duration={500} spy={true}
                          exact='true' offset={-80}>COVID19</NavLinks>
                      </NavItem>
                      <NavItem>
                          <NavLinks to="tictactoe"
                          smooth={true} duration={500} spy={true}
                          exact='true' offset={-80}>TicTacToe</NavLinks>
                      </NavItem>
                      <NavItem>
                          <NavLinks to="about"
                          smooth={true} duration={500} spy={true}
                          exact='true' offset={-80}>About Us</NavLinks>
                      </NavItem>
                  </NavMenu>
                  <NavBtn>
                      <NavBtnLink to='/signin'
                      smooth={true} duration={500} spy={true}
                      exact='true' offset={-80}>Sign In</NavBtnLink>
                  </NavBtn>
              </NavBarContainer>
          </Nav>
        </>
    );
};

export default Navbar
