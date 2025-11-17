'use client'

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface CustomerChartProps {
  data: { name: string; customers: number }[];
}

export default function CustomerChart({ data }: CustomerChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Customers</CardTitle>
        <CardDescription>New customer acquisition over the last months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="customers" stroke="hsl(var(--primary))" name="New Customers" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
