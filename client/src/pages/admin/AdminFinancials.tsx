import  { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Filter, 
  Download, 
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Badge } from "@/components/ui/badge";

const budgetData = [
  { name: "Hackathon", planned: 5000, actual: 4800 },
  { name: "ML Workshop", planned: 3000, actual: 2700 },
  { name: "Tech Talk", planned: 2000, actual: 2100 },
  { name: "Industrial Visit", planned: 8000, actual: 8500 },
];

const expenseCategories = [
  { name: "Venue", value: 4500, color: "#8884d8" },
  { name: "Refreshments", value: 2800, color: "#82ca9d" },
  { name: "Marketing", value: 1500, color: "#ffc658" },
  { name: "Prizes", value: 3500, color: "#ff8042" },
  { name: "Speakers", value: 5000, color: "#a4de6c" },
];

const recentTransactions = [
  { id: 1, description: "Venue booking for Hackathon", amount: -3000, date: "2023-11-25", category: "Expense" },
  { id: 2, description: "Sponsorship - TechCorp", amount: 10000, date: "2023-11-20", category: "Income" },
  { id: 3, description: "Refreshments for ML Workshop", amount: -1500, date: "2023-11-15", category: "Expense" },
  { id: 4, description: "Registration fees collected", amount: 7500, date: "2023-11-10", category: "Income" },
  { id: 5, description: "Speaker accommodation", amount: -2000, date: "2023-11-08", category: "Expense" },
];

const AdminFinancials = () => {
  const [tab, setTab] = useState("overview");

  const totalIncome = recentTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = recentTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const balance = totalIncome - totalExpense;

  return (
    <AdminLayout currentPage="financials">
      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{balance.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Updated today</p>
                </CardContent>
              </Card>
              
              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</div>
                    <ArrowUp className="ml-2 h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">From all sources</p>
                </CardContent>
              </Card>
              
              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold">₹{totalExpense.toLocaleString()}</div>
                    <ArrowDown className="ml-2 h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">All expenses</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Budget vs. Actual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={budgetData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="planned" fill="#9b87f5" name="Planned" />
                        <Bar dataKey="actual" fill="#7E69AB" name="Actual" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseCategories}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {expenseCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="budgets">
          <div className="space-y-6">
            <div className="flex justify-between">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Budget
              </Button>
            </div>
            
            <Card className="border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left font-medium text-muted-foreground">Event</th>
                      <th className="h-10 px-4 text-left font-medium text-muted-foreground">Planned Amount</th>
                      <th className="h-10 px-4 text-left font-medium text-muted-foreground">Actual Amount</th>
                      <th className="h-10 px-4 text-left font-medium text-muted-foreground">Difference</th>
                      <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetData.map((budget, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-4">{budget.name}</td>
                        <td className="p-4">₹{budget.planned.toLocaleString()}</td>
                        <td className="p-4">₹{budget.actual.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={budget.planned >= budget.actual ? "text-green-600" : "text-red-600"}>
                            ₹{Math.abs(budget.planned - budget.actual).toLocaleString()}
                            {budget.planned >= budget.actual ? " under" : " over"}
                          </span>
                        </td>
                        <td className="p-4">
                          <Badge variant={budget.planned >= budget.actual ? "secondary" : "destructive"}>
                            {budget.planned >= budget.actual ? "Within Budget" : "Over Budget"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="expenses">
          <div className="space-y-6">
            <div className="flex justify-between">
              <div className="space-x-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </div>
            
            <Card className="border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left font-medium text-muted-foreground">Category</th>
                      <th className="h-10 px-4 text-left font-medium text-muted-foreground">Amount</th>
                      <th className="h-10 px-4 text-left font-medium text-muted-foreground">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseCategories.map((category, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-4 flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                          {category.name}
                        </td>
                        <td className="p-4">₹{category.value.toLocaleString()}</td>
                        <td className="p-4">
                          {Math.round((category.value / expenseCategories.reduce((sum, cat) => sum + cat.value, 0)) * 100)}%
                        </td>
                      </tr>
                    ))}
                    <tr className="font-medium">
                      <td className="p-4">Total</td>
                      <td className="p-4">₹{expenseCategories.reduce((sum, cat) => sum + cat.value, 0).toLocaleString()}</td>
                      <td className="p-4">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions">
          <div className="space-y-6">
            <div className="flex justify-between">
              <div className="space-x-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <div className="space-x-2">
                <Button variant="outline">
                  <ArrowDown className="mr-2 h-4 w-4" />
                  Record Expense
                </Button>
                <Button>
                  <ArrowUp className="mr-2 h-4 w-4" />
                  Record Income
                </Button>
              </div>
            </div>
            
            <Card className="border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th>
                      <th className="h-10 px-4 text-left font-medium text-muted-foreground">Description</th>
                      <th className="h-10 px-4 text-left font-medium text-muted-foreground">Category</th>
                      <th className="h-10 px-4 text-left font-medium text-muted-foreground">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-4">{new Date(transaction.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short'
                        })}</td>
                        <td className="p-4">{transaction.description}</td>
                        <td className="p-4">
                          <Badge variant={transaction.category === "Income" ? "outline" : "secondary"}>
                            {transaction.category}
                          </Badge>
                        </td>
                        <td className={`p-4 ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                          {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminFinancials;
