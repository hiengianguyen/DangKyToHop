const CloudinaryConstant = {
  CloudName: "dwoymvppw",
  UploadPreset: "my_preset",
  UploadUrl: "https://api.cloudinary.com/v1_1/{cloudName}/upload"
};

function uploadImageToCloudinary(file, foder) {
  return new Promise((resolve, reject) => {
    if (file) {
      const uploadUrl = CloudinaryConstant.UploadUrl.replace("{cloudName}", CloudinaryConstant.CloudName);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CloudinaryConstant.UploadPreset);
      formData.append("folder", foder);

      fetch(uploadUrl, {
        method: "POST",
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.secure_url) {
            resolve(data.secure_url);
          } else {
            reject(data.error.message || "Không thể tải lên ảnh");
          }
        })
        .catch((error) => {
          reject("Lỗi tải ảnh lên Cloudinary: " + error);
        });
    } else {
      reject("Vui lòng chọn ảnh");
    }
  });
}
