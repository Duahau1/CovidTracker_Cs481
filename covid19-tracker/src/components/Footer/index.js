import React from 'react'
import {animateScroll as scroll} from 'react-scroll'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import{
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink
} from './FooterElements'

const Footer = () => {

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About us</FooterLinkTitle>
                                <FooterLink to="/signin">Boise State</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>About us</FooterLinkTitle>
                                <FooterLink to="/signin">Boise State</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About us</FooterLinkTitle>
                                <FooterLink to="/signin">Boise State</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>About us</FooterLinkTitle>
                                <FooterLink to="/signin">Boise State</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                                <FooterLink to="/signin">Whatever</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to='/' onClick={toggleHome}>Covid19 Tracker</SocialLogo>
                        <WebsiteRights> PKVA © {new Date().getFullYear()}All Rights Reserved.</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href="/" target="_blank"
                            aria-label="Facebook">
                                <FaFacebook />
                            </SocialIconLink>
                            <SocialIconLink href="/" target="_blank"
                            aria-label="Instagram">
                                <FaInstagram />
                            </SocialIconLink>
                            <SocialIconLink href="/" target="_blank"
                            aria-label="Linkedin">
                                <FaLinkedin />
                            </SocialIconLink>
                            
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer
