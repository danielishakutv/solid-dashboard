"use client";

import * as React from "react";
import { ArrowUpDown, ChevronDown, ChevronUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./field";
import { EmptyState } from "./misc";

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  className?: string;
  sortable?: boolean;
  /** value used for sorting & default rendering */
  accessor?: (row: T) => string | number;
  render?: (row: T) => React.ReactNode;
  hideOnMobile?: boolean;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  searchable = true,
  searchPlaceholder = "Search…",
  searchKeys,
  onRowClick,
  initialSort,
  pageSize,
  emptyMessage = "No records found",
  toolbar,
  dense,
}: {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  onRowClick?: (row: T) => void;
  initialSort?: { key: string; dir: "asc" | "desc" };
  pageSize?: number;
  emptyMessage?: string;
  toolbar?: React.ReactNode;
  dense?: boolean;
}) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState(initialSort ?? null);
  const [page, setPage] = React.useState(0);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) => {
      const keys = searchKeys ?? (Object.keys(row) as (keyof T)[]);
      return keys.some((k) => String(row[k] ?? "").toLowerCase().includes(q));
    });
  }, [data, query, searchKeys]);

  const sorted = React.useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return filtered;
    const getVal = (row: T) =>
      col.accessor ? col.accessor(row) : (row as Record<string, unknown>)[col.key];
    return [...filtered].sort((a, b) => {
      const av = getVal(a);
      const bv = getVal(b);
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number") {
        return sort.dir === "asc" ? av - bv : bv - av;
      }
      return sort.dir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [filtered, sort, columns]);

  const paged = React.useMemo(() => {
    if (!pageSize) return sorted;
    return sorted.slice(page * pageSize, page * pageSize + pageSize);
  }, [sorted, pageSize, page]);

  const totalPages = pageSize ? Math.ceil(sorted.length / pageSize) : 1;

  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (prev?.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  };

  return (
    <div className="flex flex-col">
      {(searchable || toolbar) && (
        <div className="flex flex-col gap-3 px-1 pb-4 sm:flex-row sm:items-center sm:justify-between">
          {searchable ? (
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(0);
                }}
                placeholder={searchPlaceholder}
                className="h-10 pl-9"
              />
            </div>
          ) : (
            <div />
          )}
          {toolbar && <div className="flex flex-wrap items-center gap-2">{toolbar}</div>}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2/60">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted-foreground",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                    col.hideOnMobile && "hidden md:table-cell",
                    col.sortable && "cursor-pointer select-none hover:text-foreground",
                    col.className,
                  )}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                >
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5",
                      col.align === "right" && "flex-row-reverse",
                    )}
                  >
                    {col.header}
                    {col.sortable &&
                      (sort?.key === col.key ? (
                        sort.dir === "asc" ? (
                          <ChevronUp className="h-3.5 w-3.5 text-primary" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 text-primary" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-40" />
                      ))}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row) => (
              <tr
                key={String(row.id)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  "border-b border-border/70 bg-surface transition-colors last:border-0",
                  onRowClick && "cursor-pointer hover:bg-surface-2/70",
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      dense ? "px-4 py-2.5" : "px-4 py-3.5",
                      "text-foreground",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                      col.hideOnMobile && "hidden md:table-cell",
                      col.className,
                    )}
                  >
                    {col.render
                      ? col.render(row)
                      : col.accessor
                        ? String(col.accessor(row))
                        : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {paged.length === 0 && (
          <EmptyState icon={<Search size={22} />} title={emptyMessage} description="Try adjusting your search or filters." />
        )}
      </div>

      {pageSize && totalPages > 1 && (
        <div className="flex items-center justify-between px-1 pt-4 text-sm">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)}
            </span>{" "}
            of <span className="font-semibold text-foreground">{sorted.length}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
