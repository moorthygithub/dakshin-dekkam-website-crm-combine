import { ArrowDownToLine, FileSpreadsheet, Printer } from "lucide-react";
import { useRef, useState, useMemo } from "react";
import { useReactToPrint } from "react-to-print";

import { MemoizedSelect } from "@/crm/components/common/MemoizedSelect";
import { ReportPageHeader } from "@/crm/components/common/ReportPageHeader";
import { downloadPDF } from "@/crm/components/downloadPDF";
import { exportEventDetailsReportToExcel } from "@/crm/components/excel/exportEventDetailsReportToExcel";
import { WithoutLoaderComponent } from "@/crm/components/LoaderComponent/LoaderComponent";
import { Button } from "@/crm/components/ui/button";
import { Card, CardContent } from "@/crm/components/ui/card";
import { ButtonConfig } from "@/crm/config/ButtonConfig";
import Page from "../../page/page";

import {
  useFetchBloodGroup,
  useFetchBranch,
  useFetchMemberData,
} from "@/hooks/useApi";
import { exportMemberReportToExcel } from "@/crm/components/excel/exportMemberReportToExcel";

const statusOptions = [
  { label: "All", value: "" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const MemberReport = () => {
  const eventRef = useRef(null);

  const [filters, setFilters] = useState({
    branchId: "",
    bloodGroup: "",
    status: "",
  });

  const { data: memberdata, isLoading } = useFetchMemberData();
  const { data: branchData } = useFetchBranch();
  const { data: bloodGroupData } = useFetchBloodGroup();
  console.log(branchData, "branchData");
  console.log(bloodGroupData, "bloodGroupData");
  const filteredData = useMemo(() => {
    if (!memberdata?.data) return [];
    return memberdata.data.filter((item) => {
      const branchMatch =
        !filters.branchId || item.branch_id === filters.branchId;
      const bloodMatch =
        !filters.bloodGroup || item.user_blood_group === filters.bloodGroup;
      const statusMatch =
        !filters.status || item.user_status === filters.status;

      return branchMatch && bloodMatch && statusMatch;
    });
  }, [memberdata, filters]);

  const handleInputChange = (value, field) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrint = useReactToPrint({
    content: () => eventRef.current,
    documentTitle: "Member_Report",
    pageStyle: `
      @page { size: auto; margin: 1mm; }
      @media print {
        body { margin: 0; padding: 2mm; }
        .print-hide { display: none; }
      }
    `,
  });

  return (
    <Page>
      <Card className="shadow-md rounded-lg p-4">
        <ReportPageHeader
          title="Member Report"
          subtitle="View Member Details"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center"
          filters={[
            {
              label: "Branch",
              element: (
                <MemoizedSelect
                  value={filters.branchId}
                  onChange={(e) => handleInputChange(e, "branchId")}
                  options={[
                    { label: "All", value: "" },
                    ...(branchData?.data?.map((b) => ({
                      label: b.branch_name,
                      value: b.id,
                    })) || []),
                  ]}
                  placeholder="Select Branch"
                />
              ),
            },
            {
              label: "Blood Group",
              element: (
                <MemoizedSelect
                  value={filters.bloodGroup}
                  onChange={(e) => handleInputChange(e, "bloodGroup")}
                  options={[
                    { label: "All", value: "" },
                    ...(bloodGroupData?.data?.map((b) => ({
                      label: b.blood_group,
                      value: b.blood_group,
                    })) || []),
                  ]}
                  placeholder="Select Blood Group"
                />
              ),
            },
            {
              label: "Status",
              element: (
                <MemoizedSelect
                  value={filters.status}
                  onChange={(e) => handleInputChange(e, "status")}
                  options={statusOptions}
                  placeholder="Select Status"
                />
              ),
            },
          ]}
          actionButtons={[
            {
              title: "Print Report",
              element: (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className={`${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor} flex items-center`}
                  onClick={handlePrint}
                >
                  <Printer className="h-3 w-3" />
                </Button>
              ),
            },
            {
              title: "PDF Report",
              element: (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className={`${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor} flex items-center`}
                  onClick={() =>
                    downloadPDF("printable-section", "Member_Report.pdf")
                  }
                >
                  <ArrowDownToLine className="h-3 w-3" />
                </Button>
              ),
            },
            {
              title: "Excel Report",
              element: (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className={`${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor} flex items-center`}
                  onClick={() =>
                    exportMemberReportToExcel(filteredData, "Member_Report")
                  }
                >
                  <FileSpreadsheet className="h-3 w-3" />
                </Button>
              ),
            },
          ]}
        />

        <CardContent>
          <div id="printable-section" ref={eventRef}>
            {isLoading ? (
              <WithoutLoaderComponent />
            ) : filteredData.length > 0 ? (
              <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold mb-1">Member Report</h1>

                <table className="w-full table-fixed border-collapse border border-gray-300 text-sm mt-4">
                  <colgroup>
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "15%" }} />
                  </colgroup>
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 py-1 border text-center">Name</th>
                      <th className="px-2 py-1 border text-center">Mobile</th>
                      <th className="px-2 py-1 border text-center">Email</th>
                      <th className="px-2 py-1 border text-center">
                        Blood Group
                      </th>
                      <th className="px-2 py-1 border text-center">
                        Married Status
                      </th>
                      <th className="px-2 py-1 border text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-t"
                        style={{ pageBreakInside: "avoid" }}
                      >
                        <td className="px-2 py-2 border text-center">
                          {item.first_name} {item.middle_name} {item.last_name}
                        </td>
                        <td className="px-2 py-1 border text-center">
                          {item.mobile}
                        </td>
                        <td className="px-2 py-3 border text-center break-words">
                          {item.email}
                        </td>
                        <td className="py-1 border text-center">
                          {item.user_blood_group}
                        </td>
                        <td className="px-2 py-1 border text-center">
                          {item.user_married_status}
                        </td>
                        <td className="px-2 py-1 border text-center">
                          {item.user_status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-20">
                No data found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Page>
  );
};

export default MemberReport;
