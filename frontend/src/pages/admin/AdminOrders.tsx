
import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockProducts } from "@/lib/mockData";
import { Eye, Search, Filter, ChevronDown, CheckCircle, Truck, Package, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Mock order data
const mockOrders = [
  {
    id: "ORD-1234",
    customerName: "John Doe",
    email: "john.doe@example.com",
    date: "2023-04-15T10:30:00Z",
    total: 129.99,
    status: "delivered",
    items: [
      { id: "1", name: "Organic Whey Protein", quantity: 1, price: 49.99 },
      { id: "2", name: "Vitamin D3 + K2 Drops", quantity: 1, price: 29.99 },
      { id: "5", name: "Probiotic 50 Billion CFU", quantity: 1, price: 39.99 },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
    },
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-1235",
    customerName: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2023-05-02T14:45:00Z",
    total: 94.98,
    status: "shipped",
    items: [
      { id: "4", name: "Organic Green Superfood Powder", quantity: 1, price: 59.99 },
      { id: "6", name: "Magnesium Glycinate", quantity: 1, price: 24.99 },
    ],
    shippingAddress: {
      name: "Jane Smith",
      street: "456 Park Ave",
      city: "Boston",
      state: "MA",
      postalCode: "02108",
      country: "USA",
    },
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-1236",
    customerName: "Michael Johnson",
    email: "michael.j@example.com",
    date: "2023-05-05T09:15:00Z",
    total: 74.98,
    status: "processing",
    items: [
      { id: "3", name: "Omega-3 Fish Oil", quantity: 1, price: 34.99 },
      { id: "7", name: "Plant-Based Protein Bars", quantity: 1, price: 29.99 },
    ],
    shippingAddress: {
      name: "Michael Johnson",
      street: "789 Oak St",
      city: "Chicago",
      state: "IL",
      postalCode: "60601",
      country: "USA",
    },
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-1237",
    customerName: "Emily Davis",
    email: "emily.d@example.com",
    date: "2023-05-10T16:20:00Z",
    total: 144.98,
    status: "pending",
    items: [
      { id: "8", name: "Collagen Peptides", quantity: 2, price: 44.99 },
      { id: "4", name: "Organic Green Superfood Powder", quantity: 1, price: 59.99 },
    ],
    shippingAddress: {
      name: "Emily Davis",
      street: "101 Pine St",
      city: "Seattle",
      state: "WA",
      postalCode: "98101",
      country: "USA",
    },
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-1238",
    customerName: "David Wilson",
    email: "david.w@example.com",
    date: "2023-05-12T11:05:00Z",
    total: 69.98,
    status: "cancelled",
    items: [
      { id: "6", name: "Magnesium Glycinate", quantity: 2, price: 24.99 },
      { id: "2", name: "Vitamin D3 + K2 Drops", quantity: 1, price: 29.99 },
    ],
    shippingAddress: {
      name: "David Wilson",
      street: "202 Maple Ave",
      city: "Denver",
      state: "CO",
      postalCode: "80201",
      country: "USA",
    },
    paymentMethod: "PayPal",
  },
];

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const AdminOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // View order details
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  // Update order status
  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been updated to ${newStatus}.`,
    });
    setIsViewDialogOpen(false);
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return {
          variant: "outline" as const,
          className: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
        };
      case "shipped":
        return {
          variant: "outline" as const,
          className: "bg-blue-100 text-blue-800 border-blue-200",
          icon: Truck,
        };
      case "processing":
        return {
          variant: "outline" as const,
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: Package,
        };
      case "cancelled":
        return {
          variant: "outline" as const,
          className: "bg-red-100 text-red-800 border-red-200",
          icon: AlertCircle,
        };
      default:
        return {
          variant: "outline" as const,
          className: "bg-gray-100 text-gray-800 border-gray-200",
          icon: ChevronDown,
        };
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">
              Manage and track customer orders
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by order ID or customer..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Filter className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium">No orders found</p>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{order.customerName}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const { variant, className, icon: Icon } = getStatusBadge(order.status);
                        return (
                          <Badge variant={variant} className={className}>
                            <Icon className="h-3 w-3 mr-1" />
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        );
                      })()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder && (
                <span>
                  Order #{selectedOrder.id} • {new Date(selectedOrder.date).toLocaleString()}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Details */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Customer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm">
                    <p className="font-medium">{selectedOrder.customerName}</p>
                    <p className="text-muted-foreground">{selectedOrder.email}</p>
                  </CardContent>
                </Card>
                
                {/* Shipping Details */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm">
                    <p>{selectedOrder.shippingAddress.name}</p>
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                    </p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Order Items */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between py-2">
                        <div className="flex items-center">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>$0.00</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Order Status */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Order Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Status</p>
                      <div className="mt-1">
                        {(() => {
                          const { variant, className, icon: Icon } = getStatusBadge(selectedOrder.status);
                          return (
                            <Badge variant={variant} className={className}>
                              <Icon className="h-3 w-3 mr-1" />
                              {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                            </Badge>
                          );
                        })()}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Payment Method</p>
                      <p className="text-sm mt-1">{selectedOrder.paymentMethod}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2">Update Status</p>
                    <div className="flex flex-wrap gap-2">
                      {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                        <Button
                          key={status}
                          variant={selectedOrder.status === status ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleStatusChange(selectedOrder.id, status)}
                          disabled={selectedOrder.status === status}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsViewDialogOpen(false)}
                    className="ml-auto"
                  >
                    Close
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
