/* eslint-disable no-unused-vars */
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/crm/components/ui/alert-dialog";
import { ButtonConfig } from "@/crm/config/ButtonConfig";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useToast } from "@/hooks/use-toast";
import useToken from "@/api/usetoken";
import { BOOKING_FORM_LIST, BOOKING_FORM_UPDATE_LIST } from "@/api";

const BookingFormTable = ({ data, refetch, navigate, title }) => {
     const { toast } = useToast();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const token = useToken();
  const queryClient = useQueryClient();

  
  const statusMutation = useMutation({
    mutationFn: async ({ bookingId, status }) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}${BOOKING_FORM_UPDATE_LIST}s/${bookingId}/status`,
        {guest_status: status },
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
      queryClient.invalidateQueries({ queryKey: ['bookingFormData'] });
     
      toast({
        title: "Success",
        description:data.message || 'Status updated successfully',
        variant: "success",
      });
    },
    onError: (error) => {


      toast({
        title: "Error",
        description:error.response.data.message ||  'Failed to update status',
        variant: "destructive",
      });
      console.error("Status update error:", error);
    },
  });

 
  const deleteMutation = useMutation({
    mutationFn: async (bookingId) => {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}${BOOKING_FORM_UPDATE_LIST}/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookingFormData'] });

      toast({
        title: "Success",
        description: data.message ||  'Booking deleted successfully',
        variant: "success",
      });
      setDeleteDialogOpen(false);
    },
    onError: (error) => {

      toast({
        title: "Error",
        description: 'Failed to delete booking',
        variant: "destructive",
      });
      console.error("Delete error:", error);
    },
  });

  const handleStatusChange = (bookingId, newStatus) => {
    statusMutation.mutate({ bookingId, status: newStatus });
  };

  const handleDeleteClick = (booking) => {
    setBookingToDelete(booking);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (bookingToDelete) {
      deleteMutation.mutate(bookingToDelete.id);
    }
  };

  const statusOptions = [
    { value: "Pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { value: "CheckIn", label: "Check In", color: "bg-green-100 text-green-800" },
    { value: "CheckOut", label: "Check Out", color: "bg-blue-100 text-blue-800" },
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
      id: "Mobile",
      header: "Mobile",
      cell: ({ row }) => {
        const { guest_mobile_number } = row.original;
        return <div>{guest_mobile_number}</div>;
      },
    },
    {
      id: "Check-in Date",
      header: "Check-in Date",
      cell: ({ row }) => {
        const { guest_checkIn_date } = row.original;
        return <div>{guest_checkIn_date}</div>;
      },
    },
    {
      id: "Check-out Date",
      header: "Check-out Date",
      cell: ({ row }) => {
        const { guest_checkOut_date } = row.original;
        return <div>{guest_checkOut_date}</div>;
      },
    },
    {
      id: "No. of People",
      header: "No. of People",
      cell: ({ row }) => {
        const { guest_no_people } = row.original;
        return <div>{guest_no_people}</div>;
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
            <PopoverContent className="w-40 p-2">
              <div className="space-y-1">
                {statusOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    className={`w-full justify-start ${option.color} ${
                      status === option.value ? "ring-2 ring-offset-1" : ""
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
          <AlertDialog open={deleteDialogOpen && bookingToDelete?.id === booking.id} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteClick(booking)}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the booking for{" "}
                  <strong>{booking.guest_name}</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
      <div className="flex text-left text-2xl text-gray-800 font-[400]">
        {title || "Booking Form List"}
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
            <Button variant="outline" className="ml-auto ">
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

export default BookingFormTable;