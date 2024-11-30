import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './admin_home.css';
import Recent from './Recent/myTable';
const data = [
  {day: '14/11', quantity: 73},
  {day: '15/11', quantity: 46},
  {day: '16/11', quantity: 91},
  {day: '17/11', quantity: 0},
  {day: '18/11', quantity: 53},
  {day: '19/11', quantity: 32},
  {day: '20/11', quantity: 85},
  {day: '21/11', quantity: 72}
];

const AdminHome = () => {
  return (
    <div className="admin_home_container">
      <div className="admin_home_chart">
      <h1 className='text-primary p-4 m-2'>Lượt truy cập</h1>
        <LineChart width={600} height={455} data={data} margin={{ top: 30, right: 0, bottom: 0, left: 0 }}>
          <Line type="monotone" dataKey="quantity" stroke="green" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dy={10} dataKey="day" />
          <YAxis dx={-10}/>
          <Tooltip />
        </LineChart>
      </div>

      <div className="admin_home_recent">
        <Recent />
      </div>
    </div>
  );
};
export default AdminHome;