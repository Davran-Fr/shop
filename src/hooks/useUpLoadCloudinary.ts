// export const useUploadToCloudinary = async (file: File) => {
//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", "new_one");

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
import { useGetDeleteUrl, useSetDeleteUrl } from "@/lib/useDeleteUrl";

export const uploadToImgbb = async (file: File) => {
  const API_KEY = "1d90a45e129f36a9c9a52bafc5cf4101";
  const formData = new FormData();
  const deleteUrl = useGetDeleteUrl();

  formData.append("key", API_KEY);
  formData.append("image", file);

  try {
    const res = await fetch(`${deleteUrl}`, {
      method: "GET",
    });
    if (res.ok) {
      console.log("✅ Картинка удалена!");
    } else {
      console.error("❌ Ошибка при удалении:", res.status);
    }
  } catch (err) {
    console.error("⚠️ Ошибка сети:", err);
  }

  try {
    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed: ${res.status}`);
    }

    const data = await res.json();
    useSetDeleteUrl(data.data.delete_url);

    return data.data.url;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
};
