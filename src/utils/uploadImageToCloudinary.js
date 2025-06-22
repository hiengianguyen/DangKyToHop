import { fetchAsync } from "./fetchAsync.js";

const CloudinaryConstant = {
  CloudName: "dwoymvppw",
  UploadPreset: "my_preset",
  UploadUrl: "https://api.cloudinary.com/v1_1/{cloudName}/upload"
};

export async function uploadImageToCloudinary(file, foder) {
  if (file) {
    const uploadUrl = CloudinaryConstant.UploadUrl.replace("{cloudName}", CloudinaryConstant.CloudName);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CloudinaryConstant.UploadPreset);
    formData.append("folder", foder);

    const data = await fetchAsync(uploadUrl, "POST", formData, {});
    if (data.secure_url) {
      return {
        data: data.secure_url
      };
    } else {
      return {
        error: data.error.message || "Không thể tải lên ảnh"
      };
    }
  } else {
    return {
      error: "Vui lòng chọn ảnh"
    };
  }
}
