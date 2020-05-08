import * as React from 'react';
import * as d3 from 'd3';

//const data = [1, 2, 3, 4];

const SimplePiechart = ({ data }) => {
  const height = 400;
  const width = 400;

  const pie = d3.pie().value((d) => d.value) (data);

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        <Slice pie={pie} />
      </g>
    </svg>
  );
};

const Slice = ({ pie }) => {
  const arc = d3.arc().innerRadius(0).outerRadius(200);
  const interpolate = d3.interpolate('#eeaf79', '#bc3358');

  return pie.map((slice, index) => {
    const sliceColor = interpolate(index / (pie.length - 1));
    return <path key={index.toString()} d={arc(slice)} fill={sliceColor} />;
  });
};

export default SimplePiechart;
