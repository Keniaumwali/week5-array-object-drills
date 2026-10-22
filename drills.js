
import { orders } from "./data.js";

const ORIGINAL = JSON.stringify(orders);

// Question 1: Array of all order IDs
const orderIds = orders.map(({ id }) => id);
console.log("1. Order IDs:", orderIds);

// Question 2: Customer names (duplicates allowed)
const customerNames = orders.map(({ customer }) => customer.name);
console.log("2. Customer names:", customerNames);

// Question 3: All delivered orders
const deliveredOrders = orders.filter(
  ({ status }) => status === "delivered"
);
console.log("3. Delivered orders:", deliveredOrders.length);

// Question 4: All orders from Gasabo
const gasaboOrders = orders.filter(
  ({ customer }) => customer.district === "Gasabo"
);
console.log("4. Gasabo orders:", gasaboOrders.length);

// Question 5: Find the order with ID 106
const order106 = orders.find(({ id }) => id === 106);
console.log("5. Order 106:", order106);

// Question 6: Does any order have a rating of 3 or lower?
const hasLowRating = orders.some(
  ({ rating }) => rating !== null && rating <= 3
);
console.log("6. Has rating <= 3:", hasLowRating);

// Question 7: Are all pending orders unrated?
const pendingOrders = orders.filter(
  ({ status }) => status === "pending"
);
const allPendingUnrated = pendingOrders.every(
  ({ rating }) => rating === null
);
console.log("7. All pending orders unrated:", allPendingUnrated);

// Question 8: Unique customer names
const uniqueCustomerNames = [
  ...new Set(customerNames)
];
console.log("8. Unique customer names:", uniqueCustomerNames);

// Check that the original data was not changed
console.log(
  "ORIGINAL DATA UNCHANGED:",
  JSON.stringify(orders) === ORIGINAL
);


 // Station 2 — Calculations with reduce

// Helper: calculate the total price of one order
const orderTotal = ({ items }) =>
  items.reduce((sum, { price, qty }) => sum + price * qty, 0);

// Question 9: Add a total to every order without changing originals
const ordersWithTotals = orders.map((order) => ({
  ...order,
  total: orderTotal(order)
}));

console.log(
  "9. Orders with totals:",
  ordersWithTotals.map(({ id, total }) => ({ id, total }))
);

// Question 10: Total revenue from delivered orders
const deliveredRevenue = orders
  .filter(({ status }) => status === "delivered")
  .reduce((sum, order) => sum + orderTotal(order), 0);

console.log("10. Delivered revenue:", deliveredRevenue);

// Question 11: Average rating, ignoring null ratings
const ratedOrders = orders.filter(({ rating }) => rating !== null);

const averageRating = Number(
  (
    ratedOrders.reduce((sum, { rating }) => sum + rating, 0) /
    ratedOrders.length
  ).toFixed(1)
);

console.log("11. Average rating:", averageRating);

// Question 12: Total quantity of Brochettes sold
const brochetteQuantity = orders
  .flatMap(({ items }) => items)
  .filter(({ name }) => name === "Brochette")
  .reduce((sum, { qty }) => sum + qty, 0);

console.log("12. Brochettes sold:", brochetteQuantity);

// Question 13: The single most expensive order
const mostExpensiveOrder = ordersWithTotals.reduce(
  (highest, order) =>
    order.total > highest.total ? order : highest
);

console.log("13. Most expensive order:", mostExpensiveOrder);

// Question 14: Number of orders per status
const ordersByStatus = orders.reduce(
  (counts, { status }) => ({
    ...counts,
    [status]: (counts[status] || 0) + 1
  }),
  {}
);

console.log("14. Orders by status:", ordersByStatus);

// Check original data again
console.log(
  "ORIGINAL DATA UNCHANGED:",
  JSON.stringify(orders) === ORIGINAL
);


 // Station 3 — Grouping & ranking

// Question 15: Revenue per district from delivered orders
const revenueByDistrict = orders
  .filter(({ status }) => status === "delivered")
  .reduce((revenue, order) => {
    const { district } = order.customer;

    return {
      ...revenue,
      [district]: (revenue[district] || 0) + orderTotal(order)
    };
  }, {});

console.log("15. Revenue by district:", revenueByDistrict);

// Question 16: Group orders by date
const ordersByDate = Object.groupBy(
  orders,
  ({ date }) => date
);

const dailySummary = Object.entries(ordersByDate).map(
  ([date, dateOrders]) => ({
    date,
    count: dateOrders.length,
    revenue: dateOrders.reduce(
      (sum, order) => sum + orderTotal(order),
      0
    )
  })
);

console.log("16. Daily summary:", dailySummary);

// Question 17: Top 3 best-selling items by quantity
const itemQuantities = orders
  .flatMap(({ items }) => items)
  .reduce((totals, { name, qty }) => ({
    ...totals,
    [name]: (totals[name] || 0) + qty
  }), {});

const topThreeItems = Object.entries(itemQuantities)
  .map(([name, qty]) => ({ name, qty }))
  .toSorted((a, b) => b.qty - a.qty)
  .slice(0, 3);

console.log("17. Top 3 items:", topThreeItems);

// Question 18: Each customer's number of orders and total spent
const customerSummary = orders.reduce((summary, order) => {
  const { name } = order.customer;
  const previous = summary[name] || { name, orders: 0, spent: 0 };

  return {
    ...summary,
    [name]: {
      name,
      orders: previous.orders + 1,
      spent: previous.spent + orderTotal(order)
    }
  };
}, {});

const customerRanking = Object.values(customerSummary)
  .toSorted((a, b) => b.spent - a.spent);

console.log("18. Customer ranking:", customerRanking);

// Question 19: Menu price list
const menuPrices = Object.fromEntries(
  orders
    .flatMap(({ items }) => items)
    .map(({ name, price }) => [name, price])
);

console.log("19. Menu prices:", menuPrices);

// Verify that the original dataset remains unchanged
console.log(
  "ORIGINAL DATA UNCHANGED:",
  JSON.stringify(orders) === ORIGINAL
);


 // Station 4 — Immutable updates

// Question 20: Mark a pending order as delivered
const markDelivered = (orders, id) =>
  orders.map((order) =>
    order.id === id && order.status === "pending"
      ? { ...order, status: "delivered" }
      : order
  );

console.log(
  "20. Mark delivered:",
  markDelivered(orders, 105).find(({ id }) => id === 105)
);

// Question 21: Rate only delivered orders
const rateOrder = (orders, id, rating) =>
  orders.map((order) =>
    order.id === id && order.status === "delivered"
      ? { ...order, rating }
      : order
  );

console.log(
  "21. Rate delivered order:",
  rateOrder(orders, 101, 4).find(({ id }) => id === 101)
);

// Question 22: Change a customer's district
const changeDistrict = (orders, id, district) =>
  orders.map((order) =>
    order.id === id
      ? {
          ...order,
          customer: { ...order.customer, district }
        }
      : order
  );

console.log(
  "22. Change district:",
  changeDistrict(orders, 101, "Kicukiro").find(({ id }) => id === 101)
);

// Question 23: Add an item to an order
const addItem = (orders, id, item) =>
  orders.map((order) =>
    order.id === id
      ? { ...order, items: [...order.items, item] }
      : order
  );

console.log(
  "23. Add item:",
  addItem(orders, 101, { name: "Water", price: 500, qty: 1 })
    .find(({ id }) => id === 101)
);

// Question 24: Remove cancelled orders
const removeCancelled = (orders) =>
  orders.filter(({ status }) => status !== "cancelled");

console.log("24. Orders without cancelled:", removeCancelled(orders).length);

// Question 25: Apply a discount to every item's price
const applyDiscount = (orders, percent) =>
  orders.map((order) => ({
    ...order,
    items: order.items.map((item) => ({
      ...item,
      price: Math.round(item.price * (1 - percent / 100))
    }))
  }));

console.log(
  "25. Apply 10% discount:",
  applyDiscount(orders, 10)[0].items
);

// Final immutability check
console.log(
  "FINAL ORIGINAL DATA UNCHANGED:",
  JSON.stringify(orders) === ORIGINAL
);
