
import { CurrencyCode } from "@/utils/currency";

export type TransactionType = "expense" | "income" | "investment";
export type RecurrenceType = "None" | "Daily" | "Weekly" | "Biweekly" | "Monthly" | "Quarterly" | "Yearly";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: string;
  currency: CurrencyCode;
  isRecurring?: boolean;
  recurrence?: RecurrenceType;
}

export interface StockInvestment {
  id: string;
  name: string;
  ticker: string; // Google Finance code
  shares: number;
  purchasePrice: number;
  currentPrice?: number;
  currency: CurrencyCode;
  purchaseDate: string;
}

export interface FixedDepositInvestment {
  id: string;
  bankName: string;
  amount: number;
  interestRate: number;
  startDate: string;
  maturityDate: string;
  currency: CurrencyCode;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
