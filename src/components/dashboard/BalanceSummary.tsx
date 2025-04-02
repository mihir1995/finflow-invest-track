
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

interface BalanceSummaryProps {
  totalBalance: number;
  income: number;
  expenses: number;
  investmentValue: number;
  investmentGrowth: number;
}

const BalanceSummary = ({
  totalBalance,
  income,
  expenses,
  investmentValue,
  investmentGrowth,
}: BalanceSummaryProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="p-6 finflow-card">
        <h2 className="text-sm font-medium text-muted-foreground">Total Balance</h2>
        <p className="text-3xl font-bold mt-1">${totalBalance.toLocaleString()}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <ArrowUpRight className="w-4 h-4 text-finance-income" />
              <span className="text-xs font-medium text-muted-foreground">Income</span>
            </div>
            <p className="text-finance-income font-semibold">${income.toLocaleString()}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <ArrowDownRight className="w-4 h-4 text-finance-expense" />
              <span className="text-xs font-medium text-muted-foreground">Expenses</span>
            </div>
            <p className="text-finance-expense font-semibold">${expenses.toLocaleString()}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 finflow-card bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-blue-100">Investments</h2>
          <TrendingUp className="w-5 h-5 text-blue-100" />
        </div>
        <p className="text-2xl font-bold mt-1">${investmentValue.toLocaleString()}</p>
        <div className="flex items-center mt-2 bg-white/10 rounded-full px-2 py-0.5 w-fit">
          <ArrowUpRight className="w-3 h-3 mr-1" />
          <span className="text-xs font-medium">+{investmentGrowth}%</span>
        </div>
      </Card>
    </div>
  );
};

export default BalanceSummary;
