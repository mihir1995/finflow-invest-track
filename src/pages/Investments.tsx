
import React from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const investmentData = [
  {
    name: "Stocks",
    value: 8750,
    color: "#3B82F6",
  },
  {
    name: "ETFs",
    value: 6230,
    color: "#10B981",
  },
  {
    name: "Crypto",
    value: 2100,
    color: "#8B5CF6",
  },
  {
    name: "Real Estate",
    value: 1654.55,
    color: "#F59E0B",
  },
];

const portfolioItems = [
  {
    name: "Apple Inc.",
    ticker: "AAPL",
    shares: 10,
    price: 178.72,
    value: 1787.2,
    change: 1.25,
    color: "#3B82F6",
  },
  {
    name: "Vanguard S&P 500 ETF",
    ticker: "VOO",
    shares: 5,
    price: 456.78,
    value: 2283.9,
    change: 0.75,
    color: "#10B981",
  },
  {
    name: "Bitcoin",
    ticker: "BTC",
    shares: 0.05,
    price: 42000,
    value: 2100,
    change: -2.3,
    color: "#8B5CF6",
  },
  {
    name: "Real Estate Fund",
    ticker: "REIT",
    shares: 20,
    price: 82.73,
    value: 1654.6,
    change: 0.43,
    color: "#F59E0B",
  },
];

const Investments = () => {
  const totalValue = investmentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <MobileLayout>
      <div className="px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Investments</h1>
          <p className="text-muted-foreground text-sm">Track your investment portfolio</p>
        </div>
        
        <Card className="finflow-card">
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={investmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {investmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-muted-foreground">Total Portfolio Value</p>
              <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="finflow-card">
          <CardHeader>
            <CardTitle className="text-lg">Your Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioItems.map((item) => (
                <div key={item.ticker} className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.ticker} · {item.shares} shares</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.value.toLocaleString()}</p>
                    <p className={`text-xs ${item.change >= 0 ? 'text-finance-income' : 'text-finance-expense'}`}>
                      {item.change >= 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Investments;
