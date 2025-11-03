// src/pages/AdminDashboard.jsx
import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import {
  getAdminTotalOrders,
  getAdminTotalMeals,
  getAdminTotalUsers,
  getAdminRevenue,
} from "../api";
import { useNavigate } from "react-router-dom";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

// Map routes -> components 
const componentMap = {
  "/admin/orders": lazy(() => import("../pages/AdminOrdersPage")),
  "/admin/meals": lazy(() => import("../pages/AdminMealsPage")),
  "/admin/users": lazy(() => import("../pages/AdminUsersPage")),
  "/admin/revenue": lazy(() => import("../pages/MonthlyReports")),
  "/active-subscribers": lazy(() => import("../pages/ActiveSubscribers")),
  "/deliveries": lazy(() => import("../pages/Deliveries")),
  "/expiring-subscriptions": lazy(() => import("../pages/ExpiringSubscriptions")),
  "/admin/subscribers": lazy(() => import("../pages/SubscriberManagement")),
  "/admin/settings": lazy(() => import("../pages/AdminSettings")),
  "/admin/communication": lazy(() => import("../pages/CommunicationAutomation")),
  "/admin/create-admin": lazy(() => import("../pages/AdminEditUserPage")),
};

const AdminDashboard = () => {
  const [totals, setTotals] = useState({ orders: 0, meals: 0, users: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // role check
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();
  const isSuperAdmin = storedUser?.role === "superadmin";

  useEffect(() => {
    let mounted = true;
    const fetchTotals = async () => {
      setLoading(true);
      setError("");
      try {
        const [orders, meals, users, revenue] = await Promise.all([
          getAdminTotalOrders(),
          getAdminTotalMeals(),
          getAdminTotalUsers(),
          getAdminRevenue(),
        ]);
        if (!mounted) return;
        setTotals({
          orders: orders?.totalOrders || 0,
          meals: meals?.totalMeals || 0,
          users: users?.totalUsers || 0,
          revenue: revenue?.totalRevenue || 0,
        });
      } catch (err) {
        console.error("Error fetching admin totals:", err);
        if (!mounted) return;
        setError(err?.message || "Failed to fetch dashboard data.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTotals();
    return () => {
      mounted = false;
    };
  }, []);

  // active menu & refs for scrolling
  const [activeMenu, setActiveMenu] = useState("reports");
  const itemRefs = useRef({});
  useEffect(() => {
    const ref = itemRefs.current[activeMenu];
    if (ref && ref.scrollIntoView) {
      setTimeout(() => {
        try {
          ref.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } catch {
          ref.scrollIntoView();
        }
      }, 80);
    }
  }, [activeMenu]);

  // mobile/tablet drawer state (three-dots)
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-xl">Loading admin dashboard...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;

  const menuItems = [
    { key: "orders", label: "Total Orders", subtitle: `${totals.orders}`, route: "/admin/orders" },
    { key: "meals", label: "Total Meals", subtitle: `${totals.meals}`, route: "/admin/meals" },
    { key: "users", label: "Total Users", subtitle: `${totals.users}`, route: "/admin/users" },
    { key: "revenue", label: "Revenue", subtitle: `₹${Number(totals.revenue || 0).toLocaleString()}`, route: "/admin/revenue" },
    { key: "active_subs", label: "Active Subscribers", subtitle: "52", route: "/active-subscribers" },
    { key: "deliveries", label: "Deliveries Today", subtitle: "145", route: "/deliveries" },
    { key: "expiring", label: "Expiring Soon", subtitle: "8", route: "/expiring-subscriptions" },
    { key: "reports", label: "Monthly Reports", subtitle: "View", route: null },
    { key: "subscriber_mgmt", label: "Subscriber Management", subtitle: "Manage", route: "/admin/subscribers" },
    { key: "settings", label: "Settings", subtitle: "⚙️", route: "/admin/settings" },
    { key: "communication", label: "Communication & Automation", subtitle: "Open", route: "/admin/communication" },
  ];
  if (isSuperAdmin) menuItems.push({ key: "create_admin", label: "Create Admin User", subtitle: "+", route: "/admin/create-admin" });

  const renderRightContent = () => {
    const current = menuItems.find((m) => m.key === activeMenu);
    if (!current || current.key === "reports") {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-primary-800 text-center">Reports & Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-[250px] flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-3 text-center">Monthly Revenue Overview</h3>
              <div className="w-full max-w-[600px] h-[220px]">
                <Line
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    datasets: [{ label: "Revenue (₹)", data: [40000, 55000, 70000, 50000, 85000, 95000, 120000], borderColor: "rgba(75,192,192,1)", backgroundColor: "rgba(75,192,192,0.2)", fill: true, tension: 0.4 }],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } }, scales: { y: { ticks: { stepSize: 20000 } } } }}
                />
              </div>
            </div>

            <div className="h-[250px] flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-3 text-center">Orders by Meal Type</h3>
              <div className="w-full max-w-[600px] h-[220px]">
                <Bar
                  data={{
                    labels: ["Breakfast", "Lunch", "Dinner"],
                    datasets: [{ label: "Orders", data: [120, 250, 180], backgroundColor: ["rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)", "rgba(255,206,86,0.6)"] }],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="w-[260px] h-[260px]">
              <h3 className="text-lg font-semibold mb-3 text-center">Subscription Type Distribution</h3>
              <Pie
                data={{ labels: ["Weekly", "Monthly", "Quarterly"], datasets: [{ data: [30, 50, 20], backgroundColor: ["rgba(255,159,64,0.7)", "rgba(153,102,255,0.7)", "rgba(255,205,86,0.7)"], borderWidth: 1 }] }}
                options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }}
              />
            </div>
          </div>
        </div>
      );
    }

    if (current && current.route && componentMap[current.route]) {
      const PageComponent = componentMap[current.route];
      return (
        <div className="h-[calc(100vh-14rem)] overflow-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold">{current.label}</h3>
            <div className="space-x-2">
              <button className="hidden md:inline px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-sm" onClick={() => navigate(current.route)}>Open in full page</button>
              <button className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-sm" onClick={() => { setActiveMenu("reports"); setTimeout(() => setActiveMenu(current.key), 10); }} title="Refresh">Refresh</button>
            </div>
          </div>

          <div className="bg-white rounded-md p-3 shadow-sm">
            <Suspense fallback={<div className="p-6 text-center">Loading content...</div>}>
              <PageComponent embedded={true} />
            </Suspense>
          </div>
        </div>
      );
    }

    if (current && current.route) {
      navigate(current.route);
      return <div className="p-6">Redirecting...</div>;
    }
    return null;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header centered with balanced left/right placeholders so title is perfectly centered visually */}
      <div className="p-6 border-b bg-white flex items-center justify-center relative">
        {/* left - three-dots menu (visible on md and smaller: lg:hidden) */}
        <div className="absolute left-4 top-6 lg:hidden w-11 h-11 flex items-center justify-center">
          <button
            aria-label="Toggle menu"
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="12" r="1.6" className="fill-current text-gray-600" />
              <circle cx="12" cy="12" r="1.6" className="fill-current text-gray-600" />
              <circle cx="19" cy="12" r="1.6" className="fill-current text-gray-600" />
            </svg>
          </button>
        </div>

        {/* center title */}
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800 text-center">{isSuperAdmin ? "Super Admin Dashboard" : "Admin Dashboard"}</h1>

        {/* right placeholder to visually balance the left button so title stays centered */}
        <div className="absolute right-4 top-6 w-11 h-11" aria-hidden="true" />
      </div>

      <div className="flex">
        {/* Permanent sidebar for lg+ screens */}
        <aside className="hidden lg:block w-72 p-6 sticky top-4 h-[calc(100vh-2rem)] overflow-auto">
          <div className="space-y-4">
            {menuItems.map((m) => {
              const active = activeMenu === m.key;
              return (
                <div key={m.key} ref={(el) => (itemRefs.current[m.key] = el)} onClick={() => setActiveMenu(m.key)} className={`bg-white p-4 rounded-xl shadow-md text-left cursor-pointer transition flex flex-col justify-center ${active ? "ring-2 ring-primary-600 bg-gray-50" : "hover:bg-gray-100"}`}>
                  <div className="flex items-center justify-between">
                    <div><div className="text-sm font-semibold">{m.label}</div></div>
                    <div className="text-2xl font-bold text-primary-600">{m.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Drawer overlay for mobile & tablet (visible on md and smaller) */}
        {drawerOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/30" onClick={() => setDrawerOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 overflow-auto shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Menu</h4>
                <button className="px-2 py-1 rounded hover:bg-gray-100" onClick={() => setDrawerOpen(false)}>Close</button>
              </div>
              <div className="space-y-4">
                {menuItems.map((m) => {
                  const active = activeMenu === m.key;
                  return (
                    <div key={`drawer-${m.key}`} onClick={() => { setActiveMenu(m.key); setDrawerOpen(false); }} className={`bg-white p-4 rounded-xl shadow-sm text-left cursor-pointer transition flex flex-col justify-center ${active ? "ring-2 ring-primary-600 bg-gray-50" : "hover:bg-gray-100"}`}>
                      <div className="flex items-center justify-between">
                        <div><div className="text-sm font-semibold">{m.label}</div></div>
                        <div className="text-xl font-bold text-primary-600">{m.subtitle}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8">
          {/* Mobile quick cards (hidden while drawer open) */}
          <div className={`md:hidden mb-6 ${drawerOpen ? "hidden" : "block"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {menuItems.map((m) => (
                <div key={`mobile-${m.key}`} className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-100 transition" onClick={() => setActiveMenu(m.key)}>
                  <h2 className="text-lg font-semibold mb-2">{m.label}</h2>
                  <p className="text-3xl font-bold text-primary-600">{m.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 bg-white p-4 md:p-6 rounded-xl shadow-md min-h-[60vh]">
            {renderRightContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
