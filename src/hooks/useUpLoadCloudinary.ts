// export const useUploadToCloudinary = async (file: File) => {
//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", "new_one");

import { useSetDeleteUrl } from "@/lib/useDeleteUrl";

//   const res = await fetch(
//     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
//     {
//       method: "POST",
//       body: data,
//     }
//   );
//   const json = await res.json();

//   return json.secure_url;
// };

export const uploadToImgbb = async (file: File) => {
  const API_KEY = "1d90a45e129f36a9c9a52bafc5cf4101";
  const formData = new FormData();

  formData.append("key", API_KEY);
  formData.append("image", file);

  try {
    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed: ${res.status}`);
    }

    const data = await res.json();
    useSetDeleteUrl(data.data.url);

    return data.data.url;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
};
