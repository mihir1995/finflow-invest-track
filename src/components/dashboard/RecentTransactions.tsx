import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Coffee, ShoppingBag, Briefcase, Droplet, Cpu, Repeat, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { CurrencyCode, formatCurrency } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll: () => void;
  isLoading?: boolean;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  food: Coffee,
  shopping: ShoppingBag,
  investment: TrendingUp,
  utilities: Droplet,
  technology: Cpu,
  salary: Briefcase,
  freelance: Briefcase,
  stocks: TrendingUp,
  etf: TrendingUp,
  crypto: TrendingUp
};

const RecentTransactions = ({ transactions, onViewAll, isLoading = false }: RecentTransactionsProps) => {
  const formatDate = (dateString: string) => {
    // Check if the date is today
    const today = new Date().toDateString();
    const transactionDate = new Date(dateString).toDateString();
    
    if (today === transactionDate) {
      return "Today";
    }
    
    // Check if the date is yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (yesterday.toDateString() === transactionDate) {
      return "Yesterday";
    }
    
    // Otherwise return formatted date
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <Card className="finflow-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <button onClick={onViewAll} className="text-sm font-medium text-primary">
            View all
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <p>Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-2">No transactions yet</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/add-transaction'}
              className="mt-2"
            >
              Add Your First Transaction
            </Button>
          </div>
        ) : (
          <ul className="space-y-4">
            {transactions.map((transaction) => {
              const Icon = categoryIcons[transaction.category] || ShoppingBag;
              const isExpense = transaction.type === "expense";
              const isIncome = transaction.type === "income";
              const isInvestment = transaction.type === "investment";
              const currency = transaction.currency || "USD";
              
              return (
                <li key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg relative",
                      isExpense && "bg-red-100",
                      isIncome && "bg-green-100",
                      isInvestment && "bg-blue-100"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5",
                        isExpense && "text-finance-expense",
                        isIncome && "text-finance-income",
                        isInvestment && "text-finance-investment"
                      )} />
                      
                      {transaction.isRecurring && (
                        <span className="absolute -top-1 -right-1 bg-secondary rounded-full w-4 h-4 flex items-center justify-center">
                          <Repeat className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-medium text-sm">{transaction.title}</p>
                        {transaction.isRecurring && (
                          <span className="text-xs text-muted-foreground">
                            ({transaction.recurrence})
                          </span>
                        )}
                      </div>
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
                      {formatCurrency(transaction.amount, currency)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
