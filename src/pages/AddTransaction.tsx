import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownRight, ArrowUpRight, TrendingUp, Repeat, DollarSign, IndianRupee } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CurrencyCode, currencies } from "@/utils/currency";
import { TransactionType, RecurrenceType } from "@/types";
import { createTransaction, createStockInvestment, createFixedDeposit } from "@/services/transactionService";
import { useAuth } from "@/contexts/AuthContext";

type RecurrenceOption = "none" | "daily" | "weekly" | "biweekly" | "monthly" | "quarterly" | "yearly";

const recurrenceOptions: { value: RecurrenceOption; label: string }[] = [
  { value: "none", label: "One-time" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Biweekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

const recurrenceTypeMap: Record<RecurrenceOption, RecurrenceType> = {
  none: "None",
  daily: "Daily",
  weekly: "Weekly",
  biweekly: "Biweekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  yearly: "Yearly"
};

const AddTransaction = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>("expense");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrence, setRecurrence] = useState<RecurrenceOption>("none");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [showStockFields, setShowStockFields] = useState(false);
  const [showFixedDepositFields, setShowFixedDepositFields] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      toast.error("You must be logged in to add transactions");
      navigate("/login");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get('title') as string;
      const amount = parseFloat(formData.get('amount') as string);
      const category = formData.get('category') as string;
      const date = formData.get('date') as string;
      const notes = formData.get('notes') as string || undefined;
      
      if (transactionType === 'investment') {
        if (showStockFields) {
          const stockSymbol = formData.get('stockSymbol') as string;
          const stockQuantity = parseFloat(formData.get('stockQuantity') as string);
          
          const { error } = await createStockInvestment({
            name: title,
            ticker: stockSymbol,
            shares: stockQuantity,
            purchase_price: amount,
            currency,
            purchase_date: date
          });
          
          if (error) throw new Error(error.message);
          
        } else if (showFixedDepositFields) {
          const bankName = formData.get('bankName') as string;
          const interestRate = parseFloat(formData.get('interestRate') as string);
          const maturityDate = formData.get('maturityDate') as string;
          
          const { error } = await createFixedDeposit({
            bank_name: bankName,
            amount,
            interest_rate: interestRate,
            start_date: date,
            maturity_date: maturityDate,
            currency
          });
          
          if (error) throw new Error(error.message);
          
        } else {
          const { error } = await createTransaction({
            title,
            amount,
            date,
            type: transactionType,
            category,
            currency,
            is_recurring: isRecurring,
            recurrence: isRecurring ? recurrenceTypeMap[recurrence] : undefined,
            notes
          });
          
          if (error) throw new Error(error.message);
        }
      } else {
        const { error } = await createTransaction({
          title,
          amount,
          date,
          type: transactionType,
          category,
          currency,
          is_recurring: isRecurring,
          recurrence: isRecurring ? recurrenceTypeMap[recurrence] : undefined,
          notes
        });
        
        if (error) throw new Error(error.message);
      }
      
      toast.success("Transaction saved successfully");
      navigate("/transactions");
    } catch (error) {
      console.error("Error saving transaction:", error);
      toast.error(`Failed to save transaction: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvestmentCategoryChange = (value: string) => {
    setShowStockFields(value === "stocks");
    setShowFixedDepositFields(value === "fixed-deposit");
  };

  return (
    <MobileLayout>
      <div className="px-4 py-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Add Transaction</h1>
          <p className="text-muted-foreground text-sm">Record a new transaction</p>
        </div>
        
        <Card className="finflow-card p-5">
          <Tabs 
            defaultValue="expense" 
            className="w-full"
            onValueChange={(value) => setTransactionType(value as TransactionType)}
          >
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
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="flex gap-2">
                  <Select value={currency} onValueChange={(val) => setCurrency(val as CurrencyCode)}>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Currency" />
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
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    className="flex-1"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Coffee, Groceries, Salary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue="food" onValueChange={transactionType === "investment" ? handleInvestmentCategoryChange : undefined}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <TabsContent value="expense" className="mt-0">
                      <SelectItem value="food">Food & Dining</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </TabsContent>
                    <TabsContent value="income" className="mt-0">
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="interest">Interest</SelectItem>
                      <SelectItem value="gift">Gift</SelectItem>
                      <SelectItem value="dividends">Dividends</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </TabsContent>
                    <TabsContent value="investment" className="mt-0">
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="etf">ETF</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="retirement">Retirement</SelectItem>
                      <SelectItem value="fixed-deposit">Fixed Deposit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </TabsContent>
                  </SelectContent>
                </Select>
              </div>
              
              {showStockFields && (
                <div className="space-y-2 bg-muted/30 p-3 rounded-md border border-muted">
                  <Label htmlFor="stockSymbol">Stock Symbol/Ticker</Label>
                  <Input
                    id="stockSymbol"
                    name="stockSymbol"
                    placeholder="e.g. AAPL, GOOGL"
                    required={showStockFields}
                  />
                  
                  <Label htmlFor="stockQuantity">Quantity</Label>
                  <Input
                    id="stockQuantity"
                    name="stockQuantity"
                    type="number"
                    step="0.0001"
                    placeholder="Number of shares"
                    required={showStockFields}
                  />
                </div>
              )}
              
              {showFixedDepositFields && (
                <div className="space-y-2 bg-muted/30 p-3 rounded-md border border-muted">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    placeholder="e.g. HDFC Bank, Chase"
                    required={showFixedDepositFields}
                  />
                  
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    name="interestRate"
                    type="number"
                    step="0.01"
                    placeholder="e.g. 5.25"
                    required={showFixedDepositFields}
                  />
                  
                  <Label htmlFor="maturityDate">Maturity Date</Label>
                  <Input
                    id="maturityDate"
                    name="maturityDate"
                    type="date"
                    required={showFixedDepositFields}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="isRecurring" 
                  checked={isRecurring} 
                  onCheckedChange={(checked) => {
                    setIsRecurring(checked === true);
                    if (checked === false) {
                      setRecurrence("none");
                    } else {
                      setRecurrence("monthly");
                    }
                  }} 
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="isRecurring"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <Repeat className="w-4 h-4 mr-1" />
                    Recurring Transaction
                  </Label>
                </div>
              </div>
              
              {isRecurring && (
                <div className="space-y-2">
                  <Label htmlFor="recurrence">Recurrence</Label>
                  <Select value={recurrence} onValueChange={(val) => setRecurrence(val as RecurrenceOption)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {recurrenceOptions.slice(1).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  id="notes"
                  name="notes"
                  placeholder="Add any additional details"
                />
              </div>
              
              <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Transaction"}
              </Button>
            </form>
          </Tabs>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default AddTransaction;
