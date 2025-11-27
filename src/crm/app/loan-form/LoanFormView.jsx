import { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Home, 
  Calendar,
  BookOpen,
  GraduationCap,
  Building,
  FileText,
  Target,
  DollarSign,
  Users,

  Eye,
  Loader2,
  Printer
} from 'lucide-react';
import Page from "@/crm/app/page/page";
import { MemoizedSelect } from "@/crm/components/common/MemoizedSelect";

import { LoaderComponent } from "@/crm/components/LoaderComponent/LoaderComponent";
import { Button } from "@/crm/components/ui/button";
import { Card, CardContent } from "@/crm/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/crm/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import { useApiMutation } from "@/hooks/useApiMutation";
import { decryptId } from "@/crm/utils/encyrption/Encyrption";
import useToken from "@/api/usetoken";
import { useReactToPrint } from 'react-to-print';


const useFetchLoanData = (id) => {
  return useGetApiMutation({
    url: `loan/${id}`,
    queryKey: ["loanById"],
    options: {
      enabled: !!id,
      refetchOnWindowFocus: false,
      
    },
  });
};

const statusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Processing", label: "Processing" },
  { value: "Cancel", label: "Cancel" },
];

const qualificationOptions = {
  '10th': '10th Standard',
  '12th': '12th Standard',
  'Diploma': 'Diploma',
  'Undergraduate': 'Undergraduate',
  'Postgraduate': 'Postgraduate',
  'PhD': 'PhD'
};

const educationLevelOptions = {
  'Undergraduate': 'Undergraduate',
  'Postgraduate': 'Postgraduate',
  'Diploma': 'Diploma',
  'Certificate Course': 'Certificate Course',
  'PhD': 'PhD'
};

const LoanFormView = () => {
  const { id } = useParams();
  let decryptedId = null;

  if (id) {
    try {
      const rawId = decodeURIComponent(id);
      decryptedId = decryptId(rawId);
    } catch (err) {
      console.error("Failed to decrypt ID:", err.message);
    }
  }

  const { toast } = useToast();
  const navigate = useNavigate();
  const token = useToken();
  const [status, setStatus] = useState("");
  const [fileDialog, setFileDialog] = useState({
    open: false,
    title: '',
    url: ''
  });

  const { data: loanData, loading: isFetching, refetch } = useFetchLoanData(decryptedId);
  const { trigger: statusTrigger, loading: statusLoading } = useApiMutation();

  const loan = loanData?.data;
  const imageBaseUrl = loanData?.image_url?.find(img => img.image_for === "Loans")?.image_url || '';


  const printRef = useRef(null);
    const handlePrint = useReactToPrint({
      content: () => printRef.current,
      documentTitle: `Loan_Application_${loan?.user_full_name || 'Details'}`,
      pageStyle: `
        @page { 
          size: A4; 
          margin: 4mm;
        }
        @media print {
          body { 
            -webkit-print-color-adjust: exact;
            margin: 0; 
            padding: 0;
          }
          .print-hide { 
            display: none !important; 
          }
          
          
        
        }
      `,
    });

  useEffect(() => {
    if (loan?.loans_status) {
      setStatus(loan.loans_status);
    }
  }, [loan]);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await statusTrigger({
        url: `loans/${decryptedId}/status`,
        method: 'patch',
        data: { loans_status: newStatus },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response?.code === 200 || response?.code === 201) {
        toast({
          title: "Success",
          description: response.message || "Status updated successfully",
          variant: "success",
        });
        setStatus(newStatus);
        refetch();
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update status",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleViewFile = (fileName, fileType) => {
    if (!fileName || fileName === 'null' || fileName === 'undefined') {
      toast({
        title: "Error",
        description: "File not available",
        variant: "destructive",
      });
      return;
    }

    const fileUrl = `${imageBaseUrl}${fileName}`;
    setFileDialog({
      open: true,
      title: fileType,
      url: fileUrl
    });
  };

  const closeFileDialog = () => {
    setFileDialog({
      open: false,
      title: '',
      url: ''
    });
  };

  if (isFetching) {
    return <LoaderComponent />;
  }

  if (!loan) {
    return (
      <Page>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No loan data found</p>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="p-0">
        {/* Enhanced Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 mb-6 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Loan Application Details</h1>
              <div className="flex items-center gap-4 text-purple-100">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{loan.user_full_name || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{loan.user_email || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  <span>{loan.loans_type || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
                <span className="text-sm font-medium">Status:</span>
                <MemoizedSelect
                  value={status}
                  onChange={handleStatusChange}
                  options={statusOptions}
                  placeholder="Select Status"
                  disabled={statusLoading}
                  className="text-gray-800 min-w-[120px]"
                />
                {statusLoading && <Loader2 className="h-4 w-4 animate-spin text-white" />}
              </div>
              
              <Button
                onClick={() => navigate('/crm/loan')}
                className="bg-white text-purple-700 hover:bg-purple-50 font-medium"
              >
                Go Back
              </Button>
              <Button
                              onClick={handlePrint}
                              className="bg-green-600 text-white hover:bg-green-700 font-medium print-hide flex items-center gap-2"
                            >
                              <Printer size={16} />
                              Print
                            </Button>
            </div>
          </div>
        </div>
         
<div ref={printRef}>

<div className="hidden print:block print-only" style={{ fontSize: '9pt', lineHeight: '1.3' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '12px', borderBottom: '2px solid #7c3aed', paddingBottom: '8px' }}>
              <h1 style={{ fontSize: '16pt', fontWeight: 'bold', color: '#7c3aed', margin: '0 0 4px 0' }}>
                LOAN APPLICATION REPORT
              </h1>
              <div style={{ fontSize: '9pt', color: '#666' }}>
                Application ID: {loan.id || 'N/A'} | Type: {loan.loans_type || 'N/A'} | Status: <span style={{ fontWeight: 'bold', color: status === 'Approved' ? '#16a34a' : status === 'Pending' ? '#ea580c' : '#dc2626' }}>{status}</span>
              </div>
            </div>

            {/* Compact 2-Column Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '8.5pt' }}>
              
              {/* Left Column */}
              <div>
                {/* Personal Information */}
                <div style={{ marginBottom: '10px', border: '1px solid #e5e7eb', padding: '6px', borderRadius: '4px' }}>
                  <h3 style={{ fontSize: '10pt', fontWeight: 'bold', color: '#7c3aed', margin: '0 0 6px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '3px' }}>Personal Information</h3>
                  <table style={{ width: '100%', fontSize: '8pt', lineHeight: '1.4' }}>
                    <tbody>
                      <tr><td style={{ fontWeight: '600', width: '40%', padding: '2px 0' }}>Full Name:</td><td style={{ padding: '2px 0' }}>{loan.user_full_name || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Email:</td><td style={{ padding: '2px 0' }}>{loan.user_email || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Mobile:</td><td style={{ padding: '2px 0' }}>{loan.user_mobile_number || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>DOB:</td><td style={{ padding: '2px 0' }}>{loan.user_dob || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Gender:</td><td style={{ padding: '2px 0' }}>{loan.user_gender || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Aadhar:</td><td style={{ padding: '2px 0' }}>{loan.user_aadhar_number || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>City:</td><td style={{ padding: '2px 0' }}>{loan.user_city || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Pincode:</td><td style={{ padding: '2px 0' }}>{loan.user_pincode || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0', verticalAlign: 'top' }}>Address:</td><td style={{ padding: '2px 0' }}>{loan.user_residentaial_address || 'N/A'}</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Family Information */}
                <div style={{ marginBottom: '10px', border: '1px solid #e5e7eb', padding: '6px', borderRadius: '4px' }}>
                  <h3 style={{ fontSize: '10pt', fontWeight: 'bold', color: '#7c3aed', margin: '0 0 6px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '3px' }}>Family Information</h3>
                  <table style={{ width: '100%', fontSize: '8pt', lineHeight: '1.4' }}>
                    <tbody>
                      <tr><td style={{ fontWeight: '600', width: '40%', padding: '2px 0' }}>Parent/Guardian:</td><td style={{ padding: '2px 0' }}>{loan.user_parents_name || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Occupation:</td><td style={{ padding: '2px 0' }}>{loan.user_parents_occupation || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Annual Income:</td><td style={{ padding: '2px 0' }}>{loan.user_annual_income ? `₹${loan.user_annual_income}` : 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Dependents:</td><td style={{ padding: '2px 0' }}>{loan.user_no_dependents || 'N/A'}</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Educational Background */}
                <div style={{ marginBottom: '10px', border: '1px solid #e5e7eb', padding: '6px', borderRadius: '4px' }}>
                  <h3 style={{ fontSize: '10pt', fontWeight: 'bold', color: '#7c3aed', margin: '0 0 6px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '3px' }}>Educational Background</h3>
                  <table style={{ width: '100%', fontSize: '8pt', lineHeight: '1.4' }}>
                    <tbody>
                      <tr><td style={{ fontWeight: '600', width: '40%', padding: '2px 0' }}>Qualification:</td><td style={{ padding: '2px 0' }}>{qualificationOptions[loan.user_qualification] || loan.user_qualification || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Degree:</td><td style={{ padding: '2px 0' }}>{loan.user_college_degree || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>10th/12th %:</td><td style={{ padding: '2px 0' }}>{loan.user_school_percentage ? `${loan.user_school_percentage}%` : 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>College %:</td><td style={{ padding: '2px 0' }}>{loan.user_college_percentage ? `${loan.user_college_percentage}%` : 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Degree %:</td><td style={{ padding: '2px 0' }}>{loan.user_degree_percentage ? `${loan.user_degree_percentage}%` : 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Entrance Exam:</td><td style={{ padding: '2px 0' }}>{loan.user_entrance_exam || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Exam Score:</td><td style={{ padding: '2px 0' }}>{loan.user_entrance_exam_score || 'N/A'}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Course & Institution Details */}
                <div style={{ marginBottom: '10px', border: '1px solid #e5e7eb', padding: '6px', borderRadius: '4px' }}>
                  <h3 style={{ fontSize: '10pt', fontWeight: 'bold', color: '#7c3aed', margin: '0 0 6px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '3px' }}>Course & Institution Details</h3>
                  <table style={{ width: '100%', fontSize: '8pt', lineHeight: '1.4' }}>
                    <tbody>
                      <tr><td style={{ fontWeight: '600', width: '40%', padding: '2px 0' }}>Education Level:</td><td style={{ padding: '2px 0' }}>{educationLevelOptions[loan.user_education_loan_for] || loan.user_education_loan_for || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Institution:</td><td style={{ padding: '2px 0' }}>{loan.user_college_name || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Course Name:</td><td style={{ padding: '2px 0' }}>{loan.user_course_name || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Duration:</td><td style={{ padding: '2px 0' }}>{loan.user_course_duration ? `${loan.user_course_duration} years` : 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Start Date:</td><td style={{ padding: '2px 0' }}>{loan.user_course_date || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0', verticalAlign: 'top' }}>Address:</td><td style={{ padding: '2px 0' }}>{loan.user_college_address || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Contact:</td><td style={{ padding: '2px 0' }}>{loan.user_website_number_of_college || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Total Fees:</td><td style={{ padding: '2px 0', fontWeight: 'bold' }}>{loan.user_total_fees ? `₹${loan.user_total_fees}` : 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0' }}>Loan Required:</td><td style={{ padding: '2px 0', fontWeight: 'bold', color: '#7c3aed' }}>{loan.user_total_loans ? `₹${loan.user_total_loans}` : 'N/A'}</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Financial Information */}
                <div style={{ marginBottom: '10px', border: '1px solid #e5e7eb', padding: '6px', borderRadius: '4px' }}>
                  <h3 style={{ fontSize: '10pt', fontWeight: 'bold', color: '#7c3aed', margin: '0 0 6px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '3px' }}>Financial Information</h3>
                  <table style={{ width: '100%', fontSize: '8pt', lineHeight: '1.4' }}>
                    <tbody>
                      <tr><td style={{ fontWeight: '600', width: '40%', padding: '2px 0', verticalAlign: 'top' }}>Existing Loans:</td><td style={{ padding: '2px 0' }}>{loan.user_other_loans || 'N/A'}</td></tr>
                      <tr><td style={{ fontWeight: '600', padding: '2px 0', verticalAlign: 'top' }}>Repayment Plan:</td><td style={{ padding: '2px 0' }}>{loan.user_intend_to_repay || 'N/A'}</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Career Goals */}
                <div style={{ marginBottom: '10px', border: '1px solid #e5e7eb', padding: '6px', borderRadius: '4px' }}>
                  <h3 style={{ fontSize: '10pt', fontWeight: 'bold', color: '#7c3aed', margin: '0 0 6px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '3px' }}>Career Goals</h3>
                  <p style={{ fontSize: '8pt', lineHeight: '1.4', margin: 0 }}>{loan.user_career_goals || 'N/A'}</p>
                </div>

                {/* Documents Status */}
                <div style={{ border: '1px solid #e5e7eb', padding: '6px', borderRadius: '4px' }}>
                  <h3 style={{ fontSize: '10pt', fontWeight: 'bold', color: '#7c3aed', margin: '0 0 6px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '3px' }}>Documents Submitted</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '7.5pt' }}>
                    {[
                      { label: "Passport Photo", value: loan.user_passport_photo },
                      { label: "Aadhar Card", value: loan.user_aadharcard_photo },
                      { label: "School Marksheet", value: loan.user_school_marksheet_photo },
                      { label: "College Marksheet", value: loan.user_college_marksheet_photo },
                      { label: "Fee Structure", value: loan.user_college_fee_structure },
                      { label: "Admission Letter", value: loan.user_college_admission_letter },
                      { label: "Previous Marksheet", value: loan.user_previous_year_marksheet },
                      { label: "Other Documents", value: loan.user_other_letter },
                    ].map((doc, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 4px', backgroundColor: doc.value ? '#f0fdf4' : '#fef2f2', borderRadius: '2px' }}>
                        <span>{doc.label}:</span>
                        <span style={{ fontWeight: 'bold', color: doc.value ? '#16a34a' : '#dc2626' }}>
                          {doc.value ? '✓' : '✗'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '2px solid #7c3aed', textAlign: 'center', fontSize: '7.5pt', color: '#666' }}>
              <p style={{ margin: 0 }}>Branch: {loan.branch_name || 'N/A'} | Generated on: {new Date().toLocaleString()}</p>
            </div>
          </div>
</div>
        <form className="w-full" >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
           
            {/* Personal Information Section */}
            <Card className="md:col-span-2 lg:col-span-4 border-purple-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="md:col-span-2 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Applicant&apos;s Full Name (as per academic records)</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <User size={16} className="text-purple-500" />
                      <span>{loan.user_full_name || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Mail size={16} className="text-purple-500" />
                      <span>{loan.user_email || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Calendar size={16} className="text-purple-500" />
                      <span>{loan.user_dob || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Users size={16} className="text-purple-500" />
                      <span>{loan.user_gender || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Mobile Number</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Phone size={16} className="text-purple-500" />
                      <span>{loan.user_mobile_number || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Aadhar Number</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <FileText size={16} className="text-purple-500" />
                      <span>{loan.user_aadhar_number || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <MapPin size={16} className="text-purple-500" />
                      <span>{loan.user_city || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Pincode</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <MapPin size={16} className="text-purple-500" />
                      <span>{loan.user_pincode || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Residential Address</label>
                    <div className="flex items-start gap-2 text-gray-800">
                      <Home size={16} className="text-purple-500 mt-1" />
                      <span className="break-words">{loan.user_residentaial_address || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Branch Information */}
            <Card className="lg:col-span-2 border-purple-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Branch Information</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Branch</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <MapPin size={16} className="text-purple-500" />
                      <span>{loan.branch_name || 'N/A'}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Loan Type</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <FileText size={16} className="text-purple-500" />
                      <span>{loan.loans_type || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Family Information Section */}
            <Card className="md:col-span-2 lg:col-span-2 border-purple-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Family Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Parent / Guardian Full Name</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <User size={16} className="text-purple-500" />
                      <span>{loan.user_parents_name || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Parent&apos;s / Guardian&apos;s Occupation</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Building size={16} className="text-purple-500" />
                      <span>{loan.user_parents_occupation || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Total Annual Family Income from all sources (in INR)</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <DollarSign size={16} className="text-purple-500" />
                      <span>{loan.user_annual_income ? `₹${loan.user_annual_income}` : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Total number of dependents in the family (excluding the applicant)</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Users size={16} className="text-purple-500" />
                      <span>{loan.user_no_dependents || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Educational Background Section */}
            <Card className="md:col-span-2 lg:col-span-4 border-purple-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Educational Background</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="md:col-span-2 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Current Qualification (mention specialisation)</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <BookOpen size={16} className="text-purple-500" />
                      <span>{loan.user_college_degree || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Qualification Level</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <GraduationCap size={16} className="text-purple-500" />
                      <span>{qualificationOptions[loan.user_qualification] || loan.user_qualification || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Degree Percentage/CGPA</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <BookOpen size={16} className="text-purple-500" />
                      <span>{loan.user_degree_percentage ? `${loan.user_degree_percentage}%` : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">10th/12th Percentage</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <BookOpen size={16} className="text-purple-500" />
                      <span>{loan.user_school_percentage ? `${loan.user_school_percentage}%` : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">College Percentage</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <BookOpen size={16} className="text-purple-500" />
                      <span>{loan.user_college_percentage ? `${loan.user_college_percentage}%` : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Name of Entrance Exam Taken</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <FileText size={16} className="text-purple-500" />
                      <span>{loan.user_entrance_exam || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Entrance Exam Rank/Score</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Target size={16} className="text-purple-500" />
                      <span>{loan.user_entrance_exam_score || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course & Institution Details */}
            <Card className="md:col-span-2 lg:col-span-4 border-purple-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Course & Institution Details (For Which Loan Is Being Applied)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="md:col-span-2 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">What is the level of education you&apos;re seeking loan for?</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <GraduationCap size={16} className="text-purple-500" />
                      <span>{educationLevelOptions[loan.user_education_loan_for] || loan.user_education_loan_for || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Name of College/Institution Admitted</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Building size={16} className="text-purple-500" />
                      <span>{loan.user_college_name || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Name of the Course Admitted To</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <BookOpen size={16} className="text-purple-500" />
                      <span>{loan.user_course_name || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Course Duration (in years)</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Calendar size={16} className="text-purple-500" />
                      <span>{loan.user_course_duration ? `${loan.user_course_duration} years` : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Course Start Date</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Calendar size={16} className="text-purple-500" />
                      <span>{loan.user_course_date || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Address of the Institution</label>
                    <div className="flex items-start gap-2 text-gray-800">
                      <MapPin size={16} className="text-purple-500 mt-1" />
                      <span className="break-words">{loan.user_college_address || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Website Link & Contact Number of the Institution</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Phone size={16} className="text-purple-500" />
                      <span>{loan.user_website_number_of_college || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Total Fees of the Course (INR)</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <DollarSign size={16} className="text-purple-500" />
                      <span>{loan.user_total_fees ? `₹${loan.user_total_fees}` : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Loan Amount Required (INR)</label>
                    <div className="flex items-center gap-2 text-gray-800">
                      <DollarSign size={16} className="text-purple-500" />
                      <span>{loan.user_total_loans ? `₹${loan.user_total_loans}` : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card className="md:col-span-2 lg:col-span-4 border-purple-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Financial Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Any existing loans from any other institutions/organizations? If YES, mention the details of the loan (total loan taken, duration)</label>
                    <div className="flex items-start gap-2 text-gray-800">
                      <FileText size={16} className="text-purple-500 mt-1" />
                      <span>{loan.user_other_loans || 'N/A'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">How do you intend to repay the loan if your loan application is approved? (EMI amount, EMI start date)</label>
                    <div className="flex items-start gap-2 text-gray-800">
                      <DollarSign size={16} className="text-purple-500 mt-1" />
                      <span>{loan.user_intend_to_repay || 'N/A'}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Describe your career goals and how this education will help you contribute back to our community in the future.*</label>
                    <div className="flex items-start gap-2 text-gray-800">
                      <DollarSign size={16} className="text-purple-500 mt-1" />
                      <span>{loan.user_career_goals || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Goals */}
            

            {/* Document Upload Section */}
            <Card className="md:col-span-2 lg:col-span-4 border-purple-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Submitted Documents</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Passport Size Photo", key: "user_passport_photo", value: loan.user_passport_photo },
                    { label: "Aadhar Card Photo", key: "user_aadharcard_photo", value: loan.user_aadharcard_photo },
                    { label: "School Marksheet", key: "user_school_marksheet_photo", value: loan.user_school_marksheet_photo },
                    { label: "College Marksheet", key: "user_college_marksheet_photo", value: loan.user_college_marksheet_photo },
                    { label: "Official Fee Structure Document from the College", key: "user_college_fee_structure", value: loan.user_college_fee_structure },
                    { label: "Official Admission Letter from the College/Institution", key: "user_college_admission_letter", value: loan.user_college_admission_letter },
                    { label: "Previous year's Marksheet", key: "user_previous_year_marksheet", value: loan.user_previous_year_marksheet },
                    { label: "Any Other Relevant Documents", key: "user_other_letter", value: loan.user_other_letter },
                  ].map((doc) => (
                    <div key={doc.key} className="border border-purple-100 rounded-lg p-3 bg-purple-50 hover:bg-purple-100 transition-colors">
                      <label className="block text-sm font-medium text-gray-600 mb-2">{doc.label}</label>
                      <div className="flex gap-2">
        
                        <Button
                          size="sm"
                          type="button"
                          variant="outline"
                          onClick={() => handleViewFile(doc.value, doc.label)}
                          disabled={!doc.value}
                          className="flex items-center gap-1 border-purple-300 text-purple-700 hover:bg-purple-700 hover:text-white"
                        >
                          <Eye size={14} />
                          View
                        </Button>
                    
                      
                      </div>
                      {!doc.value && (
                        <p className="text-xs text-red-500 mt-1">Not available</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </form>

        {/* File View Dialog */}
        <Dialog open={fileDialog.open} onOpenChange={closeFileDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-purple-700">{fileDialog.title}</DialogTitle>
            </DialogHeader>
            <div className="w-full h-[70vh]">
              {fileDialog.url && (
                <iframe 
                  src={fileDialog.url} 
                  className="w-full h-full border rounded-lg"
                  title={fileDialog.title}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Page>
  );
};

export default LoanFormView;