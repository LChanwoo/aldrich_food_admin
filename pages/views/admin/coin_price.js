import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import CoinCardTable from "components/Cards/CardTable.js";
import CoinCardLineChart from "components/Cards/CoinCardLineChart.js";
import Admin from "layouts/Admin.js";
import axios from "axios";

export default  function CoinPrice({cdata}) {
  console.log(cdata)
  const [coinPrice, setCoinPrice] = useState([]);
  // if(coinPrice.length === 0){
  //   return null
  // }
  useEffect(() => {
    // WebSocket 서버와 연결합니다.
    // const socket = io('/ws-coin-price');
    // socket.on('connect', () => {
    //   console.log('Socket connected');
    // });
    
    // socket.on('disconnect', () => {
    //   console.log('Socket disconnected');
    // });
    // // 코인 가격 정보를 받으면, 화면에 업데이트합니다.
    // socket.on('coinPriceUpdate', (data) => {
    //   setCoinPrice(data);
    //   // console.log(data);
    // });
    // return () => {
    //   // 페이지가 unmount 될 때, WebSocket 연결을 종료합니다.
    //   socket.close();
    // };
  }, []);
  
  return (

    <>
      <div className="flex flex-wrap mt-4">
        <CoinCardLineChart mmPrice={cdata}/>
        
        <div className="w-full mb-12 px-4">
          <CoinCardTable />
        </div>

        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}

CoinPrice.layout = Admin;

export const getServerSideProps = async (ctx) => {
  try{
      const res = await axios.get('http://localhost:3500/api/coin_price');
      let {data} = res
      const props ={
          cdata:data
      }
      return {  props }
  }catch(e){
      console.log('error')
  }
}