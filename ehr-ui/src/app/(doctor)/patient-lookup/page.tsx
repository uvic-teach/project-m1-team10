"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { historyItem } from "@/interfaces/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect } from "react"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"


export type Payment = {
  phn: number
  name: string
}

export type User= {
    phn: number
    name: string

}

async function fetchPatientData() {
    
    let response = await fetch(`https://log-in-microservice.vercel.app/api/history`, {
        method: "GET"

    })

    let response2 = await fetch(`https://log-in-microservice.vercel.app/api/history`, {
        method: "GET"

    })

    let allHistory:historyItem[] = await response2.json()

    let duplicatePatients= allHistory.map(async (item) =>{ 

        const patientResponse = await fetch(
            `https://log-in-microservice.vercel.app/api/users/${item.user}`
        );
        return patientResponse.json();
    })

    const patients = await Promise.all(duplicatePatients);

    const uniquePatients = patients.filter((v,i,a)=>a.findIndex(v2=>['phn','name'].every(k=>v2[k] ===v[k]))===i)
    uniquePatients.sort()

    return uniquePatients

}

//const data:User[] = await fetchPatientData()

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "phn",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                User PHN
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        cell: ({ row }) => (
            <div className="capitalize">{`${row.getValue("phn")}`}</div>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) =>(
            <div className="capitalize">{`${row.getValue("name")}`}</div>
        )
    },
    {
        id: "actions",
        cell: ({ row }) => {
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(row.getValue("phn"))}
                >
                    <Link href={`/patient-history/${row.getValue("phn")}`}>See Patient History </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },

]

export default function Page() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [data, setData] = React.useState<User[]>([])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        },
    })

    useEffect(() => {
        const fetchData = async () => {
          try {
            const patients = await fetchPatientData();
            setData(patients);
          } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error (e.g., show an error message to the user)
          }
        };
    
        fetchData();
      }, []); 


  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Serach for patient..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm items-center"
        />
        
      </div>
      <div className="rounded-md border">
        <Table className="bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  
                >
                  
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                        </TableCell>
                    ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
