
import React from "react";
import CandlestickChart from "components/Charts/ApexChart.js";
import OHLCChart from "components/Charts/OhlcChart.js";
export default function CoinCardLineChart(mmPrice ) {
  if(!mmPrice) {
    return null;
  }

  React.useEffect(() => {

  }, []);
    
  
  
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">

              </h6>
              <h2 className="text-white text-xl font-semibold">BTC Price</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* <div className="relative h-350-px"> */}
            <CandlestickChart cdata={mmPrice}/>
            {/* <OHLCChart/> */}
          {/* </div> */}
        </div>
      </div>
    </>
  )
}
