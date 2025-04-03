
import React, { useEffect, useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, ShoppingBag, Coffee, Briefcase, Droplet, TrendingUp, 
  DollarSign, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types";
import { getUserTransactions } from "@/services/transactionService";
import { formatCurrency } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Category icon mapping
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  food: Coffee,
  shopping: ShoppingBag,
  investment: TrendingUp,
  utilities: Droplet,
  salary: Briefcase,
  freelance: Briefcase,
  interest: DollarSign,
  gift: DollarSign,
  dividends: DollarSign,
  stocks: TrendingUp,
  etf: TrendingUp,
  crypto: TrendingUp,
  retirement: TrendingUp,
  "fixed-deposit": TrendingUp
};

const Transactions = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to view transactions");
      navigate("/login");
      return;
    }

    const fetchTransactions = async () => {
      try {
        const { data, error } = await getUserTransactions();
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data) {
          setTransactions(data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
  }, [isAuthenticated, navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <MobileLayout>
      <div className="px-4 py-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-muted-foreground text-sm">Manage your income and expenses</p>
          </div>
          <Button 
            onClick={() => navigate('/add-transaction')}
            className="rounded-full h-10 w-10 p-0"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        
        <Card className="finflow-card">
          <CardHeader>
            <CardTitle className="text-lg">All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="text-center">
                  <p>Loading transactions...</p>
                </div>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-10">
                <p>No transactions found</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => navigate('/add-transaction')}
                >
                  Add Your First Transaction
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {transactions.map((transaction) => {
                  const IconComponent = categoryIcons[transaction.category] || ShoppingBag;
                  const isExpense = transaction.type === "expense";
                  const isIncome = transaction.type === "income";
                  const isInvestment = transaction.type === "investment";
                  
                  return (
                    <li key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          isExpense && "bg-red-100",
                          isIncome && "bg-green-100",
                          isInvestment && "bg-blue-100"
                        )}>
                          <IconComponent className={cn(
                            "w-5 h-5",
                            isExpense && "text-finance-expense",
                            isIncome && "text-finance-income",
                            isInvestment && "text-finance-investment"
                          )} />
                        </div>
                        
                        <div>
                          <p className="font-medium text-sm">{transaction.title}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        {isIncome ? (
                          <ArrowUpRight className="w-3 h-3 text-finance-income mr-1" />
                        ) : isExpense ? (
                          <ArrowDownRight className="w-3 h-3 text-finance-expense mr-1" />
                        ) : null}
                        <span className={cn(
                          "font-semibold",
                          isExpense && "text-finance-expense",
                          isIncome && "text-finance-income",
                          isInvestment && "text-finance-investment"
                        )}>
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Transactions;
