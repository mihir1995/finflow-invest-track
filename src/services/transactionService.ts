
import { supabase } from "@/integrations/supabase/client";
import { Transaction, TransactionType, RecurrenceType, StockInvestment, FixedDepositInvestment } from "@/types";
import { CurrencyCode } from "@/utils/currency";

// Interface for transaction data to be saved to Supabase
export interface TransactionToSave {
  title: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: string;
  currency: CurrencyCode;
  is_recurring: boolean;
  recurrence?: RecurrenceType;
  notes?: string;
}

// Interface for stock investment data
export interface StockInvestmentToSave {
  name: string;
  ticker: string;
  shares: number;
  purchase_price: number;
  currency: CurrencyCode;
  purchase_date: string;
}

// Interface for fixed deposit data
export interface FixedDepositToSave {
  bank_name: string;
  amount: number;
  interest_rate: number;
  start_date: string;
  maturity_date: string;
  currency: CurrencyCode;
}

// Create a new transaction
export const createTransaction = async (transactionData: TransactionToSave): Promise<{ data: any; error: any }> => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transactionData)
    .select()
    .single();
  
  return { data, error };
};

// Create a new stock investment
export const createStockInvestment = async (stockData: StockInvestmentToSave): Promise<{ data: any; error: any }> => {
  const { data, error } = await supabase
    .from('stock_investments')
    .insert(stockData)
    .select()
    .single();
  
  return { data, error };
};

// Create a new fixed deposit investment
export const createFixedDeposit = async (depositData: FixedDepositToSave): Promise<{ data: any; error: any }> => {
  const { data, error } = await supabase
    .from('fixed_deposit_investments')
    .insert(depositData)
    .select()
    .single();
  
  return { data, error };
};

// Get all transactions for the current user
export const getUserTransactions = async (): Promise<{ data: Transaction[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });
  
  return { data, error };
};

// Get recent transactions (limited number)
export const getRecentTransactions = async (limit: number = 5): Promise<{ data: Transaction[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false })
    .limit(limit);
  
  return { data, error };
};

// Get stock investments
export const getStockInvestments = async (): Promise<{ data: StockInvestment[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('stock_investments')
    .select('*');
  
  return { data, error };
};

// Get fixed deposit investments
export const getFixedDepositInvestments = async (): Promise<{ data: FixedDepositInvestment[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('fixed_deposit_investments')
    .select('*');
  
  return { data, error };
};
