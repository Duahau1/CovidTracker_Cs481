import { Grid} from 'gridjs-react';
import React from 'react';
import "gridjs/dist/theme/mermaid.css";
import html2pdf from 'html2pdf.js';

const pdfGrid =()=>{
    function handlePDFcreate(){
        [...document.querySelectorAll('button')].map((value)=>{
            value.style.display='none';
        })
        const input = document.getElementById('divToPrint');
        html2pdf(input).then(()=>{
            [...document.querySelectorAll('button')].map((value)=>{
                value.style.display='block';
            })
            window.location.href ='/globe';
        }).catch((e)=>{
            console.log(e);
        })
    }
    function unixConvertTime(time){
        var date = new Date(time);
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        return month+"/"+day+"/"+year;
        }
    return (
        <div id="divToPrint">
        <h1 style={{color:'black'}}>Covid19 Coronavirus Tracker Worlwide Report </h1>
        <button style={{cursor:'pointer'}}onClick={handlePDFcreate}>Download</button>
        <Grid 
        search={false}
        columns={["Country","Updated time","Total Cases","Total Deaths"]}
        server={{
            url: "https://corona.lmao.ninja/v2/countries",
            then: data=>data.map(value=>[value.country,unixConvertTime(value.updated),value.cases,value.deaths]),
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