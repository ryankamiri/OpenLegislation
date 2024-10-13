import { PieChart, Pie, Cell } from "recharts";
import { useState, useEffect } from "react";

const PieChartComponent = (bill) => {
  const [tally, setTally] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const counter = () => {
      let count = 0;
      if (bill.bill.sponsor.party === "R") {
        count++;
      }
      for (let i = 0; i < bill.bill.cosponsors.length; i++) {
        if (bill.bill.cosponsors[i].party === "R") {
          count++;
        }
      }
      return count;
    };

    const partyPercentage = (totalCount) => {
      return (totalCount / (bill.bill.cosponsors.length + 1)) * 100;
    };

    const totalCount = counter();
    setTotal(partyPercentage(totalCount));
    setTally(totalCount);

    console.log("total republican cosponsors", totalCount);
    console.log("total cosponsors", bill.bill.cosponsors.length + 1);
  }, [bill]);

  const data = [
    { name: "R", value: total },
    { name: "D", value: 100 - total },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
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
};

export default PieChartComponent;
