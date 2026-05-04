import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "../utils";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules";
import { useChameleon } from "../context";
import type { LineChartSectionProps, ChartDataPoint } from "./types";

const DEFAULT_DATA: ChartDataPoint[] = [
  { label: "Jan", value: 30 },
  { label: "Feb", value: 50 },
  { label: "Mar", value: 45 },
  { label: "Apr", value: 70 },
  { label: "May", value: 60 },
  { label: "Jun", value: 85 },
];

const themeColors: Record<string, string> = {
  material: "#6200ee",
  simple: "#0f172a",
  minimalist: "#404040",
  glassy: "#a78bfa",
  liquid: "#7c3aed",
};

export const LineChartSection: React.FC<LineChartSectionProps> = ({
  heading = "Trend Analysis",
  data = DEFAULT_DATA,
  xAxisLabel,
  yAxisLabel,
  color,
  height = 300,
  className,
}) => {
  const { theme } = useChameleon();
  const lineColor = color ?? themeColors[theme] ?? "#6200ee";

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
          <LineChart data={data.map((d) => ({ name: d.label, value: d.value }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
            <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
            <Tooltip
              contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
              labelStyle={{ color: "var(--card-foreground)" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={2.5}
              dot={{ fill: lineColor, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
