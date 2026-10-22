
import './style.css'
import { orders } from '../../data.js'

const app = document.querySelector('#app')

// Calculate the total price of one order.
function orderTotal(order) {
  return order.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )
}

// Only delivered orders count toward delivered revenue.
const deliveredOrders = orders.filter(
  order => order.status === 'delivered'
)

const totalRevenue = deliveredOrders.reduce(
  (sum, order) => sum + orderTotal(order),
  0
)

// Calculate the average of ratings that are actual numbers.
const ratings = orders
  .map(order => order.rating)
  .filter(rating => typeof rating === 'number')

const averageRating = ratings.length
  ? (
      ratings.reduce((sum, rating) => sum + rating, 0) /
      ratings.length
    ).toFixed(1)
  : 'N/A'

// Count items sold. The data uses qty, not quantity.
const itemSales = {}

orders.forEach(order => {
  order.items.forEach(item => {
    itemSales[item.name] =
      (itemSales[item.name] || 0) + item.qty
  })
})

const bestSellingItem = Object.entries(itemSales)
  .sort((a, b) => b[1] - a[1])[0]

// Calculate delivered revenue for each district.
const districtRevenue = {}

deliveredOrders.forEach(order => {
  const district = order.customer.district

  districtRevenue[district] =
    (districtRevenue[district] || 0) + orderTotal(order)
})

// Build the dashboard layout.
app.innerHTML = `
  <main class="min-h-screen bg-stone-50 p-6 text-slate-800 md:p-10">
    <header class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-widest text-emerald-700">
        Kigali Eats
      </p>
      <h1 class="mt-2 text-3xl font-bold">Orders Dashboard</h1>
      <p class="mt-2 text-slate-500">
        Restaurant sales and order performance at a glance.
      </p>
    </header>

    <section
      id="stats"
      class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    ></section>

    <section class="mb-8 rounded-2xl bg-white p-6 shadow-sm">
      <div class="mb-5">
        <h2 class="text-xl font-bold">Revenue by District</h2>
        <p class="mt-1 text-sm text-slate-500">
          Revenue from delivered orders only
        </p>
      </div>
      <div id="district-chart" class="space-y-5"></div>
    </section>

    <section class="rounded-2xl bg-white p-6 shadow-sm">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold">Orders</h2>
          <p class="mt-1 text-sm text-slate-500">
            Browse and filter restaurant orders
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button class="filter-btn rounded-lg bg-emerald-700 px-4 py-2 text-white" data-filter="All">All</button>
          <button class="filter-btn rounded-lg bg-slate-100 px-4 py-2" data-filter="Delivered">Delivered</button>
          <button class="filter-btn rounded-lg bg-slate-100 px-4 py-2" data-filter="Pending">Pending</button>
          <button class="filter-btn rounded-lg bg-slate-100 px-4 py-2" data-filter="Cancelled">Cancelled</button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-slate-200 text-slate-500">
            <tr>
              <th class="p-3">Order ID</th>
              <th class="p-3">Customer</th>
              <th class="p-3">District</th>
              <th class="p-3">Total (RWF)</th>
              <th class="p-3">Status</th>
            </tr>
          </thead>
          <tbody id="orders-table"></tbody>
        </table>
      </div>

      <p id="order-count" class="mt-4 text-sm text-slate-500"></p>
    </section>

    <footer class="mt-8 text-center text-sm text-slate-500">
      Kigali Eats Dashboard · Sample order data · 2026
    </footer>
  </main>
`

// Render the statistic cards.
document.querySelector('#stats').innerHTML = [
  ['Delivered Revenue', `${totalRevenue.toLocaleString()} RWF`],
  ['Delivered Orders', deliveredOrders.length],
  ['Average Rating', `⭐ ${averageRating}`],
  [
    'Best-selling Item',
    bestSellingItem
      ? `${bestSellingItem[0]} (${bestSellingItem[1]} sold)`
      : 'N/A'
  ]
].map(([label, value]) => `
  <article class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
    <p class="text-sm text-slate-500">${label}</p>
    <p class="mt-3 text-2xl font-bold text-emerald-800">${value}</p>
  </article>
`).join('')

// Render the district revenue bars.
const maxRevenue = Math.max(
  ...Object.values(districtRevenue),
  1
)

document.querySelector('#district-chart').innerHTML =
  Object.entries(districtRevenue)
    .map(([district, revenue]) => `
      <div>
        <div class="mb-2 flex justify-between gap-4 text-sm">
          <span class="font-medium">${district}</span>
          <span class="font-semibold">${revenue.toLocaleString()} RWF</span>
        </div>

        <div class="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            class="h-3 rounded-full bg-emerald-600"
            style="width: ${(revenue / maxRevenue) * 100}%"
          ></div>
        </div>
      </div>
    `)
    .join('')

// Full Tailwind class names keep status colors working.
const statusStyles = {
  delivered: 'bg-emerald-100 text-emerald-800',
  pending: 'bg-amber-100 text-amber-800',
  cancelled: 'bg-red-100 text-red-800'
}

// Render the table based on the selected filter.
function renderOrders(filter = 'All') {
  const filteredOrders = filter === 'All'
    ? orders
    : orders.filter(
        order => order.status.toLowerCase() === filter.toLowerCase()
      )

  // Safe for this locally supplied sample dataset.
  document.querySelector('#orders-table').innerHTML =
    filteredOrders.map(order => {
      const status = order.status.toLowerCase()
      const badgeStyle =
        statusStyles[status] || 'bg-slate-100 text-slate-700'

      return `
        <tr class="border-b border-slate-100 hover:bg-stone-50">
          <td class="p-3 font-medium">#${order.id}</td>
          <td class="p-3">${order.customer.name}</td>
          <td class="p-3">${order.customer.district}</td>
          <td class="p-3">${orderTotal(order).toLocaleString()} RWF</td>
          <td class="p-3">
            <span class="rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle}">
              ${order.status}
            </span>
          </td>
        </tr>
      `
    }).join('')

  if (filteredOrders.length === 0) {
    document.querySelector('#orders-table').innerHTML = `
      <tr>
        <td colspan="5" class="p-6 text-center text-slate-500">
          No orders found.
        </td>
      </tr>
    `
  }

  document.querySelector('#order-count').textContent =
    `Showing ${filteredOrders.length} of ${orders.length} orders`
}

// Connect the filter buttons.
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.className =
        'filter-btn rounded-lg bg-slate-100 px-4 py-2'
    })

    button.className =
      'filter-btn rounded-lg bg-emerald-700 px-4 py-2 text-white'

    renderOrders(button.dataset.filter)
  })
})

// Show all orders when the dashboard first loads.
renderOrders()
