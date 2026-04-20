"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

const chartConfig: ChartConfig = {
  applications: { label: "Applications", color: "#1e3fb0" },
};

export function DashboardBarChart({
  data,
}: {
  data: { week: string; applications: number }[];
}) {
  return (
    <ChartContainer config={chartConfig} className="h-52 w-full">
      <BarChart data={data} barSize={60}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="week"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "#9ca3af" }}
        />
        <YAxis hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="applications" fill="#1e3fb0" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
