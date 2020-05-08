import * as React from 'react';
import * as d3 from 'd3';

// const data = [1, 2, 3, 4];

const SimplePiechart = ({ data, total }) => {
  const height = 400;
  const width = 400;

  const pie = d3.pie().value((d) => d.value) (data);

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        <Slice pie={pie} total={total}/>
      </g>
    </svg>
  );
};

const Slice = ({ pie, total }) => {
  const arc = d3.arc().innerRadius(0).outerRadius(200);
  const interpolate = d3.interpolate('#eeaf79', '#bc3358');

  return pie.map((slice, index) => {
    console.log(slice, index);
    const sliceColor = interpolate(index / (pie.length - 1));
    return (
      <g>
        <path key={index.toString()} d={arc(slice)} fill={sliceColor} />
        <text transform= {`translate(${arc.centroid(slice)})`} textAnchor="middle" fill="white"> 
          {slice.data.label} {((slice.data.value / parseFloat(total)) * 100).toFixed(2)} 
        </text>
      </g>
    );
  });
};

export default SimplePiechart;
