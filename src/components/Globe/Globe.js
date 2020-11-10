import React, {useState, useEffect, useMemo, useRef} from 'react'
import Globe from 'react-globe.gl';
import {getPolygonLabel} from './Label';
import * as d3 from 'd3'
import TimeLine from './AdditonalInfo';
import Spinner from './Spinner';
import './Globe.css';
import Modal from '../Modal/Modal.js';
import {BsSearch} from 'react-icons/bs';
import {FaTable} from 'react-icons/fa';
import {RiFileDownloadLine} from 'react-icons/ri';

const World = (props)=>{
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: []});
    const [hoverD, setHoverD] = useState();
    const [dimension,setDimension] = useState({width:window.innerWidth,height:window.innerHeight})
    const [worldTotal,setTotal] = useState({infected:0, deaths:0,recovered:0})
    const [loading,setLoading] =useState(false);
    const [modalState,setModalState] = useState(false);
    const [data,setData] =useState([]);
    const [countryInfo, setCountryInfo] = useState({name:'',caseperM:0,deathsperM:0,totalCase:0,testperM:0});
    const [search,setSearch] =useState(false);
    const [program, setProgram] = useState('');

    useEffect(() => {
        let mounted =true;
        
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
              activeCases:value.active,
              deathsPerOneMillion:value.deathsPerOneMillion,
              casesPerOneMillion:value.casesPerOneMillion,
              testsPerOneMillion:value.testsPerOneMillion
          })
      })
      data.features.forEach((value,i,array)=>{
        let found = covid.get(array[i].properties.ISO_A2)
        if(found===undefined){
            array[i].properties.totalCases = 0;
            array[i].properties.totalDeaths = 0;
            array[i].properties.recoveries = 0;
            array[i].properties.activeCases = 0;
            array[i].properties.caseperM = 0;
            array[i].properties.deathsperM =0;
        }
        else{
            array[i].properties.totalCases = found.totalCases;
            array[i].properties.totalDeaths = found.totalDeaths;
            array[i].properties.recoveries = found.recoveries;
            array[i].properties.activeCases = found.activeCases;
            array[i].properties.caseperM = found.casesPerOneMillion;
            array[i].properties.deathsperM = found.deathsPerOneMillion;
            array[i].properties.testperM = found.testsPerOneMillion;
            totalCases+=Number(found.totalCases);
            totalDeaths+=Number(found.totalDeaths);
            recoveries+=Number(found.recoveries);
        }
        })
      
      setCountries(data);
      setTotal({infected:totalCases,deaths:totalDeaths,recovered:recoveries});
      setLoading(true);
      setModalState(false);
    
    }
    if (mounted){
      fetchData();
    }
    return ()=>{
      mounted=false;
    }
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
        function handleSearch(){
          if(document.getElementsByClassName('scene-tooltip')[0].style.display===''){
            document.getElementsByClassName('scene-tooltip')[0].style.display="none";
          }
          else{
            document.getElementsByClassName('scene-tooltip')[0].style.display='';

          }
          setSearch(!search);
        }
        async function handleCountrySearch(e){
          if (e.key === 'Enter'){
            let country_name = e.target.value.toLowerCase();
           let country_data = await fetch(`https://disease.sh/v3/covid-19/countries/${country_name}`).then(
            res=>{
              if(res.status===404){
                return 404;
              }
              return res.json()});
           if(typeof country_data ==='number' || country_name.length===0){
            document.getElementById('search_field').value="";
           }
           else{
           setCountryInfo({
            name:country_data.country,
            caseperM:country_data.casesPerOneMillion,
            deathsperM:country_data.deathsPerOneMillion,
            totalCase:country_data.totalCases,
            testperM:country_data.testsPerOneMillion
          });
           setModalState(true);
           setProgram('search');
           setData([country_data.active,country_data.deaths,country_data.recovered]);
           document.getElementById('search_field').value="";
            }
          }
        }
          function handleClose(){
            setModalState(false);
            setProgram('');
          }
          function handleTableView(){
            setProgram('table');
            setModalState(true);

          }
          function handlePDFcreate(e){
            document.getElementById('pdf-button').classList.add('small-download');
            fetch('http://tic-tac-tovid.herokuapp.com/pdf-create').then(response => response.blob())
            .then((blob)=>{
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "report.pdf";
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();    
                a.remove();  //afterwards we remove the element again 
                document.getElementById('pdf-button').classList.remove('small-download');
              })
        }
        return (
        <div className="Canvas_Container" >
          <div className="top-info-container">
     <div className="title">
       <FaTable onClick={handleTableView} className="search"></FaTable>
       <RiFileDownloadLine id="pdf-button" onClick={handlePDFcreate} className='search'></RiFileDownloadLine>
       {!search ?<p>COVID-19 GLOBE TRACKER</p>:<input id="search_field" onKeyDown={handleCountrySearch} placeholder="Search"/> 
        }
       <BsSearch onClick={handleSearch} className="search"></BsSearch>
      </div> 
     {/* <input className="title" placeholder="INPUT a country" />*/}
    {search?<span>Type the country name, iso2, or iso3 and press enter</span>:null}
    </div>{loading ? null : <Spinner page={'globe'}/> }
        <Modal show={modalState} program ={program}  handleClose={handleClose} name ={countryInfo}data={data}></Modal>
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
          onPolygonClick={({ properties: d },e)=>{
            setModalState(true);
            setProgram('search');
            setData([d.activeCases,d.totalDeaths,d.recoveries]);
            setCountryInfo({name:d.ADMIN,caseperM:d.caseperM,deathsperM:d.deathsperM,totalCase:d.totalCases,testperM:d.testperM});
          }}
          polygonsTransitionDuration={300}
          onGlobeClick={({ lat, lng }, event)=>{
            globeEl.current.controls().autoRotateSpeed = !globeEl.current.controls().autoRotateSpeed;         
           }}
        />
        <TimeLine infected={worldTotal.infected} deaths={worldTotal.deaths} recovered={worldTotal.recovered}/>
       </div>
        );

}

export default World;