
import React from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import BalanceSummary from "@/components/dashboard/BalanceSummary";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import InvestmentChartCard from "@/components/dashboard/InvestmentChartCard";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  // Mock data
  const balanceData = {
    totalBalance: 24560.75,
    income: 5430.20,
    expenses: 2145.60,
    investmentValue: 18734.55,
    investmentGrowth: 3.2,
  };

  const recentTransactions = [
    {
      id: "t1",
      title: "Coffee Shop",
      amount: 5.75,
      date: "Today, 9:15 AM",
      type: "expense" as const,
      category: "food",
    },
    {
      id: "t2",
      title: "Salary Deposit",
      amount: 3200.00,
      date: "Yesterday",
      type: "income" as const,
      category: "salary",
    },
    {
      id: "t3",
      title: "Amazon Purchase",
      amount: 43.95,
      date: "Mar 15, 2023",
      type: "expense" as const,
      category: "shopping",
    },
    {
      id: "t4",
      title: "S&P 500 ETF",
      amount: 500.00,
      date: "Mar 12, 2023",
      type: "investment" as const,
      category: "investment",
    },
  ];

  const investmentData = [
    { name: 'Jan', value: 15000 },
    { name: 'Feb', value: 15800 },
    { name: 'Mar', value: 15400 },
    { name: 'Apr', value: 16200 },
    { name: 'May', value: 17100 },
    { name: 'Jun', value: 18200 },
    { name: 'Jul', value: 18734 },
  ];

  const handleViewAllTransactions = () => {
    navigate('/transactions');
  };
  
  return (
    <MobileLayout>
      <div className="px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">FinFlow</h1>
            <p className="text-muted-foreground text-sm">Track your finances with ease</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <span className="font-medium text-sm">JD</span>
          </div>
        </div>
        
        <BalanceSummary {...balanceData} />
        
        <RecentTransactions 
          transactions={recentTransactions} 
          onViewAll={handleViewAllTransactions} 
        />
        
        <InvestmentChartCard 
          data={investmentData}
          title="Investment Portfolio"
        />
      </div>
    </MobileLayout>
  );
};

export default Index;
