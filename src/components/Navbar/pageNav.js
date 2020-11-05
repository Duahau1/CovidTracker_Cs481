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
    PageNavLinks, 
    NavBtn, 
    NavBtnLink} from './NavbarElements';


const PageNavbar = ({toggle}) => {
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
                  <NavLogo to="/" onClick={toggleHome}>PKVA </NavLogo>
                  <MobileIcon onClick={toggle}>
                      <FaBars />
                  </MobileIcon>
                  <NavMenu>
                  <NavItem>
                          <PageNavLinks to="/"
                          smooth={true} duration={500} spy={true}
                          exact='true' offset={-80}>Home</PageNavLinks>
                      </NavItem>
                      <NavItem>
                          <PageNavLinks to="/globe"
                          smooth={true} duration={500} spy={true}
                          exact='true' offset={-80}>Globe Map</PageNavLinks>
                      </NavItem>
                      <NavItem>
                          <PageNavLinks to="/usa"
                          smooth={true} duration={500} spy={true}
                          exact='true' offset={-80}>USA Map</PageNavLinks>
                      </NavItem>
                      <NavItem>
                          <PageNavLinks to="/tictactoe"
                          smooth={true} duration={500} spy={true}
                          exact='true' offset={-80}>TicTacToe</PageNavLinks>
                      </NavItem>
                      <NavItem>
                          <PageNavLinks to="/aboutUs"
                          smooth={true} duration={500} spy={true}
                          exact='true' offset={-80}>About Us</PageNavLinks>
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

export default PageNavbar
