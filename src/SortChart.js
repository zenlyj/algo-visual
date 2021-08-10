import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';

const randInt = (low, high) => {
  const min = Math.ceil(low)
  const max = Math.floor(high)
  return Math.floor(Math.random() * (max-min+1)+min)
}

const generateData = () => {
  let data = []
  for (let i = 0; i < 40; i++) {
    data.push(randInt(3, 40))
  }
  data = data.map(x => {
    return {value:x}
  })
  return data
}

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default class SortChart extends React.Component {
  constructor() {
    super()
    this.state = {data:generateData()}
  }
  
  render() {
    return (
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={500}
          height={300}
          data={this.state.data}
          margin={{
            top: 40,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <Bar dataKey="value" fill="#8884d8" shape={<TriangleBar />} label={{position:'insideBottom'}}>
            {this.state.data.map((entry, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}