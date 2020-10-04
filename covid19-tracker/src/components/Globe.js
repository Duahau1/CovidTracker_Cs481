import React,{ useState, useEffect, useMemo,useRef } from 'react';
import Globe from 'react-globe.gl';
import * as d3 from 'd3';
import {getPolygonLabel} from './Label';
import './Globe.css';
import { scaleQuantize } from 'd3';

const World = (props)=>{
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: []});
    const [hoverD, setHoverD] = useState();
    const [dimension,setDimension] = useState({width:window.innerWidth,height:window.innerHeight})

    useEffect(() => {
        window.addEventListener('resize', () => {
          console.log(window.innerWidth);
          setDimension({width:window.innerWidth,height:window.innerHeight});
        });
        globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.7;
     const fetchData= async() =>{
      let covidData = await fetch("https://corona.lmao.ninja/v2/countries").then(res=>res.json());
      
      let data = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson').then(res => res.json());
      console.log(data);
      let covid = new Map();
      covidData.forEach(value=>{
          covid.set(value.countryInfo.iso2,{
              iso2:value.countryInfo.iso2,
              totalCases: value.cases,
              totalDeaths:value.deaths,
              recoveries:value.recovered,
              activeCases:value.active
          })
      })
      data.features.forEach((value,i,array)=>{
        let found = covid.get(array[i].properties.ISO_A2)
        if(found==undefined){
            array[i].properties.totalCases = 0;
            array[i].properties.totalDeaths = 0;
            array[i].properties.recoveries = 0;
            array[i].properties.activeCases = 0;
        }
        else{
            array[i].properties.totalCases = found.totalCases;
            array[i].properties.totalDeaths = found.totalDeaths;
            array[i].properties.recoveries = found.recoveries;
            array[i].properties.activeCases = found.activeCases;
        }
        })
      setCountries(data);}

      fetchData();
    }, []);
    
        // Getting the scale small enough so the globe looks nicer
        const getVal = feat => {
            return Math.pow(feat.properties.activeCases / feat.properties.POP_EST, 1 / 4);
        }    
        const maxVal = useMemo(
      () => Math.max(...countries.features.map(getVal)),
      [countries]
    );
        const colorScale = d3.scaleSequential(d3.interpolateReds)
        colorScale.domain([0, maxVal]);
    
        function getFlagName(d) {
            switch (d.ADMIN) {
              case "France":
                return "fr";
              case "Norway":
                return "no";
              default:
                return d.ISO_A2.toLowerCase();
            }
          }
        return <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          width={dimension.width}
          height={dimension.height}
          ref={globeEl}
          showAtmosphere={false}
          polygonsData={countries.features}
          polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
          polygonCapColor={d => d === hoverD ? '#eceac4' : colorScale(getVal(d))}
          polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
          polygonStrokeColor={() => '#111'}
          polygonLabel={({ properties: d }) => {
            const flagName = getFlagName(d);
            return getPolygonLabel(flagName, d);
  }}
          onPolygonHover={setHoverD}
          polygonsTransitionDuration={300}
        />;

}

export default World;