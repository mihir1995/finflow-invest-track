
import { supabase } from "@/integrations/supabase/client";
import { Transaction, TransactionType, RecurrenceType, StockInvestment, FixedDepositInvestment } from "@/types";
import { CurrencyCode } from "@/utils/currency";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types";

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
  user_id: string;
}

// Interface for stock investment data
export interface StockInvestmentToSave {
  name: string;
  ticker: string;
  shares: number;
  purchase_price: number;
  currency: CurrencyCode;
  purchase_date: string;
  user_id: string;
}

// Interface for fixed deposit data
export interface FixedDepositToSave {
  bank_name: string;
  amount: number;
  interest_rate: number;
  start_date: string;
  maturity_date: string;
  currency: CurrencyCode;
  user_id: string;
}

// Create a new transaction
export const createTransaction = async (transactionData: TransactionToSave): Promise<PostgrestResponse<any>> => {
  const response = await supabase
    .from('transactions')
    .insert(transactionData)
    .select();
  
  return response;
};

// Create a new stock investment
export const createStockInvestment = async (stockData: StockInvestmentToSave): Promise<PostgrestResponse<any>> => {
  const response = await supabase
    .from('stock_investments')
    .insert(stockData)
    .select();
  
  return response;
};

// Create a new fixed deposit investment
export const createFixedDeposit = async (depositData: FixedDepositToSave): Promise<PostgrestResponse<any>> => {
  const response = await supabase
    .from('fixed_deposit_investments')
    .insert(depositData)
    .select();
  
  return response;
};

// Get all transactions for the current user
export const getUserTransactions = async (): Promise<PostgrestResponse<any>> => {
  const response = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });
  
  return response;
};

// Get recent transactions (limited number)
export const getRecentTransactions = async (limit: number = 5): Promise<PostgrestResponse<any>> => {
  const response = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false })
    .limit(limit);
  
  return response;
};

// Get stock investments
export const getStockInvestments = async (): Promise<PostgrestResponse<any>> => {
  const response = await supabase
    .from('stock_investments')
    .select('*');
  
  return response;
};

// Get fixed deposit investments
export const getFixedDepositInvestments = async (): Promise<PostgrestResponse<any>> => {
  const response = await supabase
    .from('fixed_deposit_investments')
    .select('*');
  
  return response;
};
