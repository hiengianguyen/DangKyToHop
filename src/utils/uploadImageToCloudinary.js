function uploadImageToCloudinary(file, foder) {
  return new Promise((resolve, reject) => {
    if (file) {
      const cloudName = "dwoymvppw";
      const uploadPreset = "my_preset";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", foder);

      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
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
