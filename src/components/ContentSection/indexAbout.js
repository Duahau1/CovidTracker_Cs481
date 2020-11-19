import React from 'react'
import { ImgWrap } from './contentElements'
import{
ContentContainer,
ContentWrapper,
ContentRow,
Column1,
Column2,
TextWrapper,
TopLine,
Heading,
Subtitle,
BtnWrap,
AboutBtnLink,
Img} from './contentElements'

const AboutContentSection = ({
    lightBg, 
    id,
    linkOne, 
    imgStart, 
    topLine, 
    lightText,
    headline, 
    darkText, 
    description, 
    img, 
    alt, 
    buttonLabel, 
    primary, 
    dark, 
    dark2}) => {
    return (
        <>
         <ContentContainer lightBg={lightBg} id={id}>
            <ContentWrapper>
                <ContentRow imgStart={imgStart}>
                    <Column1>
                    <ImgWrap>
                    <Img  src={img} alt={alt} />
                    </ImgWrap>
                    </Column1>
                    <Column2>
                    <TextWrapper>
                        <TopLine>{topLine}</TopLine>
                        <Heading lightText={lightText}>{headline}</Heading>
                        <Subtitle darkText={darkText}>{description}</Subtitle>
                        <BtnWrap>
                            <AboutBtnLink href={linkOne} 
                            smooth={true}
                            duration={500}
                            spy={true}
                            exact="true"
                            offset={-80}
                            primary={primary ? 1 : 0}
                            dark={dark ? 1 : 0}
                            dark2={dark2 ? 1 : 0}
                            >{buttonLabel}</AboutBtnLink>
                        </BtnWrap>
                    </TextWrapper>
                    </Column2>
                </ContentRow>
            </ContentWrapper>
         </ContentContainer>
        </>
    )
}


export default AboutContentSection
