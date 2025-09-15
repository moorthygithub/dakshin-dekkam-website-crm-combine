import toast from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";

const ToastContainer = ({ type, message, t }) => {
  const isSuccess = type === "success";

  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg flex items-center p-4 border-l-4 ${
        isSuccess ? "border-green-500" : "border-red-500"
      }`}
    >
      <div className="flex-shrink-0">
        {isSuccess ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <XCircle className="w-6 h-6 text-red-500" />
        )}
      </div>
      <div className="flex-1 ml-3">
        <p className="text-sm font-medium text-gray-800">{message}</p>
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="ml-4 text-gray-500 hover:text-gray-700 font-bold"
      >
        ✕
      </button>
    </div>
  );
};

export const showSuccessToast = (message) => {
  toast.custom((t) => <ToastContainer type="success" message={message} t={t} />);

  // Confetti
  import("canvas-confetti").then((confetti) => {
    confetti.default({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  });
};

export const showErrorToast = (message) => {
  toast.custom((t) => <ToastContainer type="error" message={message} t={t} />);


};
