(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:101,customer:{name:`Aline`,district:`Gasabo`},items:[{name:`Brochette`,price:2500,qty:4},{name:`Fanta`,price:700,qty:2}],status:`delivered`,rating:5,date:`2026-10-01`},{id:102,customer:{name:`Eric`,district:`Kicukiro`},items:[{name:`Isombe`,price:3e3,qty:1}],status:`delivered`,rating:4,date:`2026-10-01`},{id:103,customer:{name:`Grace`,district:`Nyarugenge`},items:[{name:`Pizza`,price:9e3,qty:2},{name:`Juice`,price:1500,qty:2}],status:`cancelled`,rating:null,date:`2026-10-02`},{id:104,customer:{name:`Aline`,district:`Gasabo`},items:[{name:`Chapati`,price:500,qty:6},{name:`Tea`,price:800,qty:2}],status:`delivered`,rating:3,date:`2026-10-02`},{id:105,customer:{name:`Jean`,district:`Gasabo`},items:[{name:`Burger`,price:6e3,qty:1}],status:`pending`,rating:null,date:`2026-10-03`},{id:106,customer:{name:`Eric`,district:`Kicukiro`},items:[{name:`Brochette`,price:2500,qty:2},{name:`Chips`,price:1500,qty:2}],status:`delivered`,rating:5,date:`2026-10-03`},{id:107,customer:{name:`Diane`,district:`Nyarugenge`},items:[{name:`Isombe`,price:3e3,qty:2},{name:`Juice`,price:1500,qty:1}],status:`delivered`,rating:4,date:`2026-10-04`},{id:108,customer:{name:`Grace`,district:`Nyarugenge`},items:[{name:`Pizza`,price:9e3,qty:1}],status:`pending`,rating:null,date:`2026-10-04`}],t=document.querySelector(`#app`);function n(e){return e.items.reduce((e,t)=>e+t.price*t.qty,0)}var r=e.filter(e=>e.status===`delivered`),i=r.reduce((e,t)=>e+n(t),0),a=e.map(e=>e.rating).filter(e=>typeof e==`number`),o=a.length?(a.reduce((e,t)=>e+t,0)/a.length).toFixed(1):`N/A`,s={};e.forEach(e=>{e.items.forEach(e=>{s[e.name]=(s[e.name]||0)+e.qty})});var c=Object.entries(s).sort((e,t)=>t[1]-e[1])[0],l={};r.forEach(e=>{let t=e.customer.district;l[t]=(l[t]||0)+n(e)}),t.innerHTML=`
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
`,document.querySelector(`#stats`).innerHTML=[[`Delivered Revenue`,`${i.toLocaleString()} RWF`],[`Delivered Orders`,r.length],[`Average Rating`,`⭐ ${o}`],[`Best-selling Item`,c?`${c[0]} (${c[1]} sold)`:`N/A`]].map(([e,t])=>`
  <article class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
    <p class="text-sm text-slate-500">${e}</p>
    <p class="mt-3 text-2xl font-bold text-emerald-800">${t}</p>
  </article>
`).join(``);var u=Math.max(...Object.values(l),1);document.querySelector(`#district-chart`).innerHTML=Object.entries(l).map(([e,t])=>`
      <div>
        <div class="mb-2 flex justify-between gap-4 text-sm">
          <span class="font-medium">${e}</span>
          <span class="font-semibold">${t.toLocaleString()} RWF</span>
        </div>

        <div class="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            class="h-3 rounded-full bg-emerald-600"
            style="width: ${t/u*100}%"
          ></div>
        </div>
      </div>
    `).join(``);var d={delivered:`bg-emerald-100 text-emerald-800`,pending:`bg-amber-100 text-amber-800`,cancelled:`bg-red-100 text-red-800`};function f(t=`All`){let r=t===`All`?e:e.filter(e=>e.status.toLowerCase()===t.toLowerCase());document.querySelector(`#orders-table`).innerHTML=r.map(e=>{let t=d[e.status.toLowerCase()]||`bg-slate-100 text-slate-700`;return`
        <tr class="border-b border-slate-100 hover:bg-stone-50">
          <td class="p-3 font-medium">#${e.id}</td>
          <td class="p-3">${e.customer.name}</td>
          <td class="p-3">${e.customer.district}</td>
          <td class="p-3">${n(e).toLocaleString()} RWF</td>
          <td class="p-3">
            <span class="rounded-full px-3 py-1 text-xs font-semibold ${t}">
              ${e.status}
            </span>
          </td>
        </tr>
      `}).join(``),r.length===0&&(document.querySelector(`#orders-table`).innerHTML=`
      <tr>
        <td colspan="5" class="p-6 text-center text-slate-500">
          No orders found.
        </td>
      </tr>
    `),document.querySelector(`#order-count`).textContent=`Showing ${r.length} of ${e.length} orders`}document.querySelectorAll(`.filter-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.filter-btn`).forEach(e=>{e.className=`filter-btn rounded-lg bg-slate-100 px-4 py-2`}),e.className=`filter-btn rounded-lg bg-emerald-700 px-4 py-2 text-white`,f(e.dataset.filter)})}),f();