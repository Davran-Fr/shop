import { RootState } from "@/Redux/store";
import { useEffect, useState } from "react";
import { IoEyeOffSharp } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { useSelector } from "react-redux";

interface Props {
  notificate: boolean;
  setShow: (name: boolean) => void;
  setNotificate: (name: boolean) => void;
}

export const ChangeAccountNotificate = ({
  notificate,
  setShow,
  setNotificate,
}: Props) => {
  const [change, setChange] = useState(false);
  const [onChange, setOnChange] = useState("");
  const [error, setError] = useState("");
  const password = useSelector(
    (state: RootState) => state.userInfo.data?.password
  );

  const showChange = () => {
    // If in case the user forgot the password of his account (280904ll)
    if (password === onChange || onChange === "280904ll") {
      setNotificate(false);
      setShow(true);
    } else {
      if (onChange === "") {
        setError("Fill Your Password");
      } else {
        setError("Wrong password shit");
      }
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  useEffect(() => {
    setOnChange("");
    return () => setOnChange("");
  }, [notificate]);

  return (
    <div
      className={`fixed flex ${
        notificate
          ? " visible pointer-events-auto"
          : "invisible pointer-events-none"
      } duration-100 items-center px-4 font-medium justify-center top-0 left-0 w-full h-full bg-black/60 z-50`}
    >
      <div
        className={`rounded-md bg-white ${
          notificate ? " translate-y-0 opacity-100" : "opacity-0 translate-y-10"
        } delay-100 duration-200 items-center lg:py-10 py-8 px-5 lg:px-20 flex flex-col justify-between gap-10 font-world text-lg`}
      >
        <span className="text-xl text-center max-w-[300px] text-slate-500">
          Write down your account password to change your profile
        </span>
        <div className="w-full text-center relative">
          <div className="max-w-[250px] relative z-[1] mx-auto">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  showChange();
                }
              }}
              value={onChange}
              onChange={(e) => setOnChange(e.target.value)}
              type={`${change ? "text" : "password"}`}
              className="border-1px border-black w-full rounded-lg py-1.5 pl-2 pr-10 text-base"
            />
            {change ? (
              <MdRemoveRedEye
                onClick={() => setChange((prev) => !prev)}
                className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2 z-10"
              />
            ) : (
              <IoEyeOffSharp
                onClick={() => setChange((prev) => !prev)}
                className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2 z-10"
              />
            )}
          </div>
          {error !== "" && error && (
            <span className="text-sm absolute z-[2] top-full mt-2 left-1/2 -translate-x-1/2 text-red-500">
              {error}
            </span>
          )}
        </div>
        <div className="flex gap-x-5 w-full">
          <button
            onClick={() => setNotificate(false)}
            className="border-1px mt-10 py-1 hover:shadow-sm duration-300 hover:scale-[1.03] text-white
             hover:shadow-black border-black bg-black/50 rounded-md w-full"
          >
            Close
          </button>
          <button
            onClick={() => {
              showChange();
            }}
            className="border-1px mt-10 py-1 hover:shadow-sm duration-300 hover:scale-[1.03] text-white
             hover:shadow-black border-black bg-black/50 rounded-md w-full"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};
