import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PALETTE = [
  "#6366F1", // Indigo
  "#22C55E", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#06B6D4", // Cyan
  "#8B5CF6", // Violet
  "#F97316", // Orange
  "#84CC16", // Lime
  "#E11D48"  // Rose
];

export default function OrdersStatusPie({ data }) {
  // data: [{ status, count }]
  console.log(data)
  
  const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0];
    const total = data.reduce((sum, item) => sum + item.count, 0);
    const percentage = ((dataPoint.value / total) * 100).toFixed(1);

    return (
      <div className="bg-white border-0 rounded-xl shadow-xl p-4 backdrop-blur-sm min-w-[140px]">
        <div className="flex items-center mb-2">
          <div
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: dataPoint.payload.fill }}
          />
          <span className="font-semibold text-gray-800 capitalize text-sm">
            {dataPoint.name}
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Count:</span>
            <span className="font-bold text-gray-800">{dataPoint.value}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Share:</span>
            <span className="font-semibold" style={{ color: dataPoint.payload.fill }}>
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

  const CustomLegend = ({ payload }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {payload.map((entry, index) => {
          const percentage = ((entry.payload.count / total) * 100).toFixed(0);
          
          return (
            <div key={index} className="flex items-center space-x-2 text-sm bg-gray-50 px-3 py-1 rounded-full">
              <div 
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700 capitalize font-medium">
                {entry.value}
              </span>
              <span className="text-gray-500 text-xs">({percentage}%)</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {PALETTE.map((color, index) => (
              <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1}/>
                <stop offset="100%" stopColor={color} stopOpacity={0.8}/>
              </linearGradient>
            ))}
          </defs>
          
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={110}
            paddingAngle={3}
            stroke="#FFFFFF"
            strokeWidth={2}
          >
            {data.map((_, i) => (
              <Cell 
                key={i} 
                fill={`url(#gradient${i % PALETTE.length})`}
                className="hover:opacity-90 transition-opacity duration-200 cursor-pointer drop-shadow-sm"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}