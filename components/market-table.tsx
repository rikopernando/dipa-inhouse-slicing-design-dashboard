'use client';
'use no memo';

import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ChevronDown, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SortableTableHeader } from '@/components/atoms/sortable-table-header';
import { MarketChangeCell } from '@/components/atoms/market-change-cell';
import { CoinNameCell } from '@/components/molecules/coin-name-cell';
import { formatNumber } from '@/lib/utils';
import type { CoinData } from '@/types/dashboard';

interface MarketTableProps {
  coins: CoinData[];
}

export function MarketTable({ coins }: MarketTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<CoinData>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <CoinNameCell
          name={row.original.name}
          symbol={row.original.symbol}
          icon={row.original.icon}
        />
      ),
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <SortableTableHeader
          label="Price (USD)"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      ),
      cell: ({ row }) => (
        <span className="font-medium tabular-nums">${formatNumber(row.getValue('price'))}</span>
      ),
    },
    {
      accessorKey: 'marketCap',
      header: ({ column }) => (
        <SortableTableHeader
          label="Market Cap (USD)"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      ),
      cell: ({ row }) => (
        <span className="tabular-nums">${formatNumber(row.getValue('marketCap'))}</span>
      ),
    },
    {
      accessorKey: 'volume24h',
      header: ({ column }) => (
        <SortableTableHeader
          label="Circulating Supply"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      ),
      cell: ({ row }) => (
        <span className="tabular-nums">${formatNumber(row.getValue('volume24h'))}</span>
      ),
    },
    {
      accessorKey: 'change24h',
      header: ({ column }) => (
        <SortableTableHeader
          label="24h Change"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      ),
      cell: ({ row }) => <MarketChangeCell change={row.getValue('change24h') as number} />,
    },
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: coins,
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
        <CardTitle>Markets</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="hidden sm:flex">
            <Filter className="text-grayscale-500" />
            Filter
          </Button>
          <Button variant="secondary" size="sm" className="hidden sm:flex">
            Sort by
            <ChevronDown className="text-grayscale-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-input rounded-[2px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-b-0!" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="font-inter-tight text-grayscale-500 px-2 text-xs font-medium"
                    key={header.id}
                  >
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
      </CardContent>
    </Card>
  );
}
