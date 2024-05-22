/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  resDeformation,
  resDeformationTrend,
  tableDeformationHeaders,
  resThermoChain,
  resThermoTrend,
  tableThermoHeaders,
} from "../fakeDb";

export function configureFakeBackend() {
  const realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(handleRoute, 500);

      function handleRoute() {
        switch (true) {
          case url.toString().endsWith("/data/thermochain"):
            return resolve(
              fakeResponse({
                resThermoChain,
                resThermoTrend,
                tableThermoHeaders,
              })
            );
          case url.toString().endsWith("/data/deformation"):
            return resolve(
              fakeResponse({
                resDeformation,
                resDeformationTrend,
                tableDeformationHeaders,
              })
            );
          default:
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        }
      }
    });
  };
}

function fakeResponse(body: any) {
  const responseInit = {
    status: 200,
    statusText: "OK",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  };
  return new Response(JSON.stringify(body), responseInit);
}
