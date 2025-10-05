export const InfoRow = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) => (
  <div className="flex gap-x-5">
    <p className="font-medium">{label} :</p>
    <p className={`font-ptSerif ${highlight ? "text-red-500" : ""}`}>{value}</p>
  </div>
);
