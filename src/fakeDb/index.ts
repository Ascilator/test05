import resThermoChain from "../assets/termo_response.json";
import resThermoTrend from "../assets/termo_trend_response.json";

import resDeformation from "../assets/deformation_response.json";
import resDeformationTrend from "../assets/deformation_trend_response.json";

const tableThermoHeaders = [
  0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5,
  14.5, 15.5, 16.5, 17.5, 18.5, 19.5, 20.5, 21.5, 22.5, 23.5, 24.5, 25.5, 26.5,
  27.5, 28.5,
];

const tableDeformationHeaders = ["Отметка", "Дельта", "Валидно ли"];

export {
  resThermoChain,
  resThermoTrend,
  tableThermoHeaders,
  tableDeformationHeaders,
  resDeformation,
  resDeformationTrend,
};
