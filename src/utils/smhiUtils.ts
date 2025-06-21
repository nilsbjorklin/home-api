import { ParameterListResponse } from "../models/smhi/parameterListResponse.js";
import { ParameterResponse } from "../models/smhi/parameterResponse.js";


export const getAvailableParameters = (json:ParameterListResponse):{[key: string]: {title:string, summary: string}} => {
    return json.resource.reduce((prev, resource) => ({ ...prev, [resource.key]: {title: resource.title, summary: resource.summary}}), {}) 
}

export const getStationKey = (name:string, json:ParameterResponse)=> {
    return json.station.filter(station => station.active && station.name.toLowerCase().includes(name.toLowerCase()))[0]?.key;
}

export const getActiveStations = (json:ParameterResponse):{[key: string]: {name:string, summary: string}} => {
    return json.station.filter(station => station.active)
    .reduce((prev, station) => ({ ...prev, [station.key]: {name: station.name, summary: station.summary}}), {})
}