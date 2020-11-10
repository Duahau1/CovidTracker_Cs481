import { Grid, _ } from 'gridjs-react';
import React from 'react';
import "gridjs/dist/theme/mermaid.css";
const FLAG_ENDPOINT='https://disease.sh/assets/img/flags';

const pdfGrid =()=>{
    function unixConvertTime(time){
        var date = new Date(time);
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        return month+"/"+day+"/"+year;
        }
    function getFlag(d){
        if(d==null){
            return "us";
        }
        else{
            return String(d).toLowerCase();
        }
    }
    return (
        <div>
        <h1>Covid19 Coronavirus Tracker Worlwide Report </h1>
        <Grid 
        search={false}
        columns={[
                {name:"Flag",
                 formatter: (cell) => _(<img style={{height:40, width:50}} src={cell} alt="flag" />)},
                 "Country","Updated time","Total Cases","Total Deaths"
                ]}
        server={{
            url: "https://corona.lmao.ninja/v2/countries",
            then: data=>data.map(value=>[`${FLAG_ENDPOINT}/${getFlag(value.countryInfo.iso2)}.png`,value.country,unixConvertTime(value.updated),value.cases,value.deaths]),
            handle: (res) => {
                // no matching records found
                if (res.status === 404) return {data: []};
                if (res.ok) return res.json();
                throw Error('Not found');
        }}}
        pagination={false}
        sort={false}
        />

        </div>
        )
    }
export default pdfGrid;