import axios from 'axios';
import React, { useRef, useEffect } from 'react';


function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

export default  function CandlestickChart ({cdata}) {
    console.log(cdata)
    const data=cdata.mmPrice[0];
    const canvasRef = useRef();
    const candlestickCtxRef1 = useRef(null);
    const candlestickCtxRef2 = useRef(null);
    const candlesticks = [];
    useEffect(() => {
      drawCandlestickChart();
      
      return () => window.removeEventListener('resize', drawCandlestickChart);
    }, []);
  
    const drawCandlestickChart = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const ctx2 = canvas.getContext('2d');
        candlestickCtxRef1.current = ctx;
        candlestickCtxRef2.current = ctx2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const ohlc = [];
        for (let i = 0; i < data.length; i++) {
            ohlc.push([new Date(data[i].time), data[i].open, data[i].high, data[i].low, data[i].close]);
        }
    

        const margin = 80;
        const width = canvas.width - margin * 2;
        const height = canvas.height - margin * 2*1.5;
        const xScale = width / (ohlc.length - 1);
        const yMinValue = Math.min(...ohlc.map(o => o[3]));
        const yMaxValue = Math.max(...ohlc.map(o => o[2]));
        const yScale = height / (yMaxValue - yMinValue);
    
        for (let i = 0; i < ohlc.length; i++) {
        const [date, open, high, low, close] = ohlc[i];
        const x = i * xScale + margin;
        const yOpen = (open - yMinValue) * yScale + margin;
        const yHigh = (high - yMinValue) * yScale + margin;
        const yLow = (low - yMinValue) * yScale + margin;
        const yClose = (close - yMinValue) * yScale + margin;
        candlesticks.push({
            x, yOpen, yHigh, yLow, yClose,
            date: formatDate(date),
            open: open.toFixed(2),
            high: high.toFixed(2),
            low: low.toFixed(2),
            close: close.toFixed(2)
        });
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(x, yHigh);
        ctx.lineTo(x, yLow);
        ctx.strokeStyle = close > open ? 'green' : 'red';
        ctx.stroke();

        ctx2.beginPath();
        ctx2.moveTo(x, yClose);
        ctx2.lineTo(x, yOpen);
        ctx2.moveTo(x , yOpen);
        ctx2.strokeStyle = close > open ? 'green' : 'red';
        ctx2.lineWidth =15
        ctx2.stroke();
        }             
    
        const yLabelCount = Math.floor(height / 50);
        const yLabelInterval = (yMaxValue - yMinValue) / yLabelCount;
        ctx.font = '14px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        for (let i = 0; i <= yLabelCount; i++) {
            const yValue = Math.max(...ohlc.map(o => o[2])) - i * yLabelInterval;
            const y = (-yValue + yMinValue) * yScale + margin;
            ctx.fillText(yValue.toFixed(2), 5, y + canvas.height/2 +margin);
        }
    
        const xLabelCount = Math.min(15, ohlc.length);
        const xLabelInterval = Math.floor(ohlc.length / xLabelCount);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        for (let i = 0; i < xLabelCount; i++) {
            const [date, open, high, low, close] = ohlc[i * xLabelInterval];
            const x = i * xScale * xLabelInterval + margin;
            ctx.fillText(formatDate(date), x, canvas.height - margin + 5);
        }
        
        
        };
        return (
        <div style={{ width: '100%', height: '500px' }}>
            <canvas ref={canvasRef} width="1900" height="600" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
      );
};