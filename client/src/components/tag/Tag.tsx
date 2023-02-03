import Chip from "@mui/material/Chip";

export default function Tag({
  label,
  handleClick,
}: {
  label: string;
  handleClick?: (e: any) => void;
}) {
  return handleClick ? (
    <Chip label={label} onClick={handleClick} className="" />
  ) : (
    <Chip label={label} className="" />
  );
}
