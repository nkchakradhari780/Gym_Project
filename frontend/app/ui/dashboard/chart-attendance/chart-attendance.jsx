'use client';
import styles from '@/app/ui/dashboard/chart-attendance/chart-attendance.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for weekly joinings and cancellations
const data = [
  { name: 'Week 1', joinings: 50, cancellations: 5 },
  { name: 'Week 2', joinings: 40, cancellations: 10 },
  { name: 'Week 3', joinings: 60, cancellations: 3 },
  { name: 'Week 4', joinings: 30, cancellations: 8 },
  { name: 'Month Total', joinings: 220, cancellations: 26 }, // Total for the month
];

const ChartAtt = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Member Joinings Under You </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
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

export default ChartAtt;
