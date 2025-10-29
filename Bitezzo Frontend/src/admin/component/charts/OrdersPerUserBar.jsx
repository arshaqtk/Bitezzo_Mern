import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function OrdersPerUserBar({ data }) {
  console.log("OrdersPerUserBar data:", data);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <p className="text-lg font-semibold">No data available</p>
        <p className="text-sm text-gray-400 mt-1">
          There are no orders to display right now.
        </p>
      </div>
    );
  }


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-0 rounded-xl shadow-xl p-4 backdrop-blur-sm">
          <p className="text-gray-800 font-semibold text-sm mb-1">{label}</p>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <span className="text-gray-600 text-sm">Orders:</span>
            <span className="font-bold text-blue-600">{payload[0].value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
          barCategoryGap="25%"
        >
        
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>

        
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E2E8F0"
            strokeOpacity={0.7}
            vertical={false}
          />

        
          <XAxis
            dataKey="name"
            interval={0}
            angle={-45}
            textAnchor="end"
            height={90}
            stroke="#64748B"
            fontSize={12}
            fontWeight={500}
            tickMargin={8}
          />

          
          <YAxis
            allowDecimals={false}
            stroke="#64748B"
            fontSize={12}
            fontWeight={500}
            axisLine={false}
            tickLine={false}
          />

          
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              color: "#475569",
              fontWeight: "500",
            }}
          />

        
          <Bar
            dataKey="orders" 
            name="Orders per User"
            fill="url(#barGradient)"
            radius={[6, 6, 0, 0]}
            stroke="#FFFFFF"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
