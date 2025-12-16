'use client';

import { IconArrowUp, IconArrowUpRight } from '@tabler/icons-react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import * as React from 'react';

import { TokenIcon } from '@/components/atoms/token-icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatNumber } from '@/lib/utils';
import type { CoinData } from '@/types/dashboard';

interface MarketTableProps {
  coins: CoinData[];
}

export function MarketTable({ coins }: MarketTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filterValue, setFilterValue] = React.useState<string>('all');

  const columns: ColumnDef<CoinData>[] = [
    {
      accessorKey: 'name',
      header: 'Coin',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <TokenIcon symbol={row.original.symbol} icon={row.original.icon} size="sm" />
          <div className="flex flex-col">
            <span className="font-medium">{row.original.name}</span>
            <span className="text-xs text-muted-foreground">{row.original.symbol}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4"
          >
            Price
            <IconArrowUp className="ml-2 size-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <span className="font-medium tabular-nums">${formatNumber(row.getValue('price'))}</span>
      ),
    },
    {
      accessorKey: 'marketCap',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4"
          >
            Market Cap
            <IconArrowUp className="ml-2 size-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <span className="tabular-nums">${formatNumber(row.getValue('marketCap'))}</span>
      ),
    },
    {
      accessorKey: 'volume24h',
      header: 'Volume (24h)',
      cell: ({ row }) => (
        <span className="tabular-nums">${formatNumber(row.getValue('volume24h'))}</span>
      ),
    },
    {
      accessorKey: 'change24h',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4"
          >
            24h Change
            <IconArrowUp className="ml-2 size-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const change = row.getValue('change24h') as number;
        return (
          <Badge variant={change >= 0 ? 'default' : 'destructive'} className="flex w-fit items-center gap-1">
            <IconArrowUpRight
              className="size-3"
              style={{ transform: change < 0 ? 'rotate(90deg)' : undefined }}
            />
            {Math.abs(change)}%
          </Badge>
        );
      },
    },
  ];

  const filteredCoins = React.useMemo(() => {
    if (filterValue === 'all') return coins;
    if (filterValue === 'gainers') return coins.filter((coin) => coin.change24h > 0);
    if (filterValue === 'losers') return coins.filter((coin) => coin.change24h < 0);
    return coins;
  }, [coins, filterValue]);

  const table = useReactTable({
    data: filteredCoins,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Market</CardTitle>
        <div className="flex items-center gap-2">
          <Select value={filterValue} onValueChange={setFilterValue}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="gainers">Gainers</SelectItem>
              <SelectItem value="losers">Losers</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={String(table.getState().sorting[0]?.id || 'name')}
            onValueChange={(value) => {
              table.getColumn(value)?.toggleSorting();
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="marketCap">Market Cap</SelectItem>
              <SelectItem value="change24h">24h Change</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
