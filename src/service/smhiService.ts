import { DataResponse } from "../models/smhi/dataResponse.js";

import 'dotenv/config'
import { ParameterListResponse } from "../models/smhi/parameterListResponse.js";
import { logger } from "../index.js";
import { ParameterResponse } from "../models/smhi/parameterResponse.js";

const get = async (path:string) => {
    const url: URL = new URL('/api/version/latest' + path, process.env.SMHI_BASE_URL);
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
    return await get('/parameter.json')
}
export const getParameter = async (parameterKey: string): Promise<ParameterResponse> => {
    return await get(`/parameter/${parameterKey}.json`)
}
export const getData = async (parameterKey: string, stationKey:string): Promise<DataResponse> => {
    return await get(`/parameter/${parameterKey}/station/${stationKey}/period/latest-day/data.json`)
}