export default function StatsCards({ stats }) {
  // stats = { totalUsers, totalOrders, totalRevenue, totalProducts }
  const fmtCurrency = (n) =>
    typeof n === "number" ? n.toLocaleString("en-IN", { style: "currency", currency: "INR" }) : n;
console.log(stats)
  const items = [
    { 
      label: "Total Users", 
      value: stats.userCount,
      icon: "👥",
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
      bgLight: "from-blue-50 to-blue-100"
    },
    { 
      label: "Total Products", 
      value: stats.productCount,
      icon: "📦",
      color: "green",
      bgGradient: "from-green-500 to-green-600",
      bgLight: "from-green-50 to-green-100"
    },
    { 
      label: "Total Orders", 
      value: stats.orderCount,
      icon: "🛒",
      color: "purple",
      bgGradient: "from-purple-500 to-purple-600",
      bgLight: "from-purple-50 to-purple-100"
    },
    { 
      label: "Total Revenue", 
      value: fmtCurrency(stats.totalRevenue),
      icon: "💰",
      color: "orange",
      bgGradient: "from-orange-500 to-orange-600",
      bgLight: "from-orange-50 to-orange-100"
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        text: "text-blue-600",
        border: "border-blue-200",
        iconBg: "bg-blue-100",
        iconText: "text-blue-600"
      },
      green: {
        text: "text-green-600", 
        border: "border-green-200",
        iconBg: "bg-green-100",
        iconText: "text-green-600"
      },
      purple: {
        text: "text-purple-600",
        border: "border-purple-200", 
        iconBg: "bg-purple-100",
        iconText: "text-purple-600"
      },
      orange: {
        text: "text-orange-600",
        border: "border-orange-200",
        iconBg: "bg-orange-100", 
        iconText: "text-orange-600"
      }
    };
    return colorMap[color];
  };

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => {
        const colors = getColorClasses(item.color);
        return (
          <div
            key={item.label}
            className={`
              relative overflow-hidden rounded-2xl border ${colors.border} bg-white 
              shadow-sm hover:shadow-lg transform hover:-translate-y-1 
              transition-all duration-300 ease-in-out group cursor-pointer
            `}
          >
            {/* Gradient background overlay on hover */}
            <div className={`
              absolute inset-0 bg-gradient-to-r ${item.bgLight} 
              opacity-0 group-hover:opacity-50 transition-opacity duration-300
            `}></div>
            
            {/* Content */}
            <div className="relative p-6">
              {/* Header with icon and label */}
              <div className="flex items-center justify-between mb-4">
                <div className={`
                  w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className={`
                  w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')} 
                  animate-pulse opacity-75
                `}></div>
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
                {item.label}
              </div>

              {/* Value */}
              <div className={`
                text-3xl font-bold ${colors.text} 
                group-hover:scale-105 transition-transform duration-300
                ${item.label === 'Total Revenue' ? 'text-2xl sm:text-3xl' : ''}
              `}>
                {typeof item.value === 'number' ? item.value.toLocaleString('en-IN') : item.value}
              </div>

              {/* Trend indicator (placeholder for future enhancement) */}
              <div className="flex items-center mt-3 text-xs text-gray-500">
                <span className="mr-1">📈</span>
                <span>vs last period</span>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className={`
              absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.bgGradient}
              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
            `}></div>
          </div>
        );
      })}
    </div>
  );
}