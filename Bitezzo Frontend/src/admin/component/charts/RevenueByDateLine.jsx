import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function RevenueByDateLine({ data }) {
  // data: [{ date: "2025-08-24", revenue: 620 }]
  const fmtINR = (v) =>
    typeof v === "number" ? v.toLocaleString("en-IN", { style: "currency", currency: "INR" }) : v;

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#374151" />
          <YAxis tickFormatter={fmtINR} stroke="#374151" />
          <Tooltip
            formatter={(v) => fmtINR(v)}
            contentStyle={{
              backgroundColor: "#F9FAFB",
              border: "1px solid #D1D5DB",
              color: "#111827",
            }}
          />
          <Legend wrapperStyle={{ color: "#374151" }} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ fill: "#10B981", r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

  );
}