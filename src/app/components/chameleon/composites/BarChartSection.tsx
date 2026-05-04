import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "../utils";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules";
import { useChameleon } from "../context";
import type { BarChartSectionProps, ChartDataPoint } from "./types";

const DEFAULT_DATA: ChartDataPoint[] = [
  { label: "Jan", value: 40 },
  { label: "Feb", value: 65 },
  { label: "Mar", value: 55 },
  { label: "Apr", value: 80 },
  { label: "May", value: 72 },
  { label: "Jun", value: 90 },
];

const themeColors: Record<string, string> = {
  material: "#6200ee",
  simple: "#0f172a",
  minimalist: "#404040",
  glassy: "#a78bfa",
  liquid: "#7c3aed",
};

export const BarChartSection: React.FC<BarChartSectionProps> = ({
  heading = "Monthly Overview",
  data = DEFAULT_DATA,
  xAxisLabel,
  yAxisLabel,
  color,
  height = 300,
  className,
}) => {
  const { theme } = useChameleon();
  const barColor = color ?? themeColors[theme] ?? "#6200ee";

  return (
    <Card className={cn(className)}>
      {heading && (
        <CardHeader>
          <CardTitle>{heading}</CardTitle>
          {(xAxisLabel || yAxisLabel) && (
            <p className="text-xs text-[var(--muted-foreground)]">
              {[yAxisLabel, xAxisLabel].filter(Boolean).join(" / ")}
            </p>
          )}
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data.map((d) => ({ name: d.label, value: d.value }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
            <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
            <Tooltip
              contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
              labelStyle={{ color: "var(--card-foreground)" }}
            />
            <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
