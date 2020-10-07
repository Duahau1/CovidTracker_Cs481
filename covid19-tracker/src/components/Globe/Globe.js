import React, {useState, useEffect, useMemo, useRef} from 'react'
import Globe from 'react-globe.gl';
import {getPolygonLabel} from './Label';
import * as d3 from 'd3'
import TimeLine from './AdditonalInfo';
import Spinner from './Spinner';
import './Globe.css';


const World = (props)=>{
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: []});
    const [hoverD, setHoverD] = useState();
    const [dimension,setDimension] = useState({width:window.innerWidth,height:window.innerHeight})
    const [worldTotal,setTotal] = useState({infected:0, deaths:0,recovered:0})
    const [loading,setLoading] =useState(false);

    useEffect(() => {

        window.addEventListener('resize', () => {
          setDimension({width:window.innerWidth,height:window.innerHeight});
        });
        globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.7;
     const fetchData= async() =>{
      let covidData = await fetch("https://corona.lmao.ninja/v2/countries").then(res=>res.json());
      
      let data = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson').then(res => res.json());
      let totalDeaths=0,totalCases=0,recoveries =0;
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
        if(found===undefined){
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
            totalCases+=Number(found.totalCases);
            totalDeaths+=Number(found.totalDeaths);
            recoveries+=Number(found.recoveries);
        }
        })
      
      setCountries(data);
      setTotal({infected:totalCases,deaths:totalDeaths,recovered:recoveries});
      setLoading(true);
    }

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
        return (
        <div className="Canvas_Container">
          <div className="top-info-container">
      <div className="title">COVID-19 GLOBE TRACKER</div>
    </div>{loading ? null : <Spinner/> }
        <Globe
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
        />
        <TimeLine infected={worldTotal.infected} deaths={worldTotal.deaths} recovered={worldTotal.recovered}/>
       </div>
        );

}

export default World;