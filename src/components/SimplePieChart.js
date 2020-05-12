import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';


function getPercentageOf(slice, total) {
  return Math.floor((slice.data.value / parseFloat(total)) * 100);
}

const SimplePiechart = ({ data, total }) => {
  const height = 400;
  const width = 400;

  // this is so that the browser doesnt show the labels of each slice
  // in the pie chart when the values of the piechart data array are all 0's
  if (data.filter((ele) => ele.value === 0).length > 0) {
    return null;
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
    .filter((slice) => {
      console.log(getPercentageOf(slice, total));
      return getPercentageOf(slice, total) > 0;
    })
    .map((slice, index) => {
      return (
        <g className={`inst-pie-slice-${index}`} key={`${index.toString()}`}>
          <path key={`${slice.data.label}value`} d={arc(slice)} />
          <text
            key={`${slice.data.label}label`}
            transform={`translate(${arc.centroid(slice)})`}
          >
            <tspan>{slice.data.label}</tspan>
            <tspan dx="2" className="inst-pie-percent">{`${getPercentageOf(slice, total)}%`}</tspan>
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