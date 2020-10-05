const express = require('express');
const redis = require('redis');
const axios = require('axios');
const cors = require ('cors');
const app = express();
app.use(cors());
app.use(express.json());

let client = redis.createClient({
    port: 17973,              
    host: 'redis-17973.c80.us-east-1-2.ec2.cloud.redislabs.com', 
    password: 'YqsN0RhLGiomT8hSj3VeL1LcJDRae7oo'
})

function getCovidData(stateName){
    let url = `https://disease.sh/v3/covid-19/nyt/states/${stateName}`;
    return axios({
        method: 'get',
        url: url
    });
}
module.exports = app.get("/api/server",async (req,res)=>{
    
    let state = req.query.stateName;
    client.dbsize((err,num)=>{
        if(num>30){
            client.flushall();
        }
    })
    client.get(state,async(err, data)=>{
        if(data){
            console.log("In cache");
            return res.status(200).send(JSON.parse(data));
        }
        else{
            let covidData = await getCovidData(state).then(data=>data).catch(res.status(404).send("Not found"));
            if(covidData.status===200){
            client.setex(state,1440,JSON.stringify(covidData.data));
            return res.status(200).send(covidData.data);
            }
        }
    })
    
})