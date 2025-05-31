'use client'
import styles from './chart.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Sun',
    joinings: 12,
    cancellations: 2,
  },
  {
    name: 'Mon',
    joinings: 15,
    cancellations: 4,
  },
  {
    name: 'Tue',
    joinings: 9,
    cancellations: 1,
  },
  {
    name: 'Wed',
    joinings: 20,
    cancellations: 3,
  },
  {
    name: 'Thu',
    joinings: 17,
    cancellations: 2,
  },
  {
    name: 'Fri',
    joinings: 10,
    cancellations: 5,
  },
  {
    name: 'Sat',
    joinings: 13,
    cancellations: 0,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Member Joinings</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line type="monotone" dataKey="joinings" stroke="#4caf50" strokeDasharray="5 5" name="Joinings" />
          <Line type="monotone" dataKey="cancellations" stroke="#f44336" strokeDasharray="3 4 5 2" name="Cancellations" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
