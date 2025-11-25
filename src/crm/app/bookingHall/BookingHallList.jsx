/* eslint-disable no-unused-vars */
import  { useState } from 'react';

import { Button } from "@/crm/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/crm/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/crm/components/ui/popover";

import { ButtonConfig } from "@/crm/config/ButtonConfig";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Search, Trash2, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/crm/components/ui/dropdown-menu";
import { Input } from "@/crm/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import useToken from "@/api/usetoken";
import { BOOKING_HALL_UPDATE_STATUS } from '@/api';
import { encryptId } from '@/crm/utils/encyrption/Encyrption';





const BookingHallList = ({ data, refetch, navigate, title }) => {
    const { toast } = useToast();
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
   
  
    const token = useToken();
    const queryClient = useQueryClient();
  
    const statusMutation = useMutation({
      mutationFn: async ({ bookingId, status }) => {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}${BOOKING_HALL_UPDATE_STATUS}/${bookingId}/status`,
          { guest_status: status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['bookingHallData'] });
        toast({
          title: "Success",
          description: data.message || 'Status updated successfully',
          variant: "success",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.response?.data?.message || 'Failed to update status',
          variant: "destructive",
        });
        console.error("Status update error:", error);
      },
    });
  
    
  
    const handleStatusChange = (bookingId, newStatus) => {
      statusMutation.mutate({ bookingId, status: newStatus });
    };
  
    const handleEditClick = (bookingId) => {
      navigate(`/crm/booking-hall-edit/${encodeURIComponent(
        encryptId(bookingId)
      )}`);
     
    };
  
   
  
   
  
    const statusOptions = [
      { value: "Pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
      { value: "Confirmed", label: "Confirmed", color: "bg-green-100 text-green-800" },
      { value: "CheckIn", label: "Check In", color: "bg-blue-100 text-blue-800" },
      { value: "CheckOut", label: "Check Out", color: "bg-purple-100 text-purple-800" },
      { value: "Cancel", label: "Cancel", color: "bg-red-100 text-red-800" },
    ];
  
    const columns = [
      {
        accessorKey: "index",
        id: "Sl No",
        header: "Sl No",
        cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      {
        id: "Name",
        header: "Name",
        cell: ({ row }) => {
          const { guest_name } = row.original;
          return <div>{guest_name}</div>;
        },
      },
      {
        id: "Email",
        header: "Email",
        cell: ({ row }) => {
          const { guest_email } = row.original;
          return <div>{guest_email}</div>;
        },
      },
      {
        id: "Company",
        header: "Company",
        cell: ({ row }) => {
          const { company_name } = row.original;
          return <div>{company_name || 'N/A'}</div>;
        },
      },
      {
        id: "Mobile",
        header: "Mobile",
        cell: ({ row }) => {
          const { guest_mobile_number } = row.original;
          return <div>{guest_mobile_number}</div>;
        },
      },
      {
        id: "Function Type",
        header: "Function Type",
        cell: ({ row }) => {
          const { function_type } = row.original;
          return <div>{function_type}</div>;
        },
      },
      {
        id: "No. of Guests",
        header: "No. of Guests",
        cell: ({ row }) => {
          const { no_of_guest } = row.original;
          return <div>{no_of_guest}</div>;
        },
      },
      {
        id: "No. of Days",
        header: "No. of Days",
        cell: ({ row }) => {
          const { guest_no_days } = row.original;
          return <div>{guest_no_days}</div>;
        },
      },
      {
        id: "Check-in Date",
        header: "Check-in Date",
        cell: ({ row }) => {
          const { guest_checkIn_date, guest_checkIn_time } = row.original;
          return (
            <div>
              <div>{guest_checkIn_date}</div>
              <div className="text-sm text-gray-500">{guest_checkIn_time}</div>
            </div>
          );
        },
      },
      {
        id: "Check-out Date",
        header: "Check-out Date",
        cell: ({ row }) => {
          const { guest_checkOut_date, guest_checkOut_time } = row.original;
          return (
            <div>
              <div>{guest_checkOut_date}</div>
              <div className="text-sm text-gray-500">{guest_checkOut_time}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "guest_status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("guest_status");
          const bookingId = row.original.id;
          const currentStatus = statusOptions.find(opt => opt.value === status);
  
          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`${currentStatus?.color || "bg-gray-100 text-gray-800"} border-0`}
                  disabled={statusMutation.isPending}
                >
                  {currentStatus?.label || status}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <div className="space-y-1">
                  {statusOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="ghost"
                      className={`w-full justify-start ${option.color} ${
                        status === option.value ? "ring-2 ring-offset-1 ring-gray-400" : ""
                      }`}
                      onClick={() => handleStatusChange(bookingId, option.value)}
                      disabled={statusMutation.isPending}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const booking = row.original;
          
          return (
            <div className="flex items-center space-x-2">
              {/* Edit Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditClick(booking.id)}
                className="hover:bg-blue-50"
              >
                <Edit className="h-4 w-4 text-blue-500" />
              </Button>
  
          
             
            </div>
          );
        },
      },
    ];
  
    const table = useReactTable({
      data: data || [],
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: { sorting, columnFilters, columnVisibility, rowSelection },
      initialState: { pagination: { pageSize: 7 } },
    });
  
    return (
      <div className="w-full">
        <div className="flex text-left text-2xl text-gray-800 font-[400] mb-6">
          {title || "Hall Booking List"}
        </div>
        <div className="flex items-center py-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              value={table.getState().globalFilter || ""}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="pl-8 bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {typeof column.columnDef.header == "string"
                        ? column.columnDef.header
                        : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={`${ButtonConfig.tableHeader} ${ButtonConfig.tableLabel}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Total: {table.getFilteredRowModel().rows.length}
          </div>
          <div className="space-x-2">
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
      </div>
    );
  };

export default BookingHallList