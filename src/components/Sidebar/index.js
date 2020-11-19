import React from 'react'
import {SidebarContainer, 
    Icon, 
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute} 
    from './SidebarElements'

const Sidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="globe" onClick={toggle}>Globe Map</SidebarLink>
                    <SidebarLink to="usa" onClick={toggle}>USA Map</SidebarLink>
                    <SidebarLink to="tictactoe" onClick={toggle}>TicTacToe</SidebarLink>
                    <SidebarLink to="about" onClick={toggle}>About Us</SidebarLink>
                </SidebarMenu>
                
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
