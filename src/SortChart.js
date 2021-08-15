import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';

const generateData = (array) => {
  console.log(array)
  let data = array.map(x => {
    return {value:x}
  })
  return data
}

const colors = ["#84d88a", "#8884d8", "#d88487", "#525452", "#b9bdb9"]

export default class SortChart extends React.Component {
  render() {
    const data = generateData(this.props.array)
    return (
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 40,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <Bar dataKey="value" fill={"#8884d8"}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={this.props.pivotBefore === index ? colors[4] : this.props.pivotAfter === index ? colors[3] : this.props.sorted.has(index) ? colors[0] : index === this.props.scanElement ? colors[2] : colors[1]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}