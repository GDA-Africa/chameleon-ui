import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Upload,
  X,
  Check,
  Plus,
  GripVertical,
  Bell,
  BellOff,
  Calendar as CalendarIcon,
  Clock,
  Image as ImageIcon,
  ZoomIn,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Edit2,
  Tag,
  FileText,
  File,
  AlertTriangle,
  MoreHorizontal,
  SlidersHorizontal,
  Eye,
  EyeOff,
  User,
  CheckCircle2,
  XCircle,
  Info,
  Settings,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { cn } from "./utils";
import { Button, Badge, Input, Progress } from "./atoms";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./molecules";
import { useThemeClasses, useChameleon } from "./context";
import { animationPresets, Animated, AnimatedList } from "./animations";

// ─── Shared helpers ───────────────────────────────────────────────────────────

const useThemeChartColors = () => {
  const { theme, mode } = useChameleon();
  const palettes: Record<string, string[]> = {
    material: ["#6200ee", "#03dac6", "#ff6d00", "#018786", "#b00020", "#e040fb"],
    simple: ["#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1", "#e2e8f0"],
    minimalist: ["#000000", "#404040", "#808080", "#b0b0b0", "#d0d0d0", "#f0f0f0"],
    glassy: ["#a78bfa", "#60a5fa", "#f472b6", "#34d399", "#fbbf24", "#f87171"],
    liquid: ["#7c3aed", "#4f46e5", "#9333ea", "#6d28d9", "#c084fc", "#a78bfa"],
  };
  const colors = palettes[theme] || palettes.simple!;
  // Safe accessor — array is always 6 items, wraps index
  const color = (i: number) => colors[i % colors.length]!;
  return { colors, color };
};

// ─── 1. DATA TABLE ────────────────────────────────────────────────────────────

type SortDir = "asc" | "desc" | null;

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: string;
  hideOnMobile?: boolean;
}

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchable?: boolean;
  exportable?: boolean;
  pageSize?: number;
  animated?: boolean;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  title,
  searchable = true,
  exportable = false,
  pageSize = 8,
  animated = true,
  className,
}: DataTableProps<T>) {
  const { cardClass, theme, textPrimary, textMuted } = useThemeClasses();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});
  const [filterOpen, setFilterOpen] = useState(false);
  const preset = animationPresets[theme];

  const filtered = useMemo(() => {
    let result = [...data];
    if (search) {
      result = result.filter((row) =>
        columns.some((col) => String(row[col.key]).toLowerCase().includes(search.toLowerCase())),
      );
    }
    Object.entries(filters).forEach(([key, val]) => {
      if (val)
        result = result.filter((row) =>
          String(row[key])
            .toLowerCase()
            .includes((val as string).toLowerCase()),
        );
    });
    if (sortKey && sortDir) {
      result.sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [data, search, sortKey, sortDir, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: keyof T) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") setSortDir("desc");
    else {
      setSortKey(null);
      setSortDir(null);
    }
    setPage(1);
  };

  const thClass = cn(
    "px-4 py-3 text-left text-xs font-black uppercase tracking-widest",
    theme === "minimalist"
      ? "text-[var(--foreground)] border-b border-[var(--border)]"
      : "text-[var(--muted-foreground)]",
  );

  const tdClass = cn(
    "px-4 py-3.5 text-sm text-[var(--foreground)]",
    theme === "minimalist" ? "border-b border-[var(--border)]" : "",
  );

  return (
    <div className={cn(cardClass, "overflow-hidden", className)}>
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)] flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          {title && <h3 className={cn("font-bold text-base", textPrimary)}>{title}</h3>}
          <p className={cn("text-xs", textMuted)}>{filtered.length} records</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--muted-foreground)]" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search..."
                className={cn(
                  "h-8 pl-8 pr-3 text-xs w-44 focus:outline-none transition-all",
                  theme === "glassy"
                    ? "bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:bg-white/15"
                    : theme === "minimalist"
                      ? "bg-transparent border-b border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                      : "bg-[var(--muted)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]",
                )}
              />
            </div>
          )}
          <button
            onClick={() => setFilterOpen((v) => !v)}
            className={cn(
              "h-8 w-8 flex items-center justify-center rounded-lg transition-colors",
              filterOpen
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter row */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="overflow-hidden border-b border-[var(--border)]"
          >
            <div className="p-3 flex flex-wrap gap-2 bg-[var(--muted)]/30">
              {columns
                .filter((c) => c.filterable)
                .map((col) => (
                  <div key={String(col.key)} className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">
                      {col.label}:
                    </span>
                    <input
                      value={filters[col.key] || ""}
                      onChange={(e) => setFilters((f) => ({ ...f, [col.key]: e.target.value }))}
                      placeholder={`Filter ${col.label}...`}
                      className="h-7 px-2 text-xs bg-[var(--card)] border border-[var(--border)] rounded text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] w-32"
                    />
                  </div>
                ))}
              <button
                onClick={() => setFilters({})}
                className="text-[10px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors ml-auto"
              >
                Clear all
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={theme !== "minimalist" ? "bg-[var(--muted)]/40" : ""}>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    thClass,
                    col.hideOnMobile && "hidden sm:table-cell",
                    col.width && col.width,
                  )}
                  onClick={() => col.sortable && toggleSort(col.key)}
                >
                  <div
                    className={cn(
                      "flex items-center gap-1",
                      col.sortable &&
                        "cursor-pointer select-none hover:text-[var(--foreground)] transition-colors",
                    )}
                  >
                    {col.label}
                    {col.sortable && (
                      <div className="flex flex-col -gap-0.5 ml-0.5">
                        <ChevronUp
                          className={cn(
                            "w-2.5 h-2.5 -mb-0.5",
                            sortKey === col.key && sortDir === "asc"
                              ? "text-[var(--primary)]"
                              : "opacity-30",
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "w-2.5 h-2.5",
                            sortKey === col.key && sortDir === "desc"
                              ? "text-[var(--primary)]"
                              : "opacity-30",
                          )}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {paginated.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={animated ? { opacity: 0, y: 8 } : {}}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: animated ? i * 0.03 : 0, ...preset.enter.transition }}
                  className={cn(
                    "transition-colors",
                    theme === "glassy"
                      ? "hover:bg-white/5 border-b border-white/10"
                      : "hover:bg-[var(--muted)]/40 border-b border-[var(--border)]",
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={cn(tdClass, col.hideOnMobile && "hidden sm:table-cell")}
                    >
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-[var(--muted-foreground)] text-sm"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-[var(--border)] flex items-center justify-between flex-wrap gap-3">
        <p className={cn("text-xs", textMuted)}>
          Showing {Math.min((page - 1) * pageSize + 1, filtered.length)}–
          {Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={cn(
              "w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all disabled:opacity-30",
              "bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
            )}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pg =
              totalPages <= 5
                ? i + 1
                : page <= 3
                  ? i + 1
                  : page >= totalPages - 2
                    ? totalPages - 4 + i
                    : page - 2 + i;
            return (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all",
                  pg === page
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                )}
              >
                {pg}
              </button>
            );
          })}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={cn(
              "w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all disabled:opacity-30",
              "bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
            )}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 2. THEME CHART ───────────────────────────────────────────────────────────

type ChartType = "line" | "bar" | "area" | "pie" | "donut" | "radar" | "scatter" | "composed";

interface ChartDataPoint {
  name: string;
  [key: string]: number | string | null | undefined;
}

interface ThemeChartProps {
  type: ChartType;
  data: ChartDataPoint[];
  series?: { key: string; label: string }[];
  title?: string;
  height?: number;
  animated?: boolean;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
}

export const ThemeChart: React.FC<ThemeChartProps> = ({
  type,
  data,
  series = [{ key: "value", label: "Value" }],
  title,
  height = 280,
  animated = true,
  className,
  showGrid = true,
  showLegend = false,
}) => {
  const { cardClass, theme, textPrimary, textMuted } = useThemeClasses();
  const { color } = useThemeChartColors();

  const gridColor =
    theme === "glassy"
      ? "rgba(255,255,255,0.1)"
      : theme === "minimalist"
        ? "#e5e5e5"
        : "var(--border)";
  const textColor = theme === "glassy" ? "rgba(255,255,255,0.6)" : "var(--muted-foreground)";
  const tooltipStyle = {
    backgroundColor: theme === "glassy" ? "rgba(30,20,60,0.9)" : "var(--card)",
    border: theme === "glassy" ? "1px solid rgba(255,255,255,0.2)" : "1px solid var(--border)",
    color: "var(--card-foreground)",
    borderRadius: "0.75rem",
    backdropFilter: theme === "glassy" ? "blur(12px)" : undefined,
  };

  const commonProps = { data };

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />}
            <XAxis
              dataKey="name"
              tick={{ fill: textColor, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <RechartsTooltip
              contentStyle={tooltipStyle}
              cursor={{ stroke: color(0), strokeWidth: 1, strokeDasharray: "3 3" }}
            />
            {showLegend && <Legend />}
            {series.map((s, i) => (
              <Line
                key={s.key}
                type={
                  theme === "liquid" ? "monotone" : theme === "minimalist" ? "linear" : "monotone"
                }
                dataKey={s.key}
                name={s.label}
                stroke={color(i)}
                strokeWidth={theme === "minimalist" ? 1 : 2.5}
                dot={theme === "material" ? { r: 4, fill: color(i) } : false}
                activeDot={{ r: 6, fill: color(i) }}
                isAnimationActive={animated}
              />
            ))}
          </LineChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps} barCategoryGap="30%">
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            )}
            <XAxis
              dataKey="name"
              tick={{ fill: textColor, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <RechartsTooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: theme === "glassy" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }}
            />
            {showLegend && <Legend />}
            {series.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label}
                fill={color(i)}
                radius={
                  theme === "minimalist"
                    ? [0, 0, 0, 0]
                    : theme === "liquid"
                      ? [8, 8, 0, 0]
                      : [4, 4, 0, 0]
                }
                isAnimationActive={animated}
              />
            ))}
          </BarChart>
        );

      case "area":
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />}
            <XAxis
              dataKey="name"
              tick={{ fill: textColor, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <RechartsTooltip contentStyle={tooltipStyle} />
            {showLegend && <Legend />}
            {series.map((s, i) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={color(i)}
                fill={color(i)}
                fillOpacity={theme === "glassy" ? 0.15 : 0.12}
                strokeWidth={2}
                isAnimationActive={animated}
              />
            ))}
          </AreaChart>
        );

      case "pie":
      case "donut":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={type === "donut" ? 90 : 100}
              innerRadius={type === "donut" ? 55 : 0}
              dataKey={series[0]?.key || "value"}
              isAnimationActive={animated}
              paddingAngle={type === "donut" ? 3 : 0}
            >
              {data.map((entry, i) => (
                <Cell
                  key={`cell-${i}-${entry.name || entry.id || i}`}
                  fill={color(i)}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <RechartsTooltip contentStyle={tooltipStyle} />
            {showLegend && <Legend />}
          </PieChart>
        );

      case "radar":
        return (
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis dataKey="name" tick={{ fill: textColor, fontSize: 11 }} />
            <PolarRadiusAxis tick={{ fill: textColor, fontSize: 10 }} />
            <RechartsTooltip contentStyle={tooltipStyle} />
            {series.map((s, i) => (
              <Radar
                key={s.key}
                name={s.label}
                dataKey={s.key}
                stroke={color(i)}
                fill={color(i)}
                fillOpacity={0.2}
                isAnimationActive={animated}
              />
            ))}
          </RadarChart>
        );

      case "scatter":
        return (
          <ScatterChart>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />}
            <XAxis
              type="number"
              dataKey={series[0]?.key || "x"}
              name="X"
              tick={{ fill: textColor, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="number"
              dataKey={series[1]?.key || "y"}
              name="Y"
              tick={{ fill: textColor, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <RechartsTooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data} fill={color(0)} isAnimationActive={animated} />
          </ScatterChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn(cardClass, "p-5", className)}>
      {title && (
        <div className="mb-4">
          <h3 className={cn("font-bold text-sm", textPrimary)}>{title}</h3>
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart() || <div />}
      </ResponsiveContainer>
    </div>
  );
};

// ─── 3. COMMAND PALETTE ───────────────────────────────────────────────────────

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ElementType;
  group?: string;
  action?: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  items: CommandItem[];
  open: boolean;
  onClose: () => void;
  placeholder?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  items,
  open,
  onClose,
  placeholder = "Type a command or search...",
}) => {
  const { theme } = useThemeClasses();
  const [query, setQuery] = useState("");
  const preset = animationPresets[theme];
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const filtered = query
    ? items.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : items;

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    const g = item.group || "Actions";
    if (!acc[g]) acc[g] = [];
    acc[g].push(item);
    return acc;
  }, {});

  const overlayClass = {
    material: "bg-black/50",
    simple: "bg-black/40 backdrop-blur-sm",
    minimalist: "bg-black/75",
    glassy: "bg-black/50 backdrop-blur-sm",
    liquid: "bg-black/30 backdrop-blur-md",
  }[theme];

  const panelClass = {
    material: "bg-white text-gray-900 shadow-2xl rounded-sm overflow-hidden",
    simple: "bg-white text-gray-900 rounded-xl border border-gray-200 shadow-xl overflow-hidden",
    minimalist: "bg-white text-black border border-gray-200 shadow-none overflow-hidden",
    glassy:
      "bg-white/10 backdrop-blur-md border border-white/25 text-white rounded-3xl shadow-2xl overflow-hidden",
    liquid: "bg-white text-gray-900 rounded-[2rem] shadow-2xl shadow-purple-500/20 overflow-hidden",
  }[theme];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn(
            "fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4",
            overlayClass,
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            className={cn("w-full max-w-xl", panelClass)}
            initial={preset.scaleIn.initial}
            animate={preset.scaleIn.animate}
            exit={{ ...preset.enter.exit, scale: 0.95 }}
            transition={preset.scaleIn.transition}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-3",
                theme === "glassy" ? "border-b border-white/15" : "border-b border-gray-100",
              )}
            >
              <Search
                className={cn(
                  "w-4 h-4 shrink-0",
                  theme === "glassy" ? "text-white/60" : "text-gray-400",
                )}
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className={cn(
                  "flex-1 text-sm bg-transparent outline-none placeholder:text-gray-400",
                  theme === "glassy" ? "text-white placeholder:text-white/40" : "text-gray-900",
                )}
              />
              <kbd
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded font-mono",
                  theme === "glassy" ? "bg-white/10 text-white/50" : "bg-gray-100 text-gray-500",
                )}
              >
                ESC
              </kbd>
            </div>

            <div className="max-h-[360px] overflow-y-auto py-2">
              {Object.entries(grouped).map(([group, groupItems]) => (
                <div key={group}>
                  <div
                    className={cn(
                      "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest",
                      theme === "glassy" ? "text-white/40" : "text-gray-400",
                    )}
                  >
                    {group}
                  </div>
                  {groupItems.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action?.();
                        onClose();
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                        theme === "glassy"
                          ? "hover:bg-white/10 text-white"
                          : "hover:bg-gray-50 text-gray-900",
                      )}
                    >
                      {item.icon && (
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            theme === "glassy" ? "bg-white/10" : "bg-gray-100",
                          )}
                        >
                          <item.icon className="w-4 h-4" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.label}</p>
                        {item.description && (
                          <p
                            className={cn(
                              "text-xs truncate",
                              theme === "glassy" ? "text-white/50" : "text-gray-400",
                            )}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.shortcut && (
                        <kbd
                          className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0",
                            theme === "glassy"
                              ? "bg-white/10 text-white/50"
                              : "bg-gray-100 text-gray-500",
                          )}
                        >
                          {item.shortcut}
                        </kbd>
                      )}
                    </button>
                  ))}
                </div>
              ))}
              {filtered.length === 0 && (
                <div
                  className={cn(
                    "px-4 py-8 text-center text-sm",
                    theme === "glassy" ? "text-white/40" : "text-gray-400",
                  )}
                >
                  No results for "{query}"
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── 4. KANBAN BOARD ──────────────────────────────────────────────────────────

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  priority?: "low" | "medium" | "high";
  assignee?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  cards: KanbanCard[];
}

interface KanbanBoardProps {
  initialColumns?: KanbanColumn[];
  animated?: boolean;
  className?: string;
}

const defaultKanbanData: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    color: "#94a3b8",
    cards: [
      {
        id: "1",
        title: "Design new landing page",
        description: "Create wireframes and mockups",
        tags: ["Design"],
        priority: "high",
      },
      { id: "2", title: "Set up CI/CD pipeline", tags: ["DevOps"], priority: "medium" },
      { id: "3", title: "Write API documentation", tags: ["Docs"], priority: "low" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "#f59e0b",
    cards: [
      {
        id: "4",
        title: "Implement auth flow",
        description: "OAuth + JWT tokens",
        tags: ["Backend", "Auth"],
        priority: "high",
        assignee: "AC",
      },
      {
        id: "5",
        title: "Fix mobile navigation",
        tags: ["Frontend"],
        priority: "medium",
        assignee: "BK",
      },
    ],
  },
  {
    id: "review",
    title: "In Review",
    color: "#6366f1",
    cards: [
      {
        id: "6",
        title: "Performance audit",
        description: "Lighthouse score optimization",
        tags: ["Performance"],
        priority: "medium",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "#10b981",
    cards: [
      {
        id: "7",
        title: "Database schema design",
        tags: ["Backend"],
        priority: "high",
        assignee: "AC",
      },
      { id: "8", title: "Component library setup", tags: ["Frontend"], priority: "medium" },
    ],
  },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  initialColumns = defaultKanbanData,
  animated = true,
  className,
}) => {
  const { theme, cardClass, textPrimary, textMuted } = useThemeClasses();
  const [columns, setColumns] = useState(initialColumns);
  const [dragging, setDragging] = useState<{ cardId: string; fromCol: string } | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const preset = animationPresets[theme];

  const moveCard = (cardId: string, fromCol: string, toCol: string) => {
    if (fromCol === toCol) return;
    setColumns((cols) => {
      const card = cols.find((c) => c.id === fromCol)?.cards.find((c) => c.id === cardId);
      if (!card) return cols;
      return cols.map((col) => {
        if (col.id === fromCol) return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        if (col.id === toCol) return { ...col, cards: [...col.cards, card] };
        return col;
      });
    });
  };

  const priorityColors = {
    high: "bg-rose-500/15 text-rose-600",
    medium: "bg-amber-500/15 text-amber-600",
    low: "bg-emerald-500/15 text-emerald-600",
  };

  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4 -mx-1 px-1", className)}>
      {columns.map((col) => (
        <div
          key={col.id}
          className={cn(
            "flex-shrink-0 w-[280px] sm:w-72 flex flex-col gap-3",
            dragOver === col.id && "opacity-90",
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(col.id);
          }}
          onDrop={() => {
            if (dragging) {
              moveCard(dragging.cardId, dragging.fromCol, col.id);
              setDragging(null);
              setDragOver(null);
            }
          }}
          onDragLeave={() => setDragOver(null)}
        >
          {/* Column header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: col.color }} />
              <span className={cn("text-sm font-bold", textPrimary)}>{col.title}</span>
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full font-bold bg-[var(--muted)] text-[var(--muted-foreground)]",
                )}
              >
                {col.cards.length}
              </span>
            </div>
          </div>

          {/* Cards */}
          <div
            className={cn(
              "min-h-[200px] rounded-xl p-2 space-y-2 transition-colors",
              dragOver === col.id
                ? "bg-[var(--primary)]/5 border-2 border-dashed border-[var(--primary)]/30"
                : "bg-[var(--muted)]/30",
            )}
          >
            <AnimatePresence>
              {col.cards.map((card) => (
                <motion.div
                  key={card.id}
                  draggable
                  onDragStart={() => setDragging({ cardId: card.id, fromCol: col.id })}
                  onDragEnd={() => {
                    setDragging(null);
                    setDragOver(null);
                  }}
                  layout
                  initial={animated ? { opacity: 0, y: 8 } : {}}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={preset.enter.transition}
                  whileHover={animated ? preset.hover : {}}
                  className={cn(
                    cardClass,
                    "p-3.5 cursor-grab active:cursor-grabbing select-none",
                    dragging?.cardId === card.id && "opacity-40 scale-95",
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className={cn("text-sm font-medium leading-snug", textPrimary)}>
                      {card.title}
                    </p>
                    <GripVertical className="w-3.5 h-3.5 text-[var(--muted-foreground)] shrink-0 mt-0.5" />
                  </div>
                  {card.description && (
                    <p className={cn("text-xs mb-2", textMuted)}>{card.description}</p>
                  )}
                  <div className="flex items-center justify-between flex-wrap gap-1.5 mt-2">
                    <div className="flex flex-wrap gap-1">
                      {card.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {card.priority && (
                        <span
                          className={cn(
                            "text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full",
                            priorityColors[card.priority],
                          )}
                        >
                          {card.priority}
                        </span>
                      )}
                      {card.assignee && (
                        <div className="w-5 h-5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[9px] font-black flex items-center justify-center">
                          {card.assignee}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── 5. TIMELINE ─────────────────────────────────────────────────────────────

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  icon?: React.ElementType;
  status?: "completed" | "current" | "pending";
  color?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  animated?: boolean;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ events, animated = true, className }) => {
  const { theme, textPrimary, textMuted } = useThemeClasses();
  const preset = animationPresets[theme];

  const statusColors = {
    completed: "bg-emerald-500 border-emerald-500",
    current: "bg-[var(--primary)] border-[var(--primary)]",
    pending: "bg-[var(--muted)] border-[var(--border)]",
  };

  return (
    <div className={cn("relative space-y-0", className)}>
      {/* Vertical line */}
      <div className="absolute left-[18px] top-0 bottom-0 w-px bg-[var(--border)]" />

      {events.map((event, i) => {
        const Icon = event.icon;
        const color = statusColors[event.status || "pending"];

        return (
          <motion.div
            key={event.id}
            initial={animated ? { opacity: 0, x: -16 } : {}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...preset.enter.transition, delay: animated ? i * 0.08 : 0 }}
            className="flex gap-4 pb-8 last:pb-0"
          >
            <div
              className={cn(
                "relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                color,
              )}
            >
              {Icon ? (
                <Icon className="w-4 h-4 text-white" />
              ) : event.status === "completed" ? (
                <Check className="w-3.5 h-3.5 text-white" />
              ) : event.status === "current" ? (
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-[var(--muted-foreground)]" />
              )}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className={cn("text-sm font-bold", textPrimary)}>{event.title}</p>
                <time className={cn("text-xs font-medium", textMuted)}>{event.date}</time>
              </div>
              {event.description && (
                <p className={cn("text-xs mt-1 leading-relaxed", textMuted)}>{event.description}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// ─── 6. FILE UPLOADER ────────────────────────────────────────────────────────

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "uploading" | "done" | "error";
}

export const FileUploader: React.FC<{
  onUpload?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  animated?: boolean;
  className?: string;
}> = ({ onUpload, accept = "*", multiple = true, maxSizeMB = 10, animated = true, className }) => {
  const { cardClass, theme, textPrimary, textMuted } = useThemeClasses();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const preset = animationPresets[theme];

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: f.size,
      type: f.type,
      progress: 0,
      status: "uploading",
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    onUpload?.(Array.from(fileList));

    // Simulate upload progress
    newFiles.forEach((nf) => {
      let prog = 0;
      const interval = setInterval(() => {
        prog += Math.random() * 20;
        if (prog >= 100) {
          prog = 100;
          clearInterval(interval);
          setFiles((f) =>
            f.map((fi) => (fi.id === nf.id ? { ...fi, progress: 100, status: "done" } : fi)),
          );
        } else {
          setFiles((f) => f.map((fi) => (fi.id === nf.id ? { ...fi, progress: prog } : fi)));
        }
      }, 200);
    });
  };

  const fileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const formatSize = (bytes: number) =>
    bytes > 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${(bytes / 1e3).toFixed(0)} KB`;

  return (
    <div className={cn("space-y-4", className)}>
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        whileHover={animated ? { scale: 1.01 } : {}}
        animate={dragging ? { scale: 1.02 } : { scale: 1 }}
        transition={preset.enter.transition}
        className={cn(
          "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 cursor-pointer transition-colors",
          dragging
            ? "border-[var(--primary)] bg-[var(--primary)]/5"
            : theme === "glassy"
              ? "border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/8"
              : "border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--muted)]/40",
        )}
      >
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center",
            "bg-[var(--primary)]/10 text-[var(--primary)]",
          )}
        >
          <Upload className="w-6 h-6" />
        </div>
        <div className="text-center">
          <p className={cn("text-sm font-bold", textPrimary)}>Drop files here or click to browse</p>
          <p className={cn("text-xs mt-1", textMuted)}>
            Max {maxSizeMB}MB per file • {accept === "*" ? "All types" : accept}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </motion.div>

      <AnimatePresence>
        {files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={preset.enter.transition}
            className={cn(cardClass, "p-4")}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                  file.status === "done"
                    ? "bg-emerald-500/10 text-emerald-600"
                    : file.status === "error"
                      ? "bg-rose-500/10 text-rose-600"
                      : "bg-[var(--primary)]/10 text-[var(--primary)]",
                )}
              >
                {file.status === "done" ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : file.status === "error" ? (
                  <XCircle className="w-4 h-4" />
                ) : (
                  fileIcon(file.type)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className={cn("text-sm font-medium truncate", textPrimary)}>{file.name}</p>
                  <button
                    onClick={() => setFiles((f) => f.filter((fi) => fi.id !== file.id))}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors ml-2"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-[var(--muted)] rounded-full overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        file.status === "done"
                          ? "bg-emerald-500"
                          : file.status === "error"
                            ? "bg-rose-500"
                            : "bg-[var(--primary)]",
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${file.progress}%` }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                  </div>
                  <span className={cn("text-[10px] font-bold shrink-0", textMuted)}>
                    {formatSize(file.size)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// ─── 7. NOTIFICATION FEED ────────────────────────────────────────────────────

interface Notification {
  id: string;
  title: string;
  description?: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error" | "message";
  avatar?: string;
  avatarFallback?: string;
  action?: { label: string; onClick: () => void };
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    title: "New comment on your post",
    description: "Sarah left a comment: 'Great work!'",
    time: "2m ago",
    read: false,
    type: "message",
    avatarFallback: "SA",
  },
  {
    id: "2",
    title: "Deployment successful",
    description: "v2.1.4 deployed to production",
    time: "15m ago",
    read: false,
    type: "success",
  },
  {
    id: "3",
    title: "Storage limit warning",
    description: "You've used 85% of your storage quota",
    time: "1h ago",
    read: false,
    type: "warning",
  },
  {
    id: "4",
    title: "New team member joined",
    description: "Alex joined your workspace",
    time: "3h ago",
    read: true,
    type: "info",
    avatarFallback: "AX",
  },
  {
    id: "5",
    title: "Payment failed",
    description: "Your subscription renewal failed",
    time: "Yesterday",
    read: true,
    type: "error",
  },
];

export const NotificationFeed: React.FC<{
  notifications?: Notification[];
  animated?: boolean;
  className?: string;
}> = ({ notifications: initialNotifs = defaultNotifications, animated = true, className }) => {
  const { cardClass, theme, textPrimary, textMuted } = useThemeClasses();
  const [notifs, setNotifs] = useState(initialNotifs);
  const preset = animationPresets[theme];
  const unread = notifs.filter((n) => !n.read).length;

  const typeConfig = {
    info: { icon: Info, bg: "bg-blue-500/10", color: "text-blue-500" },
    success: { icon: CheckCircle2, bg: "bg-emerald-500/10", color: "text-emerald-500" },
    warning: { icon: AlertTriangle, bg: "bg-amber-500/10", color: "text-amber-500" },
    error: { icon: XCircle, bg: "bg-rose-500/10", color: "text-rose-500" },
    message: { icon: User, bg: "bg-[var(--primary)]/10", color: "text-[var(--primary)]" },
  };

  const markAllRead = () => setNotifs((n) => n.map((nn) => ({ ...nn, read: true })));
  const dismiss = (id: string) => setNotifs((n) => n.filter((nn) => nn.id !== id));

  return (
    <div className={cn(cardClass, "overflow-hidden", className)}>
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className={cn("w-4 h-4", textPrimary)} />
          <span className={cn("font-bold text-sm", textPrimary)}>Notifications</span>
          {unread > 0 && (
            <span className="w-5 h-5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-black flex items-center justify-center">
              {unread}
            </span>
          )}
        </div>
        <button
          onClick={markAllRead}
          className={cn(
            "text-xs font-bold hover:text-[var(--foreground)] transition-colors",
            textMuted,
          )}
        >
          Mark all read
        </button>
      </div>

      <div className="divide-y divide-[var(--border)]">
        <AnimatePresence initial={false}>
          {notifs.map((notif, i) => {
            const config = typeConfig[notif.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={notif.id}
                initial={animated ? { opacity: 0, x: -16, height: 0 } : {}}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 16, height: 0 }}
                transition={{ ...preset.enter.transition, delay: animated ? i * 0.05 : 0 }}
                className={cn(
                  "p-4 flex items-start gap-3 transition-colors",
                  !notif.read && "bg-[var(--primary)]/3",
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                    config.bg,
                  )}
                >
                  {notif.avatarFallback ? (
                    <span className={cn("text-xs font-black", config.color)}>
                      {notif.avatarFallback}
                    </span>
                  ) : (
                    <Icon className={cn("w-4 h-4", config.color)} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm font-semibold leading-snug", textPrimary)}>
                      {notif.title}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {!notif.read && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                      )}
                      <button
                        onClick={() => dismiss(notif.id)}
                        className={cn(
                          "opacity-0 group-hover:opacity-100 transition-opacity",
                          textMuted,
                        )}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  {notif.description && (
                    <p className={cn("text-xs mt-0.5 leading-relaxed", textMuted)}>
                      {notif.description}
                    </p>
                  )}
                  <p className={cn("text-[10px] mt-1.5 font-medium", textMuted)}>{notif.time}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {notifs.length === 0 && (
          <div className="p-12 text-center">
            <BellOff className="w-8 h-8 text-[var(--muted-foreground)] mx-auto mb-3" />
            <p className={cn("text-sm font-medium", textMuted)}>All caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── 8. MULTI-STEP FORM ───────────────────────────────────────────────────────

export interface MultiStepFormRenderContext {
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  currentStep: number;
  totalSteps: number;
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: React.ReactNode | ((context: MultiStepFormRenderContext) => React.ReactNode);
  validate?: (data: Record<string, unknown>) => boolean | string;
}

export interface MultiStepFormProps {
  steps: FormStep[];
  value?: Record<string, unknown>;
  initialData?: Record<string, unknown>;
  onChange?: (data: Record<string, unknown>) => void;
  currentStep?: number;
  initialStep?: number;
  onStepChange?: (stepIndex: number) => void;
  allowStepNavigation?: boolean;
  backLabel?: string;
  nextLabel?: string;
  completeLabel?: string;
  completeDisabled?: boolean;
  onBack?: (stepIndex: number, data: Record<string, unknown>) => void;
  onComplete?: (data: Record<string, unknown>) => void;
  animated?: boolean;
  className?: string;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  value,
  initialData = {},
  onChange,
  currentStep,
  initialStep = 0,
  onStepChange,
  allowStepNavigation = true,
  backLabel = "Back",
  nextLabel = "Next",
  completeLabel = "Complete",
  completeDisabled = false,
  onBack,
  onComplete,
  animated = true,
  className,
}) => {
  const { cardClass, theme, buttonPrimary, textPrimary, textMuted } = useThemeClasses();
  const safeInitialStep = Math.min(Math.max(initialStep, 0), Math.max(steps.length - 1, 0));
  const [internalCurrent, setInternalCurrent] = useState(safeInitialStep);
  const [internalData, setInternalData] = useState<Record<string, unknown>>(initialData);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const preset = animationPresets[theme];

  const data = value ?? internalData;
  const current = currentStep ?? internalCurrent;

  const setData = useCallback(
    (update: React.SetStateAction<Record<string, unknown>>) => {
      if (value !== undefined) {
        const nextData =
          typeof update === "function"
            ? (update as (prev: Record<string, unknown>) => Record<string, unknown>)(value)
            : update;
        onChange?.(nextData);
        return;
      }

      setInternalData((prev) => {
        const nextData =
          typeof update === "function"
            ? (update as (prev: Record<string, unknown>) => Record<string, unknown>)(prev)
            : update;
        onChange?.(nextData);
        return nextData;
      });
    },
    [onChange, value],
  );

  const goTo = useCallback(
    (idx: number) => {
      if (steps.length === 0) return;

      const clamped = Math.min(Math.max(idx, 0), steps.length - 1);
      if (clamped === current) return;

      setDirection(clamped > current ? 1 : -1);
      setValidationError(null);

      if (currentStep === undefined) {
        setInternalCurrent(clamped);
      }
      onStepChange?.(clamped);
    },
    [current, currentStep, onStepChange, steps.length],
  );

  if (steps.length === 0) {
    return (
      <div className={cn(cardClass, "p-6", className)}>
        <p className={cn("text-sm", textMuted)}>No steps were provided to `MultiStepForm`.</p>
      </div>
    );
  }

  const step = steps[current]!;
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  const handleNext = () => {
    const result = step.validate?.(data);
    if (result === false) {
      setValidationError("Please complete this step before continuing.");
      return;
    }
    if (typeof result === "string" && result.trim().length > 0) {
      setValidationError(result);
      return;
    }

    setValidationError(null);
    if (isLast) {
      onComplete?.(data);
      return;
    }
    goTo(current + 1);
  };

  const renderedFields =
    typeof step.fields === "function"
      ? step.fields({
          data,
          setData,
          currentStep: current,
          totalSteps: steps.length,
        })
      : step.fields;

  return (
    <div className={cn(cardClass, "overflow-hidden", className)}>
      {/* Progress header */}
      <div className="p-6 border-b border-[var(--border)]">
        <div className="flex items-center justify-between mb-4">
          <p className={cn("text-xs font-black uppercase tracking-widest", textMuted)}>
            Step {current + 1} of {steps.length}
          </p>
          <div className="flex gap-1.5">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  if (!allowStepNavigation) return;
                  goTo(i);
                }}
                disabled={!allowStepNavigation}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  !allowStepNavigation && "cursor-not-allowed",
                  i === current
                    ? "bg-[var(--primary)] w-6"
                    : i < current
                      ? "bg-[var(--primary)]/40 w-3"
                      : "bg-[var(--muted)] w-3",
                )}
              />
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`header-${current}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={preset.enter.transition}
          >
            <h3 className={cn("font-bold text-lg", textPrimary)}>{step.title}</h3>
            {step.description && (
              <p className={cn("text-sm mt-0.5", textMuted)}>{step.description}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fields */}
      <div className="p-6 min-h-[240px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`fields-${current}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={preset.enter.transition}
          >
            {renderedFields}
          </motion.div>
        </AnimatePresence>
        {validationError && (
          <p className="mt-3 text-sm font-medium text-rose-500">{validationError}</p>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 pt-0 flex justify-between gap-3">
        <button
          onClick={() => {
            goTo(current - 1);
            onBack?.(Math.max(current - 1, 0), data);
          }}
          disabled={isFirst}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30",
            theme === "glassy"
              ? "bg-white/10 text-white border border-white/20 hover:bg-white/15"
              : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
          )}
        >
          <ArrowLeft className="w-4 h-4 inline mr-1" /> {backLabel}
        </button>
        <button
          onClick={handleNext}
          disabled={isLast && completeDisabled}
          className={cn("px-6 py-2 rounded-lg text-sm font-bold transition-all", buttonPrimary)}
        >
          {isLast ? (
            <>
              <Check className="w-4 h-4 inline mr-1" /> {completeLabel}
            </>
          ) : (
            <>
              {nextLabel} <ArrowRight className="w-4 h-4 inline ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ─── 9. CALENDAR WIDGET ───────────────────────────────────────────────────────

interface CalendarEvent {
  date: string; // YYYY-MM-DD
  title: string;
  color?: string;
}

export const CalendarWidget: React.FC<{
  events?: CalendarEvent[];
  animated?: boolean;
  className?: string;
}> = ({ events = [], animated = true, className }) => {
  const { cardClass, theme, textPrimary, textMuted } = useThemeClasses();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const preset = animationPresets[theme];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date().toISOString().slice(0, 10);

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDateEvents = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + dir, 1));
  };

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -30 : 30 }),
  };

  return (
    <div className={cn(cardClass, "p-5", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.p
            key={monthName}
            custom={direction}
            variants={monthVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={preset.enter.transition}
            className={cn("text-sm font-bold", textPrimary)}
          >
            {monthName}
          </motion.p>
        </AnimatePresence>
        <button
          onClick={() => navigate(1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((d) => (
          <div
            key={d}
            className={cn(
              "h-7 flex items-center justify-center text-[10px] font-black uppercase tracking-wider",
              textMuted,
            )}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${year}-${month}`}
          custom={direction}
          variants={monthVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={preset.enter.transition}
          className="grid grid-cols-7 gap-1"
        >
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dayEvents = getDateEvents(day);
            const isToday = dateStr === today;
            const isSelected = dateStr === selectedDate;

            return (
              <motion.button
                key={day}
                onClick={() => setSelectedDate(dateStr === selectedDate ? null : dateStr)}
                whileHover={animated ? { scale: 1.1 } : {}}
                whileTap={animated ? { scale: 0.95 } : {}}
                className={cn(
                  "relative h-9 flex flex-col items-center justify-center rounded-lg text-sm transition-colors",
                  isSelected
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : isToday
                      ? "ring-2 ring-[var(--primary)] text-[var(--primary)] font-bold"
                      : "text-[var(--foreground)] hover:bg-[var(--muted)]",
                )}
              >
                <span>{day}</span>
                {dayEvents.length > 0 && (
                  <div className="flex gap-0.5 absolute bottom-1">
                    {dayEvents.slice(0, 3).map((e, j) => (
                      <div
                        key={j}
                        className="w-1 h-1 rounded-full"
                        style={{ background: e.color || "var(--primary)" }}
                      />
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Selected day events */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={preset.enter.transition}
          className="mt-4 pt-4 border-t border-[var(--border)] space-y-2"
        >
          <p className={cn("text-xs font-black uppercase tracking-widest", textMuted)}>
            {selectedDate}
          </p>
          {events
            .filter((e) => e.date === selectedDate)
            .map((e, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: e.color || "var(--primary)" }}
                />
                <p className={cn("text-xs", textPrimary)}>{e.title}</p>
              </div>
            ))}
          {events.filter((e) => e.date === selectedDate).length === 0 && (
            <p className={cn("text-xs", textMuted)}>No events</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

// ─── 10. MEDIA GALLERY ────────────────────────────────────────────────────────

interface MediaItem {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  tags?: string[];
}

export const MediaGallery: React.FC<{
  items: MediaItem[];
  animated?: boolean;
  className?: string;
}> = ({ items, animated = true, className }) => {
  const { cardClass, theme, textPrimary, textMuted } = useThemeClasses();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const preset = animationPresets[theme];

  const allTags = Array.from(new Set(items.flatMap((i) => i.tags || [])));
  const filtered = filter ? items.filter((i) => i.tags?.includes(filter)) : items;

  const navigate = (dir: number) => {
    if (lightbox === null) return;
    const newIdx = (lightbox + dir + filtered.length) % filtered.length;
    setLightbox(newIdx);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-bold transition-all",
              !filter
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
            )}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag === filter ? null : tag)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-all",
                filter === tag
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <AnimatePresence>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={animated ? preset.scaleIn.initial : {}}
              animate={preset.scaleIn.animate}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ ...preset.scaleIn.transition, delay: animated ? i * 0.04 : 0 }}
              whileHover={animated ? { scale: 1.03, zIndex: 10 } : {}}
              onClick={() => setLightbox(i)}
              className={cn(
                "relative aspect-square overflow-hidden cursor-pointer group",
                theme === "minimalist"
                  ? "rounded-none"
                  : theme === "liquid"
                    ? "rounded-2xl"
                    : "rounded-xl",
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <motion.img
              key={lightbox}
              src={filtered[lightbox]!.src}
              alt={filtered[lightbox]!.alt}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={preset.scaleIn.transition}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(i);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === lightbox ? "bg-white w-4" : "bg-white/40 w-1.5",
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Workshop Showcase ────────────────────────────────────────────────────────
// Demo data and full showcase component for all 10 composites

const sampleTableData = Array.from({ length: 42 }, (_, i) => ({
  id: `USR-${String(i + 1).padStart(3, "0")}`,
  name: ["Alice Johnson", "Bob Martinez", "Carol White", "David Lee", "Eva Brown", "Frank Davis"][
    i % 6
  ],
  email: `user${i + 1}@example.com`,
  role: ["Admin", "Developer", "Designer", "Manager", "Analyst"][i % 5],
  status: ["Active", "Inactive", "Pending"][i % 3],
  joined: `202${Math.floor(i / 14) + 3}-${String((i % 12) + 1).padStart(2, "0")}-01`,
  score: Math.floor(Math.random() * 100),
}));

const chartLineData = [
  { name: "Jan", revenue: 4200, users: 1800, sessions: 3200 },
  { name: "Feb", revenue: 5800, users: 2100, sessions: 4100 },
  { name: "Mar", revenue: 5200, users: 2400, sessions: 3900 },
  { name: "Apr", revenue: 7100, users: 2800, sessions: 5600 },
  { name: "May", revenue: 6800, users: 3100, sessions: 5200 },
  { name: "Jun", revenue: 8900, users: 3800, sessions: 6900 },
  { name: "Jul", revenue: 9400, users: 4100, sessions: 7400 },
];

const chartPieData = [
  { name: "Chrome", value: 45 },
  { name: "Firefox", value: 22 },
  { name: "Safari", value: 18 },
  { name: "Edge", value: 10 },
  { name: "Other", value: 5 },
];

const chartRadarData = [
  { name: "Speed", A: 90, B: 65 },
  { name: "Quality", A: 78, B: 88 },
  { name: "UX", A: 85, B: 72 },
  { name: "DX", A: 92, B: 60 },
  { name: "Bundle", A: 70, B: 80 },
  { name: "A11y", A: 88, B: 75 },
];

const sampleTimelineEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Project Kickoff",
    description: "Team assembled, goals defined",
    date: "Jan 15, 2026",
    icon: CheckCircle2,
    status: "completed",
  },
  {
    id: "2",
    title: "Design Phase Complete",
    description: "All wireframes and mockups approved",
    date: "Feb 3, 2026",
    icon: CheckCircle2,
    status: "completed",
  },
  {
    id: "3",
    title: "Alpha Release",
    description: "Internal testing began",
    date: "Feb 28, 2026",
    icon: Clock,
    status: "completed",
  },
  {
    id: "4",
    title: "Beta Launch",
    description: "Public beta with 500 testers",
    date: "Mar 3, 2026",
    icon: User,
    status: "current",
  },
  {
    id: "5",
    title: "v1.0 GA Release",
    description: "General availability",
    date: "Mar 31, 2026",
    status: "pending",
  },
];

const sampleCalendarEvents: CalendarEvent[] = [
  { date: "2026-03-03", title: "Beta Launch", color: "#7c3aed" },
  { date: "2026-03-10", title: "Team Meeting", color: "#10b981" },
  { date: "2026-03-15", title: "Design Review", color: "#f59e0b" },
  { date: "2026-03-20", title: "Sprint Demo", color: "#6366f1" },
  { date: "2026-03-25", title: "Stakeholder Review", color: "#ec4899" },
  { date: "2026-03-31", title: "v1.0 Release", color: "#ef4444" },
];

const sampleCommandItems: CommandItem[] = [
  {
    id: "1",
    label: "Open Dashboard",
    description: "View your analytics dashboard",
    icon: Settings,
    group: "Navigation",
    shortcut: "⌘D",
  },
  {
    id: "2",
    label: "New Project",
    description: "Create a new workspace",
    icon: Plus,
    group: "Actions",
    shortcut: "⌘N",
  },
  {
    id: "3",
    label: "Search Files",
    description: "Find files across your workspace",
    icon: Search,
    group: "Actions",
    shortcut: "⌘F",
  },
  {
    id: "4",
    label: "Invite Team Member",
    description: "Send an invitation link",
    icon: User,
    group: "Team",
  },
  {
    id: "5",
    label: "Export Data",
    description: "Download your data as CSV",
    icon: Download,
    group: "Actions",
  },
  {
    id: "6",
    label: "Theme Settings",
    description: "Customize your theme",
    icon: Settings,
    group: "Settings",
    shortcut: "⌘,",
  },
];

export const CompositesShowcase: React.FC = () => {
  const { textPrimary, textMuted, cardClass, theme } = useThemeClasses();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [completedForm, setCompletedForm] = useState(false);

  const [galleryItems] = useState<MediaItem[]>([
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
      alt: "Abstract 1",
      tags: ["Abstract", "Art"],
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      alt: "Architecture",
      tags: ["Architecture", "Design"],
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1524055988636-436cfa46e59e?w=400&h=400&fit=crop",
      alt: "Gradient",
      tags: ["Abstract", "Colors"],
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop",
      alt: "Blur",
      tags: ["Abstract"],
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400&h=400&fit=crop",
      alt: "Neon",
      tags: ["Art", "Colors"],
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop",
      alt: "Tech",
      tags: ["Design", "Technology"],
    },
    {
      id: "7",
      src: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop",
      alt: "Space",
      tags: ["Abstract", "Colors"],
    },
    {
      id: "8",
      src: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=400&h=400&fit=crop",
      alt: "Minimal",
      tags: ["Architecture", "Design"],
    },
  ]);

  const formSteps: FormStep[] = [
    {
      id: "account",
      title: "Account Details",
      description: "Set up your basic account information",
      fields: (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              Full Name
            </label>
            <input
              className="w-full h-10 px-3 rounded-lg border border-[var(--border)] bg-[var(--muted)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              Email
            </label>
            <input
              type="email"
              className="w-full h-10 px-3 rounded-lg border border-[var(--border)] bg-[var(--muted)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              placeholder="john@example.com"
            />
          </div>
        </div>
      ),
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Customize your experience",
      fields: (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              Theme
            </label>
            {["Light", "Dark", "System"].map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] cursor-pointer hover:bg-[var(--muted)] transition-colors"
              >
                <input type="radio" name="theme" value={opt} className="accent-[var(--primary)]" />
                <span className="text-sm text-[var(--foreground)]">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "confirm",
      title: "Confirm Setup",
      description: "Review your settings before finishing",
      fields: (
        <div className="space-y-3">
          {[
            ["Name", "John Doe"],
            ["Email", "john@example.com"],
            ["Theme", "Light"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)]/50"
            >
              <span className="text-xs text-[var(--muted-foreground)] font-bold uppercase tracking-wider">
                {k}
              </span>
              <span className="text-sm text-[var(--foreground)] font-medium">{v}</span>
            </div>
          ))}
          {completedForm && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-bold">Setup complete!</span>
            </div>
          )}
        </div>
      ),
    },
  ];

  const tableColumns = [
    { key: "id" as const, label: "ID", sortable: true, width: "w-24" },
    { key: "name" as const, label: "Name", sortable: true, filterable: true },
    {
      key: "role" as const,
      label: "Role",
      sortable: true,
      filterable: true,
      render: (v: string | number | undefined) => (
        <span
          className={cn(
            "text-xs font-bold px-2 py-0.5 rounded-full",
            v === "Admin"
              ? "bg-purple-500/10 text-purple-600"
              : "bg-[var(--muted)] text-[var(--muted-foreground)]",
          )}
        >
          {v}
        </span>
      ),
    },
    {
      key: "status" as const,
      label: "Status",
      sortable: true,
      filterable: true,
      render: (v: string | number | undefined) => (
        <span
          className={cn(
            "text-xs font-bold px-2 py-0.5 rounded-full",
            v === "Active"
              ? "bg-emerald-500/10 text-emerald-600"
              : v === "Pending"
                ? "bg-amber-500/10 text-amber-600"
                : "bg-rose-500/10 text-rose-600",
          )}
        >
          {v}
        </span>
      ),
    },
    { key: "joined" as const, label: "Joined", sortable: true, hideOnMobile: true },
  ];

  return (
    <div className="space-y-16 pb-20">
      <CommandPalette items={sampleCommandItems} open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* 1. Data Table */}
      <section className="space-y-4">
        <div>
          <h3 className={cn("text-xl font-black tracking-tight", textPrimary)}>Data Table</h3>
          <p className={cn("text-sm", textMuted)}>
            Full-featured with search, multi-column filtering, sort, and pagination
          </p>
        </div>
        <DataTable
          data={sampleTableData}
          columns={tableColumns}
          title="Users"
          searchable
          pageSize={6}
          animated
        />
      </section>

      {/* 2. Charts */}
      <section className="space-y-4">
        <div>
          <h3 className={cn("text-xl font-black tracking-tight", textPrimary)}>Charts</h3>
          <p className={cn("text-sm", textMuted)}>
            7 chart types, all styled with your active theme palette
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <ThemeChart
            type="line"
            data={chartLineData}
            title="Revenue & Users (Line)"
            series={[
              { key: "revenue", label: "Revenue" },
              { key: "users", label: "Users" },
            ]}
            showLegend
            animated
          />
          <ThemeChart
            type="bar"
            data={chartLineData}
            title="Sessions (Bar)"
            series={[{ key: "sessions", label: "Sessions" }]}
            animated
          />
          <ThemeChart
            type="area"
            data={chartLineData}
            title="Revenue Trend (Area)"
            series={[
              { key: "revenue", label: "Revenue" },
              { key: "sessions", label: "Sessions" },
            ]}
            showLegend
            animated
          />
          <ThemeChart
            type="pie"
            data={chartPieData}
            title="Browser Share (Pie)"
            series={[{ key: "value", label: "Share" }]}
            showLegend
            animated
            height={280}
          />
          <ThemeChart
            type="donut"
            data={chartPieData}
            title="Browser Share (Donut)"
            series={[{ key: "value", label: "Share" }]}
            showLegend
            animated
            height={280}
          />
          <ThemeChart
            type="radar"
            data={chartRadarData}
            title="Framework Comparison (Radar)"
            series={[
              { key: "A", label: "Chameleon" },
              { key: "B", label: "Competitor" },
            ]}
            showLegend
            animated
          />
        </div>
      </section>

      {/* 3. Command Palette */}
      <section className="space-y-4">
        <div>
          <h3 className={cn("text-xl font-black tracking-tight", textPrimary)}>Command Palette</h3>
          <p className={cn("text-sm", textMuted)}>
            Keyboard-driven command menu with search and grouped actions
          </p>
        </div>
        <div className={cn(cardClass, "p-8 flex flex-col items-center gap-4")}>
          <p className={cn("text-sm", textMuted)}>Press the button to open the command palette</p>
          <Button onClick={() => setCmdOpen(true)} animated>
            <Search className="w-4 h-4 mr-2" /> Open Command Palette
            <kbd className="ml-2 text-[10px] opacity-60 border border-current rounded px-1">⌘K</kbd>
          </Button>
        </div>
      </section>

      {/* 4. Kanban Board */}
      <section className="space-y-4">
        <div>
          <h3 className={cn("text-xl font-black tracking-tight", textPrimary)}>Kanban Board</h3>
          <p className={cn("text-sm", textMuted)}>
            Drag & drop cards between columns with priority and assignee support
          </p>
        </div>
        <KanbanBoard animated />
      </section>

      {/* 5 + 9: Timeline + Calendar side by side */}
      <section className="space-y-4">
        <div>
          <h3 className={cn("text-xl font-black tracking-tight", textPrimary)}>
            Timeline & Calendar
          </h3>
          <p className={cn("text-sm", textMuted)}>
            Event tracking with date navigation and event markers
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className={cn(cardClass, "p-6")}>
            <p className={cn("text-xs font-black uppercase tracking-widest mb-5", textMuted)}>
              Project Timeline
            </p>
            <Timeline events={sampleTimelineEvents} animated />
          </div>
          <CalendarWidget events={sampleCalendarEvents} animated />
        </div>
      </section>

      {/* 6. File Uploader */}
      <section className="space-y-4">
        <div>
          <h3 className={cn("text-xl font-black tracking-tight", textPrimary)}>File Uploader</h3>
          <p className={cn("text-sm", textMuted)}>
            Drag & drop with progress tracking and file type validation
          </p>
        </div>
        <div className="max-w-xl">
          <FileUploader multiple accept=".pdf,.png,.jpg,.doc" maxSizeMB={25} animated />
        </div>
      </section>

      {/* 7. Notification Feed */}
      <section className="space-y-4">
        <div>
          <h3 className={cn("text-xl font-black tracking-tight", textPrimary)}>
            Notification Feed
          </h3>
          <p className={cn("text-sm", textMuted)}>
            Stacked notifications with dismiss, mark-all-read, and type badges
          </p>
        </div>
        <div className="max-w-lg">
          <NotificationFeed animated />
        </div>
      </section>

      {/* 8. Multi-Step Form */}
      <section className="space-y-4">
        <div>
          <h3 className={cn("text-xl font-black tracking-tight", textPrimary)}>Multi-Step Form</h3>
          <p className={cn("text-sm", textMuted)}>
            Wizard-style form with animated step transitions
          </p>
        </div>
        <div className="max-w-lg">
          <MultiStepForm steps={formSteps} onComplete={() => setCompletedForm(true)} animated />
        </div>
      </section>

      {/* 10. Media Gallery */}
      <section className="space-y-4">
        <div>
          <h3 className={cn("text-xl font-black tracking-tight", textPrimary)}>Media Gallery</h3>
          <p className={cn("text-sm", textMuted)}>
            Filterable grid with fullscreen lightbox and keyboard navigation
          </p>
        </div>
        <MediaGallery items={galleryItems} animated />
      </section>
    </div>
  );
};
