import { BsPencilSquare } from "react-icons/bs";
import { IconButton } from "@mui/material";

const NewReviewBtn = () => {
  const handleClick = (): void => {};
  return (
    <>
      <IconButton
        size="small"
        aria-label="Write new review"
        sx={{ color: "black" }}
        className=""
        onClick={handleClick}
      >
        <BsPencilSquare className="mr-3" />{" "}
        <span className="font-serif text-gray-500 text-sm">
          {"Contact"}
        </span>
      </IconButton>
    </>
  );
};

export default NewReviewBtn;
