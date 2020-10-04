import { format } from "d3";
import './Globe.css';
const FLAG_ENDPOINT='https://disease.sh/assets/img/flags';
export function getPolygonLabel(flagName, d) {
    return `
          <div class="card">
            <img class="card-img" src="${FLAG_ENDPOINT}/${flagName}.png" alt="flag" />
            <div class="container">
               <span class="card-title"><b>${d.NAME}</b></span> <br />
               <div class="card-spacer"></div>
               <hr />
               <div class="card-spacer"></div>
               <span>Cases: ${d.totalCases}</span>  <br />
               <span>Deaths: ${d.totalDeaths}</span> <br />
               <span>Recovered: ${d.recoveries}</span> <br />
               <span>Active: ${d.activeCases}</span>  <br />
               <span>Population: ${format(".3s")(d.POP_EST)}</span>
            </div>
          </div>
        `;
}