import { PieChart, Pie, Cell } from 'recharts';


const PieChartComponent = (percent) => {
    const data = [
        { name: 'R', value: percent.percentage },
        { name: 'D', value: 100 - percent.percentage }
    ]

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <PieChart width={250} height={250}>
          <Pie
            data={data}
            label={renderCustomizedLabel}
            labelLine={false}
            fill="#8884d8"
            dataKey="value"
          >
              <Cell key={`cell-0`} fill={"#FF0000"} />
              <Cell key={`cell-1`} fill={"#0000FF"} />
          </Pie>
        </PieChart>
    );
}

export default PieChartComponent;