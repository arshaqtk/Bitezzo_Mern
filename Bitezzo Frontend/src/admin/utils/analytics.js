// Helpers to transform your JSON Server data (users with nested orders)

export function flattenOrders(users = []) {
  return users.flatMap(u =>
    (u.orders || []).map(o => ({
      ...o,
      username: u.username,
      userId: u.id
    }))
  );
}

export function sumRevenue(orders = []) {
  return orders.reduce((acc, o) => acc + (Number(o.subTotal) || 0), 0);
}

export function countByStatus(orders = []) {
  const map = {};
  for (const o of orders) {
    const k = o.status || "Unknown";
    map[k] = (map[k] || 0) + 1;
  }
  // -> [{status, count}]
  return Object.entries(map).map(([status, count]) => ({ status, count }));
}

export function countOrdersPerUser(orders = []) {
  const map = {};
  for (const o of orders) {
    const k = o.username || o.userId || "Unknown";
    map[k] = (map[k] || 0) + 1;
  }
  // -> [{name, orders}]
  return Object.entries(map).map(([name, orders]) => ({ name, orders }));
}

export function revenueByDate(orders = []) {
  const map = {};
  for (const o of orders) {
    const d = o.Date || o.date; // support both "Date" and "date"
    if (!d) continue;
    map[d] = (map[d] || 0) + (Number(o.subTotal) || 0);
  }
  // sort by real date ascending
  return Object.entries(map)
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function topProductsByCount(orders = [], limit = 10) {
  const map = {};
  for (const o of orders) {
    for (const p of o.products || []) {
      const key = p.productName || p.productId;
      map[key] = (map[key] || 0) + (Number(p.productQuantity) || 1);
    }
  }
  const arr = Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
  return arr.slice(0, limit);
}
