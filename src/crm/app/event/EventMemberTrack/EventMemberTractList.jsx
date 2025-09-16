import { EVENT_MEMEBER_TRACK } from "@/api";
import Page from "@/crm/app/page/page";
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
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Edit, Search } from "lucide-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import EventMemberTrackForm from "./EventMemberTrackForm";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/crm/components/ui/select";
const EventMemberTractList = () => {
  const {
    data: eventtrackdata,
    isLoading,
    isError,
    refetch,
  } = useGetApiMutation({
    url: EVENT_MEMEBER_TRACK,
    queryKey: ["eventtrackdata"],
  });
  const [open, setOpen] = useState(false);
  const [selectedId, setSelected] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [branchId, setBranchId] = useState(0);
  const authBranchId = useSelector((state) => state.auth.branch_id);
  const userType = useSelector((state) => state.auth.user_type);
  const columns = [
    {
      accessorKey: "event_name",
      header: "Event Name",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "event_member_mid",
      header: "MID",
    },
    {
      accessorKey: "event_entry_date",
      header: "Entry Date",
      cell: ({ row }) => {
        const date = row.getValue("event_entry_date");
        return date ? (
          <div>{moment(date).format("DD MMM YYYY")}</div>
        ) : (
          <div>-</div>
        );
      },
    },

    {
      accessorKey: "event_no_of_people",
      header: "No of People",
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
                  <p>Edit Event Track</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
          </div>
        );
      },
    },
  ];
  const filteredData = useMemo(() => {
    if (!eventtrackdata?.data) return [];

    return eventtrackdata.data.filter((event) => {
      const matchesBranch =
        branchId === 0 || event.branch_id === Number(branchId);

      return matchesBranch;
    });
  }, [eventtrackdata, branchId]);
  const branchOptions = useMemo(() => {
    if (!eventtrackdata?.branch) return [{ value: 0, label: "All Branches" }];

    return [
      { value: 0, label: "All Branches" },
      ...eventtrackdata.branch.map((b) => ({
        value: b.id,
        label: b.branch_name || `Branch ${b.id}`,
      })),
    ];
  }, [eventtrackdata]);
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
        message="Error Fetching Event Track Data"
        refetch={refetch}
      />
    );
  }

  return (
    <Page>
      <div className="w-full">
        <div className="flex text-left text-2xl text-gray-800 font-[400]">
          Event Track List
        </div>
        <div className="flex items-center py-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search Event Track..."
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
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
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
            Total Event Track : &nbsp;
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
        <EventMemberTrackForm
          setOpen={setOpen}
          open={open}
          selectedId={selectedId}
          refetch={refetch}
        />
      )}
    </Page>
  );
};

export default EventMemberTractList;
