
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export interface InvestmentData {
  name: string;
  value: number;
}

interface InvestmentChartCardProps {
  data: InvestmentData[];
  title: string;
}

const InvestmentChartCard = ({ data, title }: InvestmentChartCardProps) => {
  return (
    <Card className="finflow-card">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
                dy={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
                width={30}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Value']} 
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentChartCard;
