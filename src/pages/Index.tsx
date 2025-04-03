
import React, { useEffect, useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import BalanceSummary from "@/components/dashboard/BalanceSummary";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import InvestmentChartCard from "@/components/dashboard/InvestmentChartCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/user/UserMenu";
import { getRecentTransactions } from "@/services/transactionService";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for balance overview
  const balanceData = {
    totalBalance: 24560.75,
    income: 5430.20,
    expenses: 2145.60,
    investmentValue: 18734.55,
    investmentGrowth: 3.2,
  };

  // Mock data for investment chart (to be replaced with real data later)
  const investmentData = [
    { name: 'Jan', value: 15000 },
    { name: 'Feb', value: 15800 },
    { name: 'Mar', value: 15400 },
    { name: 'Apr', value: 16200 },
    { name: 'May', value: 17100 },
    { name: 'Jun', value: 18200 },
    { name: 'Jul', value: 18734 },
  ];

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      if (!isAuthenticated) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await getRecentTransactions(5);
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data) {
          setRecentTransactions(data);
        }
      } catch (error) {
        console.error("Error fetching recent transactions:", error);
        toast.error("Failed to load recent transactions");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecentTransactions();
  }, [isAuthenticated]);

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
          {isAuthenticated && user && <UserMenu user={user} />}
        </div>
        
        <BalanceSummary {...balanceData} />
        
        <RecentTransactions 
          transactions={recentTransactions} 
          onViewAll={handleViewAllTransactions}
          isLoading={isLoading}
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
