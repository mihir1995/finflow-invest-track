
import React, { useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencyCode, formatCurrency, convertCurrency } from "@/utils/currency";
import { DollarSign, IndianRupee } from "lucide-react";

// Updated investment data with currency
const investmentData = [
  {
    name: "Stocks",
    value: 8750,
    color: "#3B82F6",
    currency: "USD" as CurrencyCode,
  },
  {
    name: "ETFs",
    value: 6230,
    color: "#10B981",
    currency: "USD" as CurrencyCode,
  },
  {
    name: "Crypto",
    value: 2100,
    color: "#8B5CF6",
    currency: "USD" as CurrencyCode,
  },
  {
    name: "Real Estate",
    value: 1654.55,
    color: "#F59E0B",
    currency: "USD" as CurrencyCode,
  },
  {
    name: "Fixed Deposits",
    value: 250000,
    color: "#EC4899",
    currency: "INR" as CurrencyCode,
  },
];

// Updated portfolio items with currency
const portfolioItems = [
  {
    name: "Apple Inc.",
    ticker: "AAPL",
    shares: 10,
    price: 178.72,
    value: 1787.2,
    change: 1.25,
    color: "#3B82F6",
    currency: "USD" as CurrencyCode,
    googleFinanceCode: "NASDAQ:AAPL",
  },
  {
    name: "Vanguard S&P 500 ETF",
    ticker: "VOO",
    shares: 5,
    price: 456.78,
    value: 2283.9,
    change: 0.75,
    color: "#10B981",
    currency: "USD" as CurrencyCode,
    googleFinanceCode: "NYSEARCA:VOO",
  },
  {
    name: "Bitcoin",
    ticker: "BTC",
    shares: 0.05,
    price: 42000,
    value: 2100,
    change: -2.3,
    color: "#8B5CF6",
    currency: "USD" as CurrencyCode,
    googleFinanceCode: "CRYPTO:BTC",
  },
  {
    name: "Real Estate Fund",
    ticker: "REIT",
    shares: 20,
    price: 82.73,
    value: 1654.6,
    change: 0.43,
    color: "#F59E0B",
    currency: "USD" as CurrencyCode,
    googleFinanceCode: "NYSE:VNQ",
  },
  {
    name: "HDFC Bank Fixed Deposit",
    ticker: "FD",
    shares: 1,
    price: 250000,
    value: 250000,
    change: 0.25,
    color: "#EC4899",
    currency: "INR" as CurrencyCode,
    maturityDate: "2025-12-31",
    interestRate: 6.5,
  },
];

const Investments = () => {
  const [displayCurrency, setDisplayCurrency] = useState<CurrencyCode>("USD");

  // Function to convert investment values to selected display currency
  const getConvertedData = () => {
    return investmentData.map(item => ({
      ...item,
      displayValue: convertCurrency(item.value, item.currency, displayCurrency)
    }));
  };

  const convertedData = getConvertedData();
  const totalValue = convertedData.reduce((sum, item) => sum + item.displayValue, 0);

  // Function to get converted portfolio items
  const getConvertedPortfolioItems = () => {
    return portfolioItems.map(item => ({
      ...item,
      displayValue: convertCurrency(item.value, item.currency, displayCurrency)
    }));
  };

  const convertedPortfolioItems = getConvertedPortfolioItems();

  return (
    <MobileLayout>
      <div className="px-4 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Investments</h1>
            <p className="text-muted-foreground text-sm">Track your investment portfolio</p>
          </div>
          <Select value={displayCurrency} onValueChange={(val) => setDisplayCurrency(val as CurrencyCode)}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>USD</span>
              </SelectItem>
              <SelectItem value="INR" className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4" />
                <span>INR</span>
              </SelectItem>
            </SelectContent>
          </Select>
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
                    data={convertedData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="displayValue"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {convertedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [formatCurrency(value as number, displayCurrency), 'Amount']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-muted-foreground">Total Portfolio Value</p>
              <p className="text-2xl font-bold">{formatCurrency(totalValue, displayCurrency)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="finflow-card">
          <CardHeader>
            <CardTitle className="text-lg">Your Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {convertedPortfolioItems.map((item) => (
                <div key={item.ticker} className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.ticker === "FD" 
                        ? `Interest Rate: ${item.interestRate}% · Matures: ${new Date(item.maturityDate || "").toLocaleDateString()}`
                        : `${item.ticker} · ${item.shares} shares`}
                      {item.googleFinanceCode && ` · ${item.googleFinanceCode}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(item.displayValue, displayCurrency)}</p>
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
