import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import Loader from './Loader';


function getPercentageOf(slice, total) {
  return (slice.data.value / parseFloat(total)) * 100;
}

const SimplePiechart = ({ data, total }) => {
  const height = 400;
  const width = 400;

  // this is so that the browser doesnt show the labels of each slice
  // in the pie chart when the values of the piechart data array are all 0's
  if (data.filter((ele) => ele.value === 0).length > 0) {
    return <Loader />;
  }

  // defines what to mathematically use to display the data
  const pie = d3.pie().value((d) => d.value)(data);

  return (
    <svg className="inst-pie" height={height} width={width}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        <Slice pie={pie} total={total} />
      </g>
    </svg>
  );
};

const Slice = ({ pie, total }) => {
  // some boilerplate stuff... not too sure how it works
  const arc = d3.arc().innerRadius(0).outerRadius(200);

  // returns an array of <g> elements where it contains the slices, and labels for each slice.
  return pie
    .filter((slice) => Math.floor(getPercentageOf(slice, total)) > 0)
    .map((slice, index) => (
      <g className={`inst-pie-slice-${index}`} key={`${index.toString()}`}>
        <path key={`${slice.data.label}value`} d={arc(slice)} />
        <text
          x="0"
          key={`${slice.data.label}label`}
          transform={`translate(${arc.centroid(slice)})`}
        >
          <tspan className="inst-pie-name">{slice.data.label}</tspan>
          <tspan x="0" dy="1.2em" className="inst-pie-percent">{`${getPercentageOf(slice, total).toFixed(2)}%`}</tspan>
        </text>
      </g>
    ));
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
