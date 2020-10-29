import React, {useState} from 'react'
import { FaArrowRight } from 'react-icons/fa'
import Video from '../../video/covid3.mp4'
import {Button} from '../ButtonElements'
import {
HeroContainer,
HeroBackground,
VideoBackground,
HeroContent,
HeroH1, 
HeroP1, 
HeroBtnWrapper, 
ArrowForward, 
ArrowRight} from './HeroElements'

function HeroSection() {
const [hover, setHover] = useState(false)

const onHover = () => {
    setHover(!hover)
}

    return (
        <HeroContainer>
            <HeroBackground>
                <VideoBackground autoPlay loop muted src={Video} 
                type='video/mp4'/>
            </HeroBackground>
            <HeroContent>
                <HeroH1>Covid 19 Tracker</HeroH1>
                <HeroP1>Boise State CS Senior Design</HeroP1>
                <HeroBtnWrapper>
                    <Button to='signup' 
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary='true'
                    dark='true'
                    >
                        Get Started {hover ? <ArrowForward /> : <ArrowRight/>}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
