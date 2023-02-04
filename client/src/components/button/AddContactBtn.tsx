import { BsPencilSquare } from "react-icons/bs";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NewReviewBtn = () => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/contact-create");

  };
  return (
    <>
      <IconButton
        size="small"
        aria-label="Add  new contact"
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
