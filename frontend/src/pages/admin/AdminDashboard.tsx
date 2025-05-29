
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProducts, mockUsers } from "@/lib/mockData";
import { Package, Users, ShoppingCart, TrendingUp, CreditCard, ArrowUpRight } from "lucide-react";
import AdminLayout from "./AdminLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock sales data
const salesData = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 1890 },
  { name: "Apr", total: 3200 },
  { name: "May", total: 3800 },
  { name: "Jun", total: 2800 },
  { name: "Jul", total: 3500 },
];

// Mock category data
const categoryData = mockProducts.reduce((acc, product) => {
  const existingCategory = acc.find((c) => c.name === product.category);
  if (existingCategory) {
    existingCategory.value += 1;
  } else {
    acc.push({ name: product.category, value: 1 });
  }
  return acc;
}, [] as { name: string; value: number }[]);

// Mock order status data
const orderStatusData = [
  { name: "Delivered", value: 24 },
  { name: "Processing", value: 8 },
  { name: "Shipped", value: 12 },
  { name: "Cancelled", value: 2 },
];

// Colors for pie chart
const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

const AdminDashboard = () => {
  // Calculate mock stats
  const totalRevenue = salesData.reduce((acc, data) => acc + data.total, 0);
  const totalOrders = 46; // Mock data
  const totalCustomers = mockUsers.length;
  const totalProducts = mockProducts.length;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              An overview of your store's performance.
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button>
              <TrendingUp className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <div className="bg-primary/10 text-primary p-2 rounded-full">
                  <CreditCard className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center">
                <span className="text-green-600 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3" /> 12%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{totalOrders}</div>
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <ShoppingCart className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center">
                <span className="text-green-600 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3" /> 8%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{totalCustomers}</div>
                <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center">
                <span className="text-green-600 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3" /> 5%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{totalProducts}</div>
                <div className="bg-amber-100 text-amber-600 p-2 rounded-full">
                  <Package className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center">
                <span className="text-green-600 flex items-center mr-1">
                  <ArrowUpRight className="h-3 w-3" /> 3
                </span>
                added this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Revenue"]}
                      labelStyle={{ color: "#374151" }}
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Revenue"]}
                      labelStyle={{ color: "#374151" }}
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Products by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      formatter={(value, name) => [`${value} products`, name]}
                      labelStyle={{ color: "#374151" }}
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      formatter={(value, name) => [`${value} orders`, name]}
                      labelStyle={{ color: "#374151" }}
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
