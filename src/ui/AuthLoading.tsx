import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import LinearProgress from "@mui/material/LinearProgress";

const AuthLoading = () => {
  const loading = useSelector((state: RootState) => state.loadingAuth);

  return (
    <div
      className={`w-full h-full absolute top-0 left-0 ${
        !loading.loading
          ? "visible pointer-events-auto opacity-100"
          : "invisible pointer-events-none opacity-0"
      } duration-300 bg-white/80 z-30 text-center text-black flex items-center justify-between flex-col text-5xl`}
    >
      <div className="w-full">
        <LinearProgress />
      </div>
    </div>
  );
};

export default AuthLoading;
