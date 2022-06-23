import mathData from "./mathData";
import potpourriData from "./potpourriData";
import scienceData from "./scienceData";
import sportsData from "./sportsData";

export const data = { mathData, potpourriData, scienceData, sportsData }

export const allData = [...mathData, ...potpourriData, ...scienceData, ...sportsData]

export default data