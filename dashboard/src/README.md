# Week 5: Array & Object Manipulation Drills

## Project Overview

This project explores modern JavaScript array and object manipulation using a sample restaurant order dataset for **Kigali Eats**.

It includes JavaScript practice exercises and an interactive dashboard built with Vite and Tailwind CSS v4.

## Features

- Analyze restaurant orders using JavaScript array methods.
- Calculate order totals and delivered revenue.
- Summarize sales by district.
- Display total delivered revenue, delivered orders, average rating, and best-selling item.
- Visualize revenue by district using horizontal bars.
- Filter orders by All, Delivered, Pending, and Cancelled.
- Display customer names, districts, order totals, and colored status badges.
- Practice immutable updates using `map()`, `filter()`, and the spread operator.

## Technologies Used

- JavaScript (ES modules)
- Vite
- Tailwind CSS v4
- HTML and CSS

## Project Structure

```text
week5-array-object-drills/
├── data.js
├── drills.js
├── README.md
└── dashboard/
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    └── src/
        ├── main.js
        └── style.css
```

## Getting Started

### 1. Run the JavaScript drills

From the project root:

```bash
node drills.js
```

### 2. Run the dashboard

Open a terminal in the dashboard folder:

```bash
cd dashboard
npm install
npm run dev
```

Open the local URL displayed in the terminal.

## Dashboard Screenshot

![Kigali Eats Dashboard](dashboard/dashboard-screenshot.png)

*The dashboard displays order statistics, delivered revenue by district, and a filterable orders table.*

## Learning Outcomes

This project helped me practice JavaScript array methods, object manipulation, data aggregation, reusable functions, immutability, ES module imports, and rendering dynamic data in a web interface.

## Data Note

The dashboard uses sample Kigali Eats order data for learning and demonstration purposes. Revenue calculations are based on delivered orders.
