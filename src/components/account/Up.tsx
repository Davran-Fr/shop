import { setUsersDataBase } from "@/Redux/userDataBase";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const UpdateUserName = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const updateName = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/users/588",
        {
          method: "PUT", // в EscuelaJS PUT можно частично обновлять
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "newone",
          }),
        }
      );

      const data = await response.json();
      dispatch(setUsersDataBase(data));
      console.log("Updated user:", data);
      alert("Name updated!");
    } catch (err) {
      console.error("Error updating name:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={updateName}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Updating..." : "Update Name"}
      </button>
    </div>
  );
};
