let table = new gridjs.Grid({
    search: {
        enabled: true
      },
    columns:["State","Updated time","Total Cases","Total Deaths"],
    server:{
        url: "https://corona.lmao.ninja/v2/states",
        then: data=>data.map(value=>[value.state,unixConvertTime(value.updated),value.cases,value.deaths]),
        handle: (res) => {
            // no matching records found
            if (res.status === 404) return {data: []};
            if (res.ok) return res.json();
            throw Error('Not found');
          }

    },pagination:{
        limit:7
    },
    sort: true

}).render(document.getElementById("table"));

function unixConvertTime(time){
var date = new Date(time);
var year = date.getUTCFullYear();
var month = date.getUTCMonth() + 1;
var day = date.getUTCDate();
return month+"/"+day+"/"+year;
}
export {table};