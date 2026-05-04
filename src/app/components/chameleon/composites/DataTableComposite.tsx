import React, { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils";
import { Button, Input, Badge } from "../atoms";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules";
import { useThemeClasses } from "../context";
import type { DataTableCompositeProps, TableColumn } from "./types";

type Row = Record<string, unknown>;

export const DataTableComposite = <T extends Row>({
  columns = [],
  data = [],
  sortable = true,
  filterable = true,
  paginated = true,
  pageSize = 10,
  heading,
  emptyMessage = "No data to display",
  className,
}: DataTableCompositeProps<T>) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);

  const typedColumns = columns as TableColumn<Row>[];
  const typedData = data as Row[];

  const filtered = useMemo(() => {
    if (!query) return typedData;
    const q = query.toLowerCase();
    return typedData.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [typedData, query]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = paginated ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const pageData = paginated ? sorted.slice(page * pageSize, (page + 1) * pageSize) : sorted;

  const handleSort = (key: string) => {
    if (!sortable) return;
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  return (
    <Card className={cn(className)}>
      {(heading || filterable) && (
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {heading && <CardTitle>{heading}</CardTitle>}
            {filterable && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                <Input
                  className="pl-9 w-48 sm:w-64"
                  placeholder="Filter…"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(0); }}
                />
              </div>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {typedColumns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable !== false && handleSort(col.key)}
                    className={cn(
                      "px-4 py-3 text-left font-semibold",
                      textMuted,
                      col.sortable !== false && sortable && "cursor-pointer hover:text-[var(--foreground)] select-none",
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {col.header}
                      {sortable && sortKey === col.key && (
                        sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={typedColumns.length} className={cn("px-4 py-10 text-center", textMuted)}>
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                pageData.map((row, i) => (
                  <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/30 transition-colors">
                    {typedColumns.map((col) => (
                      <td key={col.key} className={cn("px-4 py-3", textPrimary)}>
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {paginated && totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
            <span className={cn("text-xs", textMuted)}>
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
