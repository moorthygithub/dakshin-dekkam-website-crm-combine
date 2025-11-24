import { useState, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  FileText,
  Building,
  Loader,
  User,
  Calendar,
  Clock,
  DollarSign,
  Receipt,
  CheckCircle
} from 'lucide-react';

const BhavanForm = () => {
  const [formData, setFormData] = useState({
    folio_no: '',
    hall_inv_no: '',
    regt_no: '',
    booking_date: '',
    guest_name: '',
    company_name: '',
    contact_mobile: '',
    landline_no: '',
    address: '',
    email: '',
    function_type: '',
    no_of_days: '',
    checkin_date: '',
    checkin_time: '',
    checkout_date: '',
    checkout_time: '',
    no_of_guests: '',
    hall_rent: '',
    electricity_charges: '',
    generator_charges: '',
    water_charges: '',
    lpg_charges: '',
    housekeeping_charges: '',
    advance_received: '',
    receipt_no: '',
    receipt_date: '',
    special_instructions: '',
    terms_accepted: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('guest');

  const fieldRefs = {
    guest_name: useRef(null),
    contact_mobile: useRef(null),
    email: useRef(null),
    function_type: useRef(null),
    checkin_date: useRef(null),
    checkin_time: useRef(null),
    checkout_date: useRef(null),
    checkout_time: useRef(null),
    no_of_guests: useRef(null)
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'contact_mobile' || name === 'landline_no') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
        setErrors({ ...errors, [name]: '' });
      }
      return;
    }

    if (name === 'no_of_guests' || name === 'advance_received') {
      const numericValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: numericValue });
      setErrors({ ...errors, [name]: '' });
      return;
    }

    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.guest_name?.trim()) newErrors.guest_name = 'Guest name is required';
    if (!formData.contact_mobile) {
      newErrors.contact_mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.contact_mobile)) {
      newErrors.contact_mobile = 'Enter a valid 10-digit number';
    }
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.function_type?.trim()) newErrors.function_type = 'Function type is required';
    if (!formData.checkin_date) newErrors.checkin_date = 'Check-in date is required';
    if (!formData.checkin_time) newErrors.checkin_time = 'Check-in time is required';
    if (!formData.checkout_date) newErrors.checkout_date = 'Check-out date is required';
    if (!formData.checkout_time) newErrors.checkout_time = 'Check-out time is required';
    if (!formData.no_of_guests) newErrors.no_of_guests = 'Number of guests is required';
    if (!formData.terms_accepted) newErrors.terms_accepted = 'You must accept the terms and conditions';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const ref = fieldRefs[firstErrorKey];
      if (ref?.current) {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Banquet order submitted successfully!');
    }, 2000);
  };

  const sectionButtons = [
    { id: 'guest', label: 'Guest Details', icon: User },
    { id: 'booking', label: 'Booking Details', icon: Calendar },
    { id: 'commercial', label: 'Commercial Terms', icon: DollarSign },
    { id: 'terms', label: 'Terms & Conditions', icon: CheckCircle }
  ];

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50  my-4 overflow-hidden">

      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="text-center flex flex-row items-center justify-between mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-500 rounded-md flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Kutchi Bhavan</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 bg-yellow-100 inline-block px-4 py-2 rounded-md">
            BANQUET ORDER FORM
          </h2>
        </div>
        
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
          {[
            { label: 'Folio No.', name: 'folio_no', placeholder: 'Folio number' },
            { label: 'Hall Inv. No.', name: 'hall_inv_no', placeholder: 'Hall invoice' },
            { label: 'Regt. No.', name: 'regt_no', placeholder: 'Registration' },
            { label: 'Booking Date', name: 'booking_date', type: 'date' }
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <span className="font-medium text-gray-600 text-xs mb-1">{field.label}</span>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>

     
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-center">
            <p className="font-semibold text-blue-800 text-sm">DAKSHIN BHARAT KUTCHI DASHA OSWAL JAIN EKKAM</p>
            <p className="text-gray-600 text-xs mt-1">No. 448, 1st Main Road, Opp. Mini Forest, JP Nagar 3rd Phase, Bangalore – 560 078</p>
            <div className="flex flex-wrap justify-center items-center gap-3 mt-2 text-xs">
              {[
                { icon: Phone, text: '080-26589759' },
                { icon: FileText, text: '080-26589759 / 8722820426' },
                { icon: Mail, text: 'dbkodc.jainakery@yahoo.in' },
                { icon: Building, text: 'www.kutchibhavan.com' }
              ].map((item, index) => (
                <span key={index} className="flex items-center gap-1 bg-white px-2 py-1 rounded">
                  <item.icon className="w-3 h-3 text-blue-600" />
                  <span className="text-gray-700">{item.text}</span>
                </span>
              ))}
              <span className="text-gray-500 italic bg-white px-2 py-1 rounded">Est. 1978</span>
            </div>
          </div>
        </div>
      </div>

 
      <div className="bg-white border-b border-gray-200 px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {sectionButtons.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                  activeSection === section.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-8 py-6">
      
        {(activeSection === 'guest' || activeSection === 'all') && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Name of the Guest', name: 'guest_name', icon: User, required: true, ref: fieldRefs.guest_name },
                { label: "Company's Name", name: 'company_name', icon: Building },
                { label: 'Contact Mob No', name: 'contact_mobile', icon: Phone, required: true, ref: fieldRefs.contact_mobile },
                { label: 'Landline No', name: 'landline_no', icon: Phone },
                { label: 'Email', name: 'email', type: 'email', icon: Mail, required: true, ref: fieldRefs.email }
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="font-medium text-gray-700 text-sm mb-2 flex items-center gap-1">
                    {field.icon && <field.icon className="w-4 h-4 text-blue-600" />}
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    ref={field.ref}
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                  {errors[field.name] && <span className="text-red-500 text-xs mt-1">{errors[field.name]}</span>}
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 text-sm mb-2 flex items-center gap-1">
                <User className="w-4 h-4 text-blue-600" />
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter complete address"
              />
            </div>
          </div>
        )}

      
        {(activeSection === 'booking' || activeSection === 'all') && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Type of Function', name: 'function_type', icon: Calendar, required: true, ref: fieldRefs.function_type },
              { label: 'No. of Days', name: 'no_of_days', icon: Calendar },
              { label: 'Check In Date', name: 'checkin_date', type: 'date', icon: Calendar, required: true, ref: fieldRefs.checkin_date },
              { label: 'Check In Time', name: 'checkin_time', type: 'time', icon: Clock, required: true, ref: fieldRefs.checkin_time },
              { label: 'Check Out Date', name: 'checkout_date', type: 'date', icon: Calendar, required: true, ref: fieldRefs.checkout_date },
              { label: 'Check Out Time', name: 'checkout_time', type: 'time', icon: Clock, required: true, ref: fieldRefs.checkout_time },
              { label: 'No. of Guests expected', name: 'no_of_guests', icon: User, required: true, ref: fieldRefs.no_of_guests }
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="font-medium text-gray-700 text-sm mb-2 flex items-center gap-1">
                  {field.icon && <field.icon className="w-4 h-4 text-blue-600" />}
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  ref={field.ref}
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                {errors[field.name] && <span className="text-red-500 text-xs mt-1">{errors[field.name]}</span>}
              </div>
            ))}
          </div>
        )}

       
        {(activeSection === 'commercial' || activeSection === 'all') && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Hall Rent', name: 'hall_rent', icon: DollarSign },
                { label: 'Electricity Charges', name: 'electricity_charges', icon: DollarSign, placeholder: 'Rs. ___ / unit' },
                { label: 'Generator charges', name: 'generator_charges', icon: DollarSign },
                { label: 'Water charges', name: 'water_charges', icon: DollarSign },
                { label: 'LPG Cylinder Charges', name: 'lpg_charges', icon: DollarSign },
                { label: 'House Keeping Charges', name: 'housekeeping_charges', icon: DollarSign },
                { label: 'Advance Received Rs.', name: 'advance_received', icon: Receipt },
                { label: 'Receipt No.', name: 'receipt_no', icon: Receipt },
                { label: 'Receipt Date', name: 'receipt_date', type: 'date', icon: Calendar }
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="font-medium text-gray-700 text-sm mb-2 flex items-center gap-1">
                    {field.icon && <field.icon className="w-4 h-4 text-blue-600" />}
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 text-sm mb-2">SPECIAL INSTRUCTIONS:</label>
              <textarea
                name="special_instructions"
                value={formData.special_instructions}
                onChange={handleChange}
                rows="3"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter any special instructions"
              />
            </div>
          </div>
        )}

      
        {(activeSection === 'terms' || activeSection === 'all') && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Terms & Conditions</h3>
              
              <div className="text-sm text-gray-700 space-y-3 max-h-96 overflow-y-auto pr-4">
                {[
                  "TOTAL 18% GST will be charged.",
                  "Payment terms: 50% advance at the time of booking and the balance 50% to be paid 3 days before the function date. Under no circumstances the possession of the hall will be given without the payment of the entire hall rent and the security deposit.",
                  "Security deposit of Rs. 20,000/- is to be paid 3 days before the function date.",
                  "Any damages to the property shall be paid by the client at prevailing market value.",
                  "(a) Cancellation made before 90 days from the date of function 10% of the hall rent will be deducted.",
                  "(b) Cancellation made between 61 days to 90 days 25% of the hall rent will be deducted.",
                  "(c) Cancellation made between 31 days to 60 days 50% of the hall rent will be deducted.",
                  "(d) No cancellation will be accepted less than 30 days from the date of function. If so, the entire hall rent will be forfeited.",
                  "Hall cancellations shall be considered in writing only from the host and the same should be acknowledged by the G.M. or the Management.",
                  "Usage of extra hours is permissible only if the hall is available at the hour and the cost for the additional hour will be charged @ Rs. 5,000/- per hour.",
                  "The hall timings will be from 6:00 a.m. to 12:00 midnight, which will be as one day.",
                  "The possession of the hall and the kitchen will be given strictly at the time mentioned above and only when supported by the Photo ID Card / facsimile of the banquet order form."
                ].map((term, index) => (
                  <p key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{term}</span>
                  </p>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="terms_accepted"
                    checked={formData.terms_accepted}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                  />
                  <label className="text-sm text-gray-700">
                    I have gone through the above Terms and Conditions and accept the same.
                  </label>
                </div>
                {errors.terms_accepted && <span className="text-red-500 text-sm">{errors.terms_accepted}</span>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 text-sm mb-2">Date:</label>
                    <input
                      type="date"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700 text-sm mb-2">Signature of Guest:</label>
                    <div className="border-b-2 border-gray-400 h-10 flex items-end pb-1">
                      <span className="text-gray-500 text-sm">(Signature area)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <div className="flex gap-2">
            {sectionButtons.map((section, index) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeSection === section.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition flex items-center justify-center gap-2 min-w-[200px] ${
              loading ? 'cursor-not-allowed opacity-70' : ''
            }`}
          >
            {loading && <Loader className="w-5 h-5 animate-spin" />}
            {loading ? 'Submitting...' : 'Submit Banquet Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BhavanForm;