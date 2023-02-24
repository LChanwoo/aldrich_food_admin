import React, { useRef, useEffect } from 'react';

const OHLCChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 캔버스의 크기 지정
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // x, y 축 레이블과 데이터 범위 계산
    const xLabelCount = Math.min(10, data.length);
    const xLabelInterval = Math.floor(data.length / xLabelCount);
    const yLabelCount = 10;
    const yLabelInterval = Math.ceil((Math.max(...data.map(d => d.high)) - Math.min(...data.map(d => d.low))) / yLabelCount);

    // x, y 축 스케일 계산
    const xScale = canvas.width / (data.length + 1);
    const yScale = canvas.height / (Math.max(...data.map(d => d.high)) - Math.min(...data.map(d => d.low)));

    // x, y 축 레이블 그리기
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i <= xLabelCount; i++) {
        const x = (i * xLabelInterval + 1) * xScale;
        const date = new Date(data[i * xLabelInterval].date);
        const label = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        ctx.fillText(label, x, canvas.height - 20);
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - 25);
        ctx.lineTo(x, 0);
        ctx.strokeStyle = 'lightgray';
        ctx.stroke();
    }
        for (let i = 0; i <= yLabelCount; i++) {
        const yValue = Math.max(...data.map(d => d.high)) - i * yLabelInterval;
        const y = (yValue - Math.min(...data.map(d => d.low))) * yScale;
        ctx.fillText(yValue.toFixed(2), 20, y);
        ctx.beginPath();
        ctx.moveTo(25, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = 'lightgray';
        ctx.stroke();
    }

        // 캔들스틱 그리기
        for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const x = (i + 1) * xScale;
        const yOpen = (d.open - Math.min(...data.map(d => d.low))) * yScale;
        const yHigh = (d.high - Math.min(...data.map(d => d.low))) * yScale;
        const yLow = (d.low - Math.min(...data.map(d => d.low))) * yScale;
        const yClose = (d.close - Math.min(...data.map(d => d.low))) * yScale;
        const isUp = d.close >= d.open;

        ctx.beginPath();
        ctx.strokeStyle = isUp ? 'green' : 'red';
        ctx.lineWidth = 2;
        ctx.moveTo(x, yHigh);
        ctx.lineTo(x, yLow);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = isUp ? 'green' : 'red';
        ctx.rect(x - xScale / 2, yOpen, xScale, yClose - yOpen);
        ctx.fill();
        }
    }, [data]);

    return (
    <div>
        <canvas ref={canvasRef} width={800} height={600} />
    </div>
    );
}


export default OHLCChart;