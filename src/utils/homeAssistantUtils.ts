import { StatesResponse } from "../models/homeAssistant/statesResponse.js";

export const filterScripts = (json:StatesResponse) => {
    return json.filter(state => state.entity_id.startsWith('script.'))
}