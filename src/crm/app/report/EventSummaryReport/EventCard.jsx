import moment from "moment";

export default function EventCard({ eventdetails }) {
  const data = eventdetails?.data || {};
  const statusColor =
    data.event_status === "Active" ? "bg-green-100" : "bg-red-200";

  // --- Build Image URL ---
  const baseImageUrl = eventdetails?.image_url?.find(
    (img) => img.image_for === "Event"
  )?.image_url;
  const noImageUrl = eventdetails?.image_url?.find(
    (img) => img.image_for === "No Image"
  )?.image_url;

  const eventImage = data.event_image
    ? `${baseImageUrl}${data.event_image}`
    : noImageUrl;

  return (
    <div className="max-w-2xl mx-auto border rounded-xl shadow-sm overflow-hidden bg-white">
      {/* Header */}
      <div className={`px-4 py-3 ${statusColor} border-b flex justify-between`}>
        <h2 className="text-lg font-semibold">{data.event_name || ""}</h2>
        <p className="text-xs text-gray-600 mt-2">{data.event_status}</p>
      </div>

      <div className="flex flex-col sm:flex-row p-4 gap-4 border-b">
        {/* Left: Image */}
        <div className="sm:w-1/3 w-full h-40 sm:h-48 overflow-hidden rounded-lg border">
          <img
            src={eventImage}
            alt={data.event_name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="sm:w-2/3 w-full space-y-3">
          <Detail label="Member Allowed" value={data.event_member_allowed} />
          <Detail
            label="No. Member Allowed"
            value={data.event_no_member_allowed}
          />
          <Detail
            label="From Date"
            value={
              data.event_from_date
                ? moment(data.event_from_date).format("DD MMM YYYY")
                : "-"
            }
          />
          <Detail
            label="To Date"
            value={
              data.event_to_date
                ? moment(data.event_to_date).format("DD MMM YYYY")
                : "-"
            }
          />
          <Detail label="Payment" value={data.event_payment} />
          {(data.event_payment === "Cash" ||
            data.event_payment === "Online") && (
            <Detail label="Amount" value={data.event_amount} border={false} />
          )}
        </div>
      </div>
      <div className="flex border-b py-2 px-2">
        <span className="font-medium text-sm text-gray-700">Description</span>
        <span className="text-sm text-gray-800">
          : {data.event_description || "-"}
        </span>
      </div>
      {/* Totals Section */}
      <div className="p-4 space-y-3 bg-gray-50">
        <TotalRow label="Registered" value={eventdetails.totalRegister} />
        <TotalRow label="Attended" value={eventdetails.totalAttend} />
        <TotalRow
          label="Not Scanned"
          value={eventdetails.totalregisterNotScanned}
        />
        <TotalRow
          label="Not Registered"
          value={eventdetails.totalNotregister}
        />
      </div>
    </div>
  );
}

/* Reusable detail row */
function Detail({ label, value, border = true }) {
  return (
    <div className={`flex justify-between ${border && "border-b"}  pb-1`}>
      <span className="font-medium text-sm text-gray-700">{label}</span>
      <span className="text-sm text-gray-800">{value || "-"}</span>
    </div>
  );
}

/* Reusable totals row */
function TotalRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-semibold text-indigo-600">{value}</span>
    </div>
  );
}
