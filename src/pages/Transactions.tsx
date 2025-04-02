
import React from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, ShoppingBag, Coffee, Briefcase, Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

const transactionsData = [
  {
    id: "t1",
    title: "Coffee Shop",
    amount: 5.75,
    date: "Today, 9:15 AM",
    type: "expense" as const,
    category: "food",
    icon: Coffee,
  },
  {
    id: "t2",
    title: "Salary Deposit",
    amount: 3200.00,
    date: "Yesterday",
    type: "income" as const,
    category: "salary",
    icon: Briefcase,
  },
  {
    id: "t3",
    title: "Amazon Purchase",
    amount: 43.95,
    date: "Mar 15, 2023",
    type: "expense" as const,
    category: "shopping",
    icon: ShoppingBag,
  },
  {
    id: "t4",
    title: "S&P 500 ETF",
    amount: 500.00,
    date: "Mar 12, 2023",
    type: "investment" as const,
    category: "investment",
    icon: Briefcase,
  },
  {
    id: "t5",
    title: "Water Bill",
    amount: 75.40,
    date: "Mar 10, 2023",
    type: "expense" as const,
    category: "utilities",
    icon: Droplet,
  },
  {
    id: "t6",
    title: "Freelance Payment",
    amount: 850.00,
    date: "Mar 5, 2023",
    type: "income" as const,
    category: "freelance",
    icon: Briefcase,
  },
];

const Transactions = () => {
  return (
    <MobileLayout>
      <div className="px-4 py-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground text-sm">Manage your income and expenses</p>
        </div>
        
        <Card className="finflow-card">
          <CardHeader>
            <CardTitle className="text-lg">All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {transactionsData.map((transaction) => {
                const Icon = transaction.icon;
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
                        <Icon className={cn(
                          "w-5 h-5",
                          isExpense && "text-finance-expense",
                          isIncome && "text-finance-income",
                          isInvestment && "text-finance-investment"
                        )} />
                      </div>
                      
                      <div>
                        <p className="font-medium text-sm">{transaction.title}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
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
                        ${transaction.amount.toLocaleString()}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Transactions;
