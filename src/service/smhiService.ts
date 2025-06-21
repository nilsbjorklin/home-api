import { DataResponse } from "../models/smhi/dataResponse.js";

import 'dotenv/config'
import { ParameterListResponse } from "../models/smhi/parameterListResponse.js";
import { logger } from "../index.js";
import { ParameterResponse } from "../models/smhi/parameterResponse.js";

const basePath = process.env.SMHI_BASE_URL + '/api/version/latest'
const get = async (url: URL) => {
    logger.info({url: url.toString(), method: 'GET'}, 'Outgoing request to SMHI API');
    const response = await fetch(url, {headers: {'Accept': 'application/json'}});
    if (!response.ok) {
        logger.error({status:response.status, statusText:response.statusText}, 'Request failed');
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    logger.info({status: response.status}, 'Request successful');
    const body = await (response).json()
    logger.debug({json: body}, 'Request successful');
    return body;
    
}
export const getParameters = async (): Promise<ParameterListResponse> => {
    const dataUrl =new URL(`${basePath}/parameter.json`);
    return await get(dataUrl)
}
export const getParameter = async (parameterKey: string): Promise<ParameterResponse> => {
    const dataUrl =new URL(`${basePath}/parameter/${parameterKey}.json`)
    return await get(dataUrl)
}
export const getData = async (parameterKey: string, stationKey:string): Promise<DataResponse> => {
    const dataUrl =new URL(`${basePath}/parameter/${parameterKey}/station/${stationKey}/period/latest-day/data.json`)
    return await get(dataUrl)
}