import { Grid } from 'gridjs-react';
import React from 'react';
import "gridjs/dist/theme/mermaid.css";
const Globegrid =()=>{
    function unixConvertTime(time){
        var date = new Date(time);
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        return month+"/"+day+"/"+year;
        }
    return (
        <Grid 
        search={true}
        columns={["State","Updated time","Total Cases","Total Deaths"]}
        server={{
            url: "https://corona.lmao.ninja/v2/countries",
            then: data=>data.map(value=>[value.country,unixConvertTime(value.updated),value.cases,value.deaths]),
            handle: (res) => {
                // no matching records found
                if (res.status === 404) return {data: []};
                if (res.ok) return res.json();
                throw Error('Not found');
        }}}
        pagination={{
            limit:8
        }}
        sort={true}
        />)
    }
export default Globegrid;