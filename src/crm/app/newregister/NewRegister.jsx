// import { MEMBER_LIST } from "@/api";
// import {
//   ErrorComponent,
//   LoaderComponent,
// } from "@/crm/components/LoaderComponent/LoaderComponent";
// import MemberStatusToggle from "@/crm/components/toggle/MemberStatusToggle";
// import { Button } from "@/crm/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/crm/components/ui/dropdown-menu";
// import { Input } from "@/crm/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/crm/components/ui/table";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/crm/components/ui/tooltip";
// import { ButtonConfig } from "@/crm/config/ButtonConfig";
// import { encryptId } from "@/crm/utils/encyrption/Encyrption";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { ChevronDown, Edit, Search, SquarePlus } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Page from "../page/page";
// import { useGetApiMutation } from "@/hooks/useGetApiMutation";
// import { useFetchMemberData } from "@/hooks/useApi";
// const NewRegister = () => {
//   const {
//     data: memberdata,
//     isLoading,
//     isError,
//     refetch,
//   } = useFetchMemberData();
//   const [sorting, setSorting] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [rowSelection, setRowSelection] = useState({});

//   const columns = [
//     {
//       id: "index",
//       header: "Sl No",
//       cell: ({ row }) => <div>{row.index + 1}</div>,
//     },
//     {
//       id: "name",
//       header: "Name",
//       cell: ({ row }) => {
//         const { first_name, middle_name, last_name } = row.original;
//         return (
//           <div>
//             {first_name} {middle_name} {last_name}
//           </div>
//         );
//       },
//     },
//     {
//       accessorKey: "mobile",
//       header: "Mobile",
//     },
//     {
//       accessorKey: "email",
//       header: "Email",
//     },
//     {
//       accessorKey: "user_blood_group",
//       header: "Blood Group",
//     },
//     {
//       accessorKey: "user_married_status",
//       header: "Married Status",
//     },
//     {
//       accessorKey: "user_status",
//       header: "Status",
//       cell: ({ row }) => {
//         const status = row.original.user_status;
//         const teamId = row.original.id;
//         return (
//           <MemberStatusToggle
//             initialStatus={status}
//             teamId={teamId}
//             onStatusChange={() => {
//               refetch();
//             }}
//           />
//         );
//       },
//     },
//   ];
//   const filteredData = memberdata?.data?.filter(
//     (item) => item.user_status === "New"
//   );

//   const table = useReactTable({
//     data: memberdata?.data || [],
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//     initialState: {
//       pagination: {
//         pageSize: 7,
//       },
//     },
//   });

//   if (isLoading) {
//     return <LoaderComponent />;
//   }

//   if (isError) {
//     return (
//       <ErrorComponent
//         message="Error Fetching New Register Data"
//         refetch={refetch}
//       />
//     );
//   }

//   return (
//     <Page>
//       <div className="w-full">
//         <div className="flex text-left text-2xl text-gray-800 font-[400]">
//           New Register List
//         </div>
//         <div className="flex items-center py-4">
//           <div className="relative w-72">
//             <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//             <Input
//               placeholder="Search..."
//               value={table.getState().globalFilter || ""}
//               onChange={(event) => table.setGlobalFilter(event.target.value)}
//               className="pl-8 bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
//             />
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto ">
//                 Columns <ChevronDown className="ml-2 h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                       }
//                     >
//                       {/* {column.id} */}
//                       {typeof column.columnDef.header == "string"
//                         ? column.columnDef.header
//                         : column.id}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => {
//                     return (
//                       <TableHead
//                         key={header.id}
//                         className={` ${ButtonConfig.tableHeader} ${ButtonConfig.tableLabel}`}
//                       >
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                       </TableHead>
//                     );
//                   })}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow
//                     key={row.id}
//                     data-state={row.getIsSelected() && "selected"}
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="h-24 text-center"
//                   >
//                     No results.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//         {/* row slection and pagintaion button  */}
//         <div className="flex items-center justify-end space-x-2 py-4">
//           <div className="flex-1 text-sm text-muted-foreground">
//             Total : &nbsp;
//             {table.getFilteredRowModel().rows.length}
//           </div>
//           <div className="space-x-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               Previous
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Page>
//   );
// };

// export default NewRegister;
import {
  ErrorComponent,
  LoaderComponent,
} from "@/crm/components/LoaderComponent/LoaderComponent";
import MemberTable from "@/crm/components/MemberTable/MemberTable";
import { useFetchMemberData } from "@/hooks/useApi";
import { useNavigate } from "react-router-dom";
import Page from "../page/page";

const NewRegister = () => {
  const {
    data: memberdata,
    isLoading,
    isError,
    refetch,
  } = useFetchMemberData();
  const navigate = useNavigate();

  if (isLoading) return <LoaderComponent />;
  if (isError)
    return (
      <ErrorComponent message="Error Fetching Member Data" refetch={refetch} />
    );

  const filteredData = memberdata?.data?.filter(
    (item) => item.user_status === "New"
  );
  return (
    <Page>
      <div className="w-full space-y-8">
        <MemberTable
          title="New Register List"
          data={filteredData}
          refetch={refetch}
          navigate={navigate}
          type="new"
        />
      </div>
    </Page>
  );
};
export default NewRegister;
