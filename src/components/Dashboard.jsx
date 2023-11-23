import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [chartData, setChartData] = useState([
    { page: 'Page 1', visits: 200 },
    { page: 'Page 2', visits: 350 },
    { page: 'Page 3', visits: 500 },
    { page: 'Page 4', visits: 150 },
    { page: 'Page 5', visits: 400 },
  ]);

  useEffect(() => {
    // Your code for chart initialization and updates goes here
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-2 gap-8">
        {chartData.map((dataPoint) => (
          <div key={dataPoint.page} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">{dataPoint.page}</h2>
            <div className="chart">
              <div
                className="bar"
                style={{ height: `${(dataPoint.visits / 600) * 100}%` }}
              ></div>
            </div>
            <div className="bar-value text-center mt-2">{dataPoint.visits} visits</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
