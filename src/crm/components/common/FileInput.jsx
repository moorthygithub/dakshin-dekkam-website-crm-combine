import { ButtonConfig } from "@/crm/config/ButtonConfig";
import { Input } from "@/crm/components/ui/input";
import { Upload as UploadIcon } from "lucide-react";

const FileInput = ({
  accept = "image/*",
  buttonText = "Upload Image",
  openCropper,
}) => {
  const handleChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      openCropper(file);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className={`text-sm font-medium ${ButtonConfig.cardLabel}`}>
        {buttonText}
        <span className="text-red-500">*</span>
      </label>
      <div className="relative w-full">
        <Input
          type="file"
          accept={accept}
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleChange}
        />
        <div className="flex items-center justify-center w-full py-[6px] px-3 border rounded-md text-gray-700 bg-white cursor-pointer">
          <UploadIcon className="h-4 w-4 mr-2" />
          {buttonText}
        </div>
      </div>
    </div>
  );
};

export default FileInput;
