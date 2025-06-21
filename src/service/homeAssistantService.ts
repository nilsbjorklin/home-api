import 'dotenv/config'
import { logger } from "../index.js";
import { StatesResponse } from '../models/homeAssistant/statesResponse.js';

const get = async (path:string) => {
    const basePath = process.env.HOME_ASSISTANT_BASE_URL
    const accessToken = process.env.HOME_ASSISTANT_ACCESS_TOKEN
    const url: URL = new URL('/api' + path, basePath);
    logger.info({url: url.toString(), method: 'GET'}, 'Outgoing request to Home assistant API');
    const response = await fetch(url, {headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer '+ accessToken || ''}});
    if (!response.ok) {
        logger.error({status:response.status, statusText:response.statusText}, 'Request failed');
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    logger.info({status: response.status}, 'Request successful');
    const body = await (response).json()
    logger.debug({json: body}, 'Request successful');
    return body;
    
}
export const alive = async (): Promise<boolean> => {
    try {
        await get('/')
        return true
    } catch (error) {
        logger.error({error: error}, 'Failed to connect to Home Assistant');
        return false;
    }
}
export const states = async (): Promise<StatesResponse> => {
    return await get('/states')
}