import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

// Dynamic color palette for different bars
const COLOR_PALETTE = [
  "#10B981", // Emerald
  "#F59E0B", // Amber  
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#84CC16", // Lime
  "#E11D48", // Rose
  "#6366F1", // Indigo
  "#14B8A6", // Teal
];

export default function TopProductsBar({ data }) {
  // data: [{ name, count }]
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const rank = data.findIndex(item => item.name === label) + 1;
      const totalProducts = data.reduce((sum, item) => sum + item.count, 0);
      const percentage = ((payload[0].value / totalProducts) * 100).toFixed(1);
      
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[160px]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700 text-sm">#{rank} Product</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
              Top {Math.ceil((rank / data.length) * 100)}%
            </span>
          </div>
          <p className="font-semibold text-gray-800 mb-1 truncate" title={label}>
            {label}
          </p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-semibold" style={{ color: payload[0].color }}>
                {payload[0].value} sold
              </span>
            </p>
            <p className="text-xs text-gray-500">{percentage}% of top products volume</p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate statistics
  const totalQuantity = data.reduce((sum, item) => sum + item.count, 0);
  const averageQuantity = data.length > 0 ? (totalQuantity / data.length).toFixed(1) : 0;
  const topProduct = data[0]; // Assuming data is sorted
  const maxCount = Math.max(...data.map(item => item.count));

  return (
    <div className="h-full flex flex-col">
      {/* Chart Container */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            barCategoryGap="15%"
          >
            {/* Enhanced Grid */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#E5E7EB" 
              strokeOpacity={0.6}
              vertical={false}
            />
            
            {/* X-Axis with better styling */}
            <XAxis 
              dataKey="name" 
              interval={0} 
              angle={-45} 
              textAnchor="end" 
              height={90} 
              stroke="#6B7280"
              fontSize={11}
              fontWeight={500}
              tickMargin={10}
            />
            
            {/* Y-Axis with better styling */}
            <YAxis 
              allowDecimals={false} 
              stroke="#6B7280"
              fontSize={12}
              fontWeight={500}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />
            
            {/* Custom Tooltip */}
            <Tooltip content={<CustomTooltip />} />
            
            {/* Legend */}
            <Legend 
              wrapperStyle={{ 
                color: "#374151",
                fontSize: "14px",
                fontWeight: "500"
              }} 
            />
            
            {/* Enhanced Bar with different colors for each bar */}
            <Bar 
              dataKey="count" 
              name="Quantity Sold"
              radius={[8, 8, 0, 0]}
              stroke="#fff"
              strokeWidth={1}
              cursor="pointer"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLOR_PALETTE[index % COLOR_PALETTE.length]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Statistics Summary */}
      {data.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-800">{totalQuantity}</div>
              <div className="text-gray-500 text-xs">Total Sold</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">{averageQuantity}</div>
              <div className="text-gray-500 text-xs">Average</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-green-600">{maxCount}</div>
              <div className="text-gray-500 text-xs">Best Seller</div>
            </div>
            <div className="text-center">
              <div 
                className="font-semibold truncate"
                style={{ color: COLOR_PALETTE[0] }}
                title={topProduct?.name}
              >
                {topProduct?.name?.length > 10 ? 
                  topProduct.name.substring(0, 10) + '...' : 
                  topProduct?.name || 'N/A'
                }
              </div>
              <div className="text-gray-500 text-xs">Top Product</div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Indicator */}
      {data.length > 0 && (
        <div className="mt-3 flex justify-center">
          <div className="flex space-x-1">
            {data.slice(0, 5).map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: COLOR_PALETTE[index % COLOR_PALETTE.length],
                  opacity: 0.7 
                }}
              />
            ))}
            {data.length > 5 && (
              <div className="text-xs text-gray-500 ml-2">
                +{data.length - 5} more
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {data.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">📦</div>
            <div className="font-medium">No product sales data</div>
            <div className="text-sm">Top selling products will appear here</div>
          </div>
        </div>
      )}
    </div>
  );
}