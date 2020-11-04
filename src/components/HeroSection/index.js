import React from 'react'
import Video from '../../video/covid3.mp4'
import {
HeroContainer,
HeroBackground,
VideoBackground,
HeroContent,
HeroH1, 
HeroP1,
} from './HeroElements'

function HeroSection() {

    return (
        <HeroContainer>
            <HeroBackground>
                <VideoBackground autoPlay loop muted src={Video} 
                type='video/mp4'/>
            </HeroBackground>
            <HeroContent>
                <HeroH1>Covid 19 Tracker</HeroH1>
                <HeroP1>Boise State Computer Science Senior Design</HeroP1>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
