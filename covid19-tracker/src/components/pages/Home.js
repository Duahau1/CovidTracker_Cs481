import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import World from '../Globe';
class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      height: window.innerHeight, 
      width: window.innerWidth
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

    componentDidMount() {
      console.log(this.state.height);
      // Additionally I could have just used an arrow function for the binding `this` to the component...
      window.addEventListener("resize", this.updateDimensions);
    }
    updateDimensions() {
      this.setState({
        height: window.innerHeight, 
        width: window.innerWidth
      });
    }
  render(){
    
  return (
    <>
      <HeroSection />
      <World />
      <Cards />
      <Footer />
    </>
  );
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}

export default Home;
