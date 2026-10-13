import { useMemo, useState } from "react";
import {
Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import {
Activity, ArrowDownRight, ArrowUpRight, Bell, CalendarDays,
ChevronDown, ChevronLeft, ChevronRight, CircleHelp,
CreditCard, Download, LayoutDashboard, LogOut, Menu, MoreHorizontal,
Search, Settings, ShoppingBag, Users, X, Zap
} from "lucide-react";
import "./App.css";

const revenueData = [
{ month: "Jan", revenue: 18400, expenses: 11200 },
{ month: "Feb", revenue: 22100, expenses: 13900 },
{ month: "Mar", revenue: 19800, expenses: 12400 },
{ month: "Apr", revenue: 27600, expenses: 15800 },
{ month: "May", revenue: 24800, expenses: 14600 },
{ month: "Jun", revenue: 32400, expenses: 18300 },
{ month: "Jul", revenue: 29800, expenses: 17100 },
{ month: "Aug", revenue: 36700, expenses: 20100 },
{ month: "Sep", revenue: 34200, expenses: 19400 },
{ month: "Oct", revenue: 42100, expenses: 22800 },
{ month: "Nov", revenue: 38900, expenses: 21500 },
{ month: "Dec", revenue: 48600, expenses: 25100 }
];

const trafficData = [
{ name: "Direct", value: 38, color: "#6d5ce8" },
{ name: "Social", value: 27, color: "#31b9a1" },
{ name: "Organic", value: 23, color: "#f3ad57" },
{ name: "Referral", value: 12, color: "#e783a9" }
];

const initialOrders = [
{ id: "#ORD-7241", customer: "Olivia Rhye", email: "[olivia@example.com](mailto:olivia@example.com)", product: "Pro Plan", date: "Oct 12, 2026", amount: 249, status: "Completed", initials: "OR", color: "lavender" },
{ id: "#ORD-7240", customer: "Phoenix Baker", email: "[phoenix@example.com](mailto:phoenix@example.com)", product: "Team Plan", date: "Oct 12, 2026", amount: 499, status: "Pending", initials: "PB", color: "mint" },
{ id: "#ORD-7239", customer: "Lana Steiner", email: "[lana@example.com](mailto:lana@example.com)", product: "Starter Plan", date: "Oct 11, 2026", amount: 99, status: "Completed", initials: "LS", color: "peach" },
{ id: "#ORD-7238", customer: "Demi Wilkinson", email: "[demi@example.com](mailto:demi@example.com)", product: "Pro Plan", date: "Oct 11, 2026", amount: 249, status: "Cancelled", initials: "DW", color: "pink" },
{ id: "#ORD-7237", customer: "Candice Wu", email: "[candice@example.com](mailto:candice@example.com)", product: "Team Plan", date: "Oct 10, 2026", amount: 499, status: "Completed", initials: "CW", color: "blue" }
];

const navGroups = [
{
label: "WORKSPACE",
items: [
{ name: "Overview", icon: LayoutDashboard },
{ name: "Analytics", icon: Activity },
{ name: "Customers", icon: Users, count: "2.4k" },
{ name: "Products", icon: ShoppingBag },
{ name: "Transactions", icon: CreditCard }
]
}
];

function formatCurrency(value) {
return "$" + Number(value).toLocaleString("en-US");
}

function Sidebar({ activePage, setActivePage, open, close }) {
return (
<>
{open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={close} />}
<aside className={`sidebar ${open ? "sidebar-open" : ""}`}> <div className="brand"> <div className="brand-mark"><Activity size={21} strokeWidth={2.5} /></div> <span>insight<span className="brand-light">board</span></span> <button className="mobile-close" onClick={close} aria-label="Close menu"><X size={19} /></button> </div>

  <button className="workspace-switch">
      <div className="workspace-logo">S</div>
      <div className="workspace-copy"><strong>Studio Acme</strong><span>Free workspace</span></div>
      <ChevronDown size={16} />
    </button>

    {navGroups.map(group => (
      <div className="nav-group" key={group.label}>
        <p className="nav-label">{group.label}</p>
        {group.items.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className={`nav-item ${activePage === item.name ? "nav-active" : ""}`}
              onClick={() => { setActivePage(item.name); close(); }}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.name}</span>
              {item.count && <span className="nav-count">{item.count}</span>}
              {item.name === "Analytics" && <span className="nav-new">NEW</span>}
            </button>
          );
        })}
      </div>
    ))}

    <div className="nav-group">
      <p className="nav-label">PREFERENCES</p>
      <button className={`nav-item ${activePage === "Settings" ? "nav-active" : ""}`} onClick={() => { setActivePage("Settings"); close(); }}><Settings size={18} /><span>Settings</span></button>
      <button className={`nav-item ${activePage === "Help & support" ? "nav-active" : ""}`} onClick={() => { setActivePage("Help & support"); close(); }}><CircleHelp size={18} /><span>Help & support</span></button>
    </div>

    <div className="sidebar-bottom">
      <div className="upgrade-card">
        <div className="upgrade-icon"><Zap size={17} fill="currentColor" /></div>
        <strong>Unlock your potential</strong>
        <p>Get more insights with our Pro plan.</p>
        <button onClick={() => alert("This is a demo. Pro plan checkout is not connected.")}>Explore Pro <ArrowUpRight size={14} /></button>
      </div>
      <div className="profile">
        <div className="profile-avatar">SR</div>
        <div className="profile-copy"><strong>Sivaneshwaran R.</strong><span>Admin account</span></div>
        <button aria-label="Log out" onClick={() => alert("Demo dashboard: sign-out is not connected.")}><LogOut size={17} /></button>
      </div>
    </div>
  </aside>
</>

);
}

function MetricCard({ title, value, change, positive, icon: Icon, note }) {
return ( <article className="metric-card"> <div className="metric-top"> <span className="metric-title">{title}</span> <span className="metric-icon"><Icon size={18} /></span> </div> <div className="metric-value">{value}</div> <div className="metric-footer">
<span className={`change-pill ${positive ? "change-up" : "change-down"}`}>
{positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
{change} </span> <span className="metric-note">{note}</span> </div> </article>
);
}

function ChartTooltip({ active, payload, label }) {
if (!active || !payload?.length) return null;
return ( <div className="chart-tooltip"> <p>{label}</p>
{payload.map(item => ( <div className="tooltip-row" key={item.dataKey}>
<span className="tooltip-dot" style={{ background: item.color }} /> <span>{item.name}</span> <strong>{formatCurrency(item.value)}</strong> </div>
))} </div>
);
}

function RevenueChart({ range }) {
const data = useMemo(() => {
if (range === "Last 30 days") return revenueData.slice(8);
if (range === "Last 90 days") return revenueData.slice(6);
return revenueData;
}, [range]);

return ( <ResponsiveContainer width="100%" height="100%">
<AreaChart data={data} margin={{ top: 12, right: 8, left: -14, bottom: 0 }}> <defs> <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1"> <stop offset="0%" stopColor="#6d5ce8" stopOpacity={0.2} /> <stop offset="95%" stopColor="#6d5ce8" stopOpacity={0.005} /> </linearGradient> <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1"> <stop offset="0%" stopColor="#31b9a1" stopOpacity={0.12} /> <stop offset="95%" stopColor="#31b9a1" stopOpacity={0.005} /> </linearGradient> </defs> <CartesianGrid stroke="#edf0f5" strokeDasharray="4 5" vertical={false} />
<XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9399a9", fontSize: 11 }} dy={10} />
<YAxis axisLine={false} tickLine={false} tick={{ fill: "#9399a9", fontSize: 11 }} tickFormatter={v => `$${v / 1000}k`} />
<Tooltip content={<ChartTooltip />} />
<Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6d5ce8" strokeWidth={2.5} fill="url(#revenueGradient)" activeDot={{ r: 5, strokeWidth: 0 }} />
<Area type="monotone" dataKey="expenses" name="Expenses" stroke="#31b9a1" strokeWidth={2} fill="url(#expenseGradient)" activeDot={{ r: 4, strokeWidth: 0 }} /> </AreaChart> </ResponsiveContainer>
);
}

function TrafficChart() {
return ( <ResponsiveContainer width="100%" height="100%"> <PieChart> <Pie data={trafficData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={83} paddingAngle={4} stroke="none">
{trafficData.map(item => <Cell key={item.name} fill={item.color} />)} </Pie>
<Tooltip formatter={value => `${value}%`} /> </PieChart> </ResponsiveContainer>
);
}

function SalesChart({ range }) {
const data = useMemo(() => {
const multiplier = range === "Last 30 days" ? 0.45 : range === "Last 90 days" ? 0.75 : 1;
return [
{ day: "Mon", sales: 42 }, { day: "Tue", sales: 61 },
{ day: "Wed", sales: 48 }, { day: "Thu", sales: 78 },
{ day: "Fri", sales: 57 }, { day: "Sat", sales: 88 },
{ day: "Sun", sales: 68 }
].map(item => ({ ...item, sales: Math.round(item.sales * multiplier) }));
}, [range]);

return ( <ResponsiveContainer width="100%" height="100%">
<BarChart data={data} margin={{ top: 10, right: 0, left: -26, bottom: 0 }}> <CartesianGrid stroke="#edf0f5" strokeDasharray="4 5" vertical={false} />
<XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9399a9", fontSize: 11 }} dy={9} />
<YAxis axisLine={false} tickLine={false} tick={{ fill: "#9399a9", fontSize: 10 }} />
<Tooltip cursor={{ fill: "#f7f6ff" }} formatter={value => [`${value} orders`, "Sales"]} />
<Bar dataKey="sales" fill="#6d5ce8" radius={[5, 5, 0, 0]} maxBarSize={28} /> </BarChart> </ResponsiveContainer>
);
}

function OrdersTable({ search, statusFilter }) {
const filtered = initialOrders.filter(order => {
const matchesSearch = `${order.id} ${order.customer} ${order.email} ${order.product}`.toLowerCase().includes(search.toLowerCase());
return matchesSearch && (statusFilter === "All" || order.status === statusFilter);
});

return ( <div className="table-scroll"> <table className="orders-table"> <thead><tr><th>ORDER</th><th>CUSTOMER</th><th>PRODUCT</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th><th></th></tr></thead> <tbody>
{filtered.map(order => ( <tr key={order.id}> <td><span className="order-id">{order.id}</span></td> <td><div className="customer-cell"><span className={`customer-avatar avatar-${order.color}`}>{order.initials}</span><div><strong>{order.customer}</strong><span>{order.email}</span></div></div></td> <td>{order.product}</td> <td className="date-cell">{order.date}</td> <td className="amount-cell">{formatCurrency(order.amount)}</td> <td><span className={`status status-${order.status.toLowerCase()}`}><span />{order.status}</span></td> <td><button className="icon-button table-more" aria-label={`More options for ${order.id}`} onClick={() => alert(`${order.id}: ${order.customer}\n${order.product} · ${formatCurrency(order.amount)}\nStatus: ${order.status}`)}><MoreHorizontal size={18} /></button></td> </tr>
))}
{filtered.length === 0 && <tr><td colSpan="7" className="empty-state">No orders match your search.</td></tr>} </tbody> </table> </div>
);
}

function App() {
const [activePage, setActivePage] = useState("Overview");
const [range, setRange] = useState("This year");
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [mobileOpen, setMobileOpen] = useState(false);
const [notificationsOpen, setNotificationsOpen] = useState(false);

const isOverview = activePage === "Overview";
const pageDescriptions = {
Overview: "Here’s what’s happening with your business today.",
Analytics: "Explore trends and understand your business performance.",
Customers: "Understand your audience and customer activity.",
Products: "Track your product plans and performance.",
Transactions: "Review and search your latest transactions.",
Settings: "Manage your workspace preferences.",
"Help & support": "Find help and get more from your workspace."
};

function downloadReport() {
const rows = [
["Order ID", "Customer", "Email", "Product", "Date", "Amount USD", "Status"],
...initialOrders.map(o => [o.id, o.customer, o.email, o.product, o.date, o.amount, o.status])
];
const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
const url = URL.createObjectURL(blob);
const link = document.createElement("a");
link.href = url;
link.download = "insightboard-orders.csv";
link.click();
URL.revokeObjectURL(url);
}

return ( <div className="app-shell">
<Sidebar activePage={activePage} setActivePage={setActivePage} open={mobileOpen} close={() => setMobileOpen(false)} />

  <main className="main-area">
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
        <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{activePage}</strong></div>
      </div>
      <div className="topbar-actions">
        <label className="search-box"><Search size={17} /><input aria-label="Search orders" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></label>
        <div className="notification-wrap">
          <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setNotificationsOpen(v => !v)}><Bell size={19} /><span className="notification-dot" /></button>
          {notificationsOpen && <div className="notification-popover"><strong>You’re all caught up!</strong><p>New order updates and workspace alerts will appear here.</p><button onClick={() => setNotificationsOpen(false)}>Got it</button></div>}
        </div>
        <div className="topbar-avatar">SR</div>
      </div>
    </header>

    <div className="page-content">
      <section className="welcome-row">
        <div><div className="eyebrow"><span className="live-dot" /> BUSINESS OVERVIEW</div><h1>{isOverview ? "Good morning, Sivaneshwaran" : activePage}<span className="wave">✦</span></h1><p>{pageDescriptions[activePage] || "Your business performance at a glance."}</p></div>
        <div className="welcome-actions"><button className="button button-secondary" onClick={downloadReport}><Download size={16} /> Export report</button><button className="button button-primary" onClick={() => alert("Demo mode: connect your data source to create a live report.")}><Zap size={16} /> Create report</button></div>
      </section>

      <section className="metrics-grid">
        <MetricCard title="Total revenue" value="$48,294" change="12.8%" positive note="vs. last period" icon={CreditCard} />
        <MetricCard title="Total customers" value="2,420" change="8.2%" positive note="vs. last period" icon={Users} />
        <MetricCard title="Total orders" value="1,849" change="3.1%" positive note="vs. last period" icon={ShoppingBag} />
        <MetricCard title="Conversion rate" value="3.62%" change="0.4%" positive={false} note="vs. last period" icon={Activity} />
      </section>

      <section className="chart-grid">
        <article className="panel revenue-panel">
          <div className="panel-header"><div><h2>Revenue overview</h2><p>Monitor your revenue and expenses over time.</p></div><label className="select-wrap"><CalendarDays size={15} /><select value={range} onChange={e => setRange(e.target.value)} aria-label="Select date range"><option>This year</option><option>Last 90 days</option><option>Last 30 days</option></select><ChevronDown size={14} /></label></div>
          <div className="revenue-summary"><strong>$48,294.00</strong><span className="change-pill change-up"><ArrowUpRight size={14} /> 12.8%</span><span className="summary-caption">compared to previous period</span></div>
          <div className="legend-row"><span><i className="legend-dot legend-purple" /> Revenue</span><span><i className="legend-dot legend-green" /> Expenses</span></div>
          <div className="revenue-chart"><RevenueChart range={range} /></div>
        </article>

        <article className="panel traffic-panel">
          <div className="panel-header"><div><h2>Traffic sources</h2><p>Where your visitors come from.</p></div><button className="icon-button" aria-label="Traffic chart options" onClick={() => alert("Traffic source data shown is sample analytics.")}><MoreHorizontal size={20} /></button></div>
          <div className="traffic-total"><strong>24,892</strong><span>Visitors this month</span></div>
          <div className="traffic-chart"><TrafficChart /></div>
          <div className="traffic-legend">{trafficData.map(item => <div className="traffic-legend-item" key={item.name}><span className="traffic-name"><i style={{ background: item.color }} />{item.name}</span><strong>{item.value}%</strong><div className="mini-track"><span style={{ width: `${item.value}%`, background: item.color }} /></div></div>)}</div>
        </article>
      </section>

      <section className="bottom-grid">
        <article className="panel sales-panel">
          <div className="panel-header"><div><h2>Weekly sales</h2><p>Your order volume this week.</p></div><button className="icon-button" aria-label="Sales chart information" onClick={() => alert("Weekly sales are illustrative demo values.")}><MoreHorizontal size={20} /></button></div>
          <div className="sales-total"><strong>1,284</strong><span className="change-pill change-up"><ArrowUpRight size={14} /> 6.4%</span></div>
          <div className="sales-chart"><SalesChart range={range} /></div>
        </article>

        <article className="panel insight-panel">
          <div className="insight-heading"><span className="insight-icon"><Zap size={17} /></span><div><h2>Smart insights</h2><p>Highlights from your data</p></div><span className="ai-label">AI-INSPIRED</span></div>
          <div className="insight-item"><span className="insight-number">01</span><div><strong>Revenue is trending up</strong><p>Your revenue increased by 12.8% compared to the previous period.</p></div></div>
          <div className="insight-item"><span className="insight-number">02</span><div><strong>Social traffic is growing</strong><p>Social channels contribute 27% of total visitors this month.</p></div></div>
          <button className="insight-link" onClick={() => setActivePage("Analytics")}>Explore analytics <ArrowUpRight size={15} /></button>
        </article>
      </section>

      <section className="panel orders-panel">
        <div className="orders-heading"><div><h2>Recent orders</h2><p>Track and manage your latest customer orders.</p></div><button className="button button-secondary button-small" onClick={() => setActivePage("Transactions")}>View all <ArrowUpRight size={15} /></button></div>
        <div className="orders-toolbar"><div className="order-tabs">{["All", "Completed", "Pending", "Cancelled"].map(status => <button key={status} className={statusFilter === status ? "tab-active" : ""} onClick={() => setStatusFilter(status)}>{status}{status === "All" && <span>5</span>}</button>)}</div><button className="filter-button" onClick={downloadReport}><Download size={15} /> Export CSV</button></div>
        <OrdersTable search={search} statusFilter={statusFilter} />
        <div className="table-footer"><span>Showing filtered results from <strong>5 sample orders</strong></span><div className="pagination"><button disabled aria-label="Previous page"><ChevronLeft size={16} /></button><span>1</span><button disabled aria-label="Next page"><ChevronRight size={16} /></button></div></div>
      </section>

      <footer className="footer"><span>© 2026 InsightBoard, Inc.</span><span><span className="footer-status" /> All systems operational</span><span>Built with care for better decisions <span className="footer-heart">♥</span></span></footer>
    </div>
  </main>
</div>

);
}

export default App;
