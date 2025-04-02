
import React from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddTransaction = () => {
  return (
    <MobileLayout>
      <div className="px-4 py-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Add Transaction</h1>
          <p className="text-muted-foreground text-sm">Record a new transaction</p>
        </div>
        
        <Card className="finflow-card p-5">
          <Tabs defaultValue="expense" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="expense" className="flex items-center gap-1">
                <ArrowDownRight className="w-4 h-4" />
                <span>Expense</span>
              </TabsTrigger>
              <TabsTrigger value="income" className="flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                <span>Income</span>
              </TabsTrigger>
              <TabsTrigger value="investment" className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>Investment</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Form fields - shared between tabs */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Coffee, Groceries, Salary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <TabsContent value="expense">
                      <SelectItem value="food">Food & Dining</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                    </TabsContent>
                    <TabsContent value="income">
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="interest">Interest</SelectItem>
                      <SelectItem value="gift">Gift</SelectItem>
                    </TabsContent>
                    <TabsContent value="investment">
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="etf">ETF</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="retirement">Retirement</SelectItem>
                    </TabsContent>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  id="notes"
                  placeholder="Add any additional details"
                />
              </div>
              
              <Button className="w-full mt-4" type="submit">
                Save Transaction
              </Button>
            </div>
          </Tabs>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default AddTransaction;
