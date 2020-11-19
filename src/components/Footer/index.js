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
                            <FooterLinkTitle>GitHub Links</FooterLinkTitle>
                                <FooterLink href="https://github.com/acevedo88">Alex Acevedo</FooterLink>
                                <FooterLink href="https://github.com/Duahau1">Van Nguyen</FooterLink>
                                <FooterLink href="https://github.com/paytonelsey">Payton Elsey</FooterLink>
                                <FooterLink href="https://github.com/KassAdams">Kass Adams</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Boise State University</FooterLinkTitle>
                                <FooterLink href="https://www.boisestate.edu/">BSU Homepage</FooterLink>
                                <FooterLink href="https://www.boisestate.edu/coen-cs/">Computer Science Department</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>COVID-19 Information</FooterLinkTitle>
                                <FooterLink href="https://www.cdc.gov/">CDC Homepage</FooterLink>
                                <FooterLink href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">COVID-19 Symptoms</FooterLink>
                                <FooterLink href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html">COVID-19 Testing</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to='/' onClick={toggleHome}>Covid19 Tracker</SocialLogo>
                        <WebsiteRights> PKVA © {new Date().getFullYear()}All Rights Reserved.</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href="https://www.facebook.com/" target="_blank"
                            aria-label="Facebook">
                                <FaFacebook />
                            </SocialIconLink>
                            <SocialIconLink href="https://www.instagram.com/" target="_blank"
                            aria-label="Instagram">
                                <FaInstagram />
                            </SocialIconLink>
                            <SocialIconLink href="https://www.linkedin.com/" target="_blank"
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
