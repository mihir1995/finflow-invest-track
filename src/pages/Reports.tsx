
import React, { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AreaChart, BarChart, LineChart, PieChart } from "recharts";
import { Area, Bar, CartesianGrid, Cell, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie } from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/utils/currency";

const Reports = () => {
  const [timeRange, setTimeRange] = useState("month");

  // Mock data for different reports
  const monthlyExpensesData = [
    { name: "Jan", amount: 1200 },
    { name: "Feb", amount: 1350 },
    { name: "Mar", amount: 1100 },
    { name: "Apr", amount: 950 },
    { name: "May", amount: 1500 },
    { name: "Jun", amount: 1250 },
  ];

  const categoryData = [
    { name: "Food", value: 450 },
    { name: "Transport", value: 300 },
    { name: "Entertainment", value: 200 },
    { name: "Shopping", value: 350 },
    { name: "Utilities", value: 250 },
    { name: "Healthcare", value: 150 },
  ];

  const incomeVsExpenseData = [
    { name: "Jan", income: 3000, expense: 1200 },
    { name: "Feb", income: 3000, expense: 1350 },
    { name: "Mar", income: 3100, expense: 1100 },
    { name: "Apr", income: 3200, expense: 950 },
    { name: "May", income: 3000, expense: 1500 },
    { name: "Jun", income: 3500, expense: 1250 },
  ];

  const savingsGrowthData = [
    { name: "Jan", savings: 5000 },
    { name: "Feb", savings: 6800 },
    { name: "Mar", savings: 8300 },
    { name: "Apr", savings: 10000 },
    { name: "May", savings: 11500 },
    { name: "Jun", savings: 13000 },
  ];

  const netWorthData = [
    { name: "Jan", assets: 25000, liabilities: 15000 },
    { name: "Feb", assets: 26000, liabilities: 14800 },
    { name: "Mar", assets: 27500, liabilities: 14500 },
    { name: "Apr", assets: 29000, liabilities: 14200 },
    { name: "May", assets: 31000, liabilities: 13800 },
    { name: "Jun", assets: 33000, liabilities: 13500 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <MobileLayout>
      <div className="container px-4 py-6 space-y-6 mb-16">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold">Financial Reports</h1>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Analyze your financial data</p>
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="expenses">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income & Savings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="expenses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Expenses</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyExpensesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense by Category</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Income vs. Expense</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={incomeVsExpenseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="expense" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Savings Growth</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={savingsGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Area type="monotone" dataKey="savings" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Net Worth</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={netWorthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Legend />
                    <Bar dataKey="assets" fill="#82ca9d" name="Assets" />
                    <Bar dataKey="liabilities" fill="#ff7300" name="Liabilities" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default Reports;
