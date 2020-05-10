import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';


const SimplePiechart = ({ data, total }) => {
  const height = 400;
  const width = 400;

  // this is so that the browser doesnt show the labels of each slice
  // in the pie chart when the values of the piechart data array are all 0's
  if (data.filter((ele) => ele.value === 0).length > 0) {
    return <p> Waiting for valid pie chart...</p>;
  }

  // defines what to mathematically use to display the data
  const pie = d3.pie().value((d) => d.value)(data);

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        <Slice pie={pie} total={total} />
      </g>
    </svg>
  );
};

const Slice = ({ pie, total }) => {
  // some boilerplate stuff... not too sure how it works
  const arc = d3.arc().innerRadius(0).outerRadius(200);
  const interpolate = d3.interpolate('#eeaf79', '#bc3358');

  // returns an array of <g> elements where it contains the slices, and labels for each slice.
  return pie.map((slice, index) => {
    console.log(slice, index);
    const sliceColor = interpolate(index / (pie.length - 1));

    return (
      <g key={`${index.toString()}`}>
        <path key={`${slice.data.label}value`} d={arc(slice)} fill={sliceColor} />
        <text
          key={`${slice.data.label}label`}
          transform={`translate(${arc.centroid(slice)})`}
          textAnchor="middle"
          fill="white"
        >
          {`${slice.data.label}: ${((slice.data.value / parseFloat(total)) * 100).toFixed(2)}%`}
        </text>
      </g>
    );
  });
};

SimplePiechart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  total: PropTypes.number.isRequired,
};

Slice.propTypes = {
  pie: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.number,
};

export default SimplePiechart;
