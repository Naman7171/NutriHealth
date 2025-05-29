
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Mail, Phone, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock customer data
const mockCustomers = [
  {
    id: "cus_001",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    orders: 5,
    totalSpent: 349.95,
    joinDate: "2023-05-15",
    status: "active",
  },
  {
    id: "cus_002",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+1 (555) 234-5678",
    orders: 2,
    totalSpent: 129.90,
    joinDate: "2023-06-22",
    status: "active",
  },
  {
    id: "cus_003",
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "+1 (555) 345-6789",
    orders: 0,
    totalSpent: 0,
    joinDate: "2023-07-10",
    status: "inactive",
  },
  {
    id: "cus_004",
    name: "Diana Prince",
    email: "diana@example.com",
    phone: "+1 (555) 456-7890",
    orders: 8,
    totalSpent: 599.92,
    joinDate: "2023-04-05",
    status: "active",
  },
  {
    id: "cus_005",
    name: "Ethan Hunt",
    email: "ethan@example.com",
    phone: "+1 (555) 567-8901",
    orders: 3,
    totalSpent: 219.85,
    joinDate: "2023-08-17",
    status: "active",
  },
];

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter customers based on search term
    const filtered = mockCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );
    
    setFilteredCustomers(filtered);
  };

  const handleExportCustomers = () => {
    // Mock export functionality
    alert("Customer data export initiated!");
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage and view your customer information
          </p>
        </div>
        <Button onClick={handleExportCustomers}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{new Date(customer.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={customer.status === "active" ? "default" : "secondary"}
                      className={customer.status === "active" ? "bg-green-500" : ""}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCustomers;
