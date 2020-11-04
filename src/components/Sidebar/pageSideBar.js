import React from 'react'
import {SidebarContainer, 
    Icon, 
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    PageSidebarLink,
    SideBtnWrap,
    SidebarRoute} 
    from './SidebarElements'

const PageSidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <PageSidebarLink to="/" onClick={toggle}>Home</PageSidebarLink>
                    <PageSidebarLink to="/globe" onClick={toggle}>Globe Map</PageSidebarLink>
                    <PageSidebarLink to="/usa" onClick={toggle}>USA Map</PageSidebarLink>
                    <PageSidebarLink to="/tictactoe" onClick={toggle}>TicTacToe</PageSidebarLink>
                    <PageSidebarLink to="/aboutUS" onClick={toggle}>About Us</PageSidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to='/signin'>Sign In</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default PageSidebar
