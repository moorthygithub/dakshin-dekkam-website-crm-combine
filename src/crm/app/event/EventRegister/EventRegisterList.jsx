import { EVENT_REGISTER } from "@/api";
import Page from "@/crm/app/page/page";
import DeleteAlertDialog from "@/crm/components/common/DeleteAlertDialog";
import {
  ErrorComponent,
  LoaderComponent,
} from "@/crm/components/LoaderComponent/LoaderComponent";
import { Button } from "@/crm/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/crm/components/ui/dropdown-menu";
import { Input } from "@/crm/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/crm/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/crm/components/ui/tooltip";
import { ButtonConfig } from "@/crm/config/ButtonConfig";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Edit, Search, SquarePlus, Trash2 } from "lucide-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import EventRegisterForm from "./EventRegisterForm";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/crm/components/ui/select";
const EventRegisterList = () => {
  const {
    data: eventregisterdata,
    isLoading,
    isError,
    refetch,
  } = useGetApiMutation({
    url: EVENT_REGISTER,
    queryKey: ["eventregisterdata"],
  });
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelected] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { trigger: submitTrigger } = useApiMutation();
  const [branchId, setBranchId] = useState(0);
  const authBranchId = useSelector((state) => state.auth.branch_id);
  const userType = useSelector((state) => state.auth.user_type);

  const handleDeleteRow = (eventid) => {
    setDeleteItemId(eventid);
    setDeleteConfirmOpen(true);
  };
  const confirmDelete = async () => {
    try {
      const response = await submitTrigger({
        url: `${EVENT_REGISTER}/${deleteItemId}`,
        method: "delete",
      });
      if (response.code == 201) {
        toast({
          title: "Success",
          description: response.message,
          variant: "success",
        });
        setDeleteConfirmOpen(false);
        setDeleteItemId(null);
        refetch();
      } else if (response.code == 400) {
        toast({
          title: "Duplicate Entry",
          description: response.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description:
          error?.response?.data?.msg ||
          error.message ||
          "Something unexpected happened.",
        variant: "destructive",
      });
      console.error("Failed to delete:", error);
    }
  };
  const columns = [
    {
      accessorKey: "event_register_mid",
      header: "Event Id",
    },
    {
      accessorKey: "event_name",
      header: "Event Name",
    },
    {
      accessorKey: "name",
      header: "Name",
    },

    {
      accessorKey: "event_register_date",
      header: "Register Date",
      cell: ({ row }) => {
        const date = row.getValue("event_register_date");
        return date ? (
          <div>{moment(date).format("DD MMM YYYY")}</div>
        ) : (
          <div>-</div>
        );
      },
    },
    {
      accessorKey: "event_register_name",
      header: "Register Name",
    },
    {
      accessorKey: "event_register_mobile",
      header: "Mobile",
    },
    {
      accessorKey: "event_register_email",
      header: "Email",
    },

    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <div className="flex flex-row">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelected(id);
                      setOpen(true);
                    }}
                  >
                    <Edit />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Event Register</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => handleDeleteRow(id)}
                    className="text-red-500"
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Event Register</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];
  const filteredData = useMemo(() => {
    if (!eventregisterdata?.data) return [];

    return eventregisterdata.data.filter((event) => {
      const matchesBranch =
        branchId === 0 || event.branch_id === Number(branchId);

      return matchesBranch;
    });
  }, [eventregisterdata, branchId]);
  const branchOptions = useMemo(() => {
    if (!eventregisterdata?.branch)
      return [{ value: 0, label: "All Branches" }];

    return [
      { value: 0, label: "All Branches" },
      ...eventregisterdata.branch.map((b) => ({
        value: b.id,
        label: b.branch_name || `Branch ${b.id}`,
      })),
    ];
  }, [eventregisterdata]);
  useEffect(() => {
    if (branchOptions.length > 0) {
      const defaultBranch =
        branchOptions.find((b) => b.value === authBranchId) || branchOptions[0];
      setBranchId(defaultBranch.value);
    }
  }, [branchOptions, authBranchId]);
  const table = useReactTable({
    data: filteredData || [],
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
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
  });

  if (isLoading) {
    return <LoaderComponent />;
  }

  if (isError) {
    return (
      <ErrorComponent
        message="Error Fetching Event Register Data"
        refetch={refetch}
      />
    );
  }

  return (
    <Page>
      <div className="w-full">
        <div className="flex text-left text-2xl text-gray-800 font-[400]">
          Event Register List
        </div>
        <div className="flex items-center py-4 justify-between">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search Event Register..."
              value={table.getState().globalFilter || ""}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="pl-8 bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
            />
          </div>
          <div className="flex  items-center">
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
                        {/* {column.id} */}
                        {typeof column.columnDef.header == "string"
                          ? column.columnDef.header
                          : column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="ml-2">
              {userType === 3 && (
                <Select
                  value={String(branchId)}
                  onValueChange={(value) => {
                    setBranchId(Number(value));
                  }}
                >
                  <SelectTrigger className="w-full md:w-48 h-9 text-sm border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branchOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <Button
              variant="default"
              className={`ml-2 ${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor} `}
              onClick={() => {
                setSelected(null);
                setOpen(true);
              }}
            >
              <SquarePlus className="h-4 w-4 " /> Event Register
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={` ${ButtonConfig.tableHeader} ${ButtonConfig.tableLabel}`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
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
        {/* row slection and pagintaion button  */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Total Event Register: &nbsp;
            {table.getFilteredRowModel().rows.length}
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
      {open && (
        <EventRegisterForm
          setOpen={setOpen}
          open={open}
          selectedId={selectedId}
          refetch={refetch}
        />
      )}
      {deleteConfirmOpen && (
        <DeleteAlertDialog
          open={deleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
          description="Event Register"
          handleDelete={confirmDelete}
        />
      )}
    </Page>
  );
};

export default EventRegisterList;
