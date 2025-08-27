export const useUploadToCloudinary = async (file: File ) => {
  const data = new FormData();
  data.append("file", file );
  data.append("upload_preset", "unsigned_present");
  
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_KEY}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );
  const json = await res.json();
  
  return json.secure_url;
};
