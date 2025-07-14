import { QuickViewProps } from "./QuickView";

export const dates = ({ data, openClose, loading }: QuickViewProps) => {
  if (!data && !openClose && !loading) return null;
  return {
    data,
  };
};
