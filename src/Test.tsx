"use client";

import React, { useState } from "react";
import { storage } from "./firebase/firebase";
import {
  ref,
  UploadTaskSnapshot,
  uploadBytesResumable,
} from "firebase/storage";

export const TestUpload = () => {
  const [fileUrl, setFileUrl] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUrl(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (fileUrl) {
      const storageRef = ref(storage, `images/${fileUrl.name}`);

      const uploadTask = uploadBytesResumable(storageRef, fileUrl);

      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.error(error.message);
        },
        () => {
          alert("image uploaded successesfully");
        }
      );
    }
  };

  return (
    <div className="p-4 border rounded w-full max-w-sm mx-auto">
      <h2 className="mb-2 font-bold text-lg">Загрузка изображения</h2>
      <input type="file" onChange={handleChange} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};
