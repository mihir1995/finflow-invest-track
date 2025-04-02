
import React from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  {
    name: "Jan",
    income: 3200,
    expenses: 2100,
  },
  {
    name: "Feb",
    income: 3400,
    expenses: 2300,
  },
  {
    name: "Mar",
    income: 3650,
    expenses: 2200,
  },
  {
    name: "Apr",
    income: 3800,
    expenses: 2450,
  },
  {
    name: "May",
    income: 3700,
    expenses: 2300,
  },
  {
    name: "Jun",
    income: 4000,
    expenses: 2500,
  },
];

const expenseCategories = [
  { name: "Housing", value: 1200, color: "#3B82F6" },
  { name: "Food", value: 450, color: "#10B981" },
  { name: "Transport", value: 300, color: "#8B5CF6" },
  { name: "Entertainment", value: 250, color: "#F59E0B" },
  { name: "Utilities", value: 200, color: "#EF4444" },
  { name: "Other", value: 100, color: "#6B7280" },
];

const incomeCategories = [
  { name: "Salary", value: 3500, color: "#10B981" },
  { name: "Freelance", value: 850, color: "#3B82F6" },
  { name: "Investments", value: 320, color: "#8B5CF6" },
  { name: "Other", value: 130, color: "#6B7280" },
];

const Reports = () => {
  return (
    <MobileLayout>
      <div className="px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground text-sm">Analyze your financial trends</p>
        </div>

        <Card className="finflow-card p-2">
          <Tabs defaultValue="monthly">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Financial Overview</CardTitle>
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="categories">Categories</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="monthly" className="mt-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => `$${value}`}
                        width={40}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, '']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Bar
                        name="Income"
                        dataKey="income"
                        fill="#10B981"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        name="Expenses"
                        dataKey="expenses"
                        fill="#EF4444"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="categories" className="space-y-6 mt-2">
                <div>
                  <h3 className="font-medium mb-2">Expense Distribution</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseCategories}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name }) => name}
                        >
                          {expenseCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Income Sources</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={incomeCategories}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name }) => name}
                        >
                          {incomeCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        
        <Card className="finflow-card">
          <CardHeader>
            <CardTitle className="text-lg">Savings Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">$3,500 / $10,000</span>
                <span className="text-sm text-muted-foreground">35%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-finance-saving" 
                  style={{ width: "35%" }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">Emergency Fund - Target Date: December 2023</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Reports;
