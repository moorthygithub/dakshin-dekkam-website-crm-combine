import { useState } from "react";
import { Download, FileText, Calendar, Eye, ChevronRight } from "lucide-react";
import Page from "../../page/page";
import { Button } from "@/crm/components/ui/button";

function AGMReport() {
  // Sample AGM reports data - Replace with your actual data
  const agmReports = [
    {
      id: 1,
      title: "Annual General Meeting Report 2024",
      date: "December 15, 2024",
      description:
        "Complete proceedings and resolutions of the 2024 Annual General Meeting",
      pdfUrl: "/pdfs/agm-report-2024.pdf",
      year: "2024",
      fileSize: "2.5 MB",
    },
    {
      id: 2,
      title: "Annual General Meeting Report 2023",
      date: "December 10, 2023",
      description:
        "Complete proceedings and resolutions of the 2023 Annual General Meeting",
      pdfUrl: "/pdfs/agm-report-2023.pdf",
      year: "2023",
      fileSize: "2.1 MB",
    },
    {
      id: 3,
      title: "Annual General Meeting Report 2022",
      date: "December 12, 2022",
      description:
        "Complete proceedings and resolutions of the 2022 Annual General Meeting",
      pdfUrl: "/pdfs/agm-report-2022.pdf",
      year: "2022",
      fileSize: "1.8 MB",
    },
  ];

  const [selectedReport, setSelectedReport] = useState(null);

  const handleDownload = (pdfUrl, title) => {
    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (report) => {
    setSelectedReport(report);
  };

  const closeViewer = () => {
    setSelectedReport(null);
  };

  return (
    <Page>
      <div>
        {/* Reports Grid */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {agmReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-br from-[#0F3652] to-[#1a4d6f] p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white mb-2">
                      {report.year}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {report.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar size={16} />
                    <span>{report.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FileText size={14} />
                      PDF Document
                    </span>
                    <span>{report.fileSize}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleView(report)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 h-12 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95 font-semibold text-sm"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </Button>
                    <button
                      onClick={() =>
                        handleDownload(report.pdfUrl, report.title)
                      }
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105 active:scale-95 font-semibold text-sm"
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PDF Viewer Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#0F3652] to-[#1a4d6f] text-white p-4 sm:p-6 rounded-t-2xl flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold truncate">
                    {selectedReport.title}
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm mt-1">
                    {selectedReport.date}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    onClick={() =>
                      handleDownload(
                        selectedReport.pdfUrl,
                        selectedReport.title,
                      )
                    }
                    className="px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold backdrop-blur-sm"
                  >
                    <Download size={16} />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                  <button
                    onClick={closeViewer}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center justify-center backdrop-blur-sm"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 overflow-hidden bg-gray-100 rounded-b-2xl">
                <iframe
                  src={selectedReport.pdfUrl}
                  className="w-full h-full"
                  title={selectedReport.title}
                />
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    </Page>
  );
}

export default AGMReport;
