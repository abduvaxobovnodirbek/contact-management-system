import { Button } from "antd";
import { CgSearchFound } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="text-gray-600 mt-24 font-serif flex justify-center flex-col items-center">
        <CgSearchFound className="text-gray-200 text-[100px]" />
        <div className="text-center ">
          <h3>{"The result is not found"} </h3>
          <p>{"You may go back to main page"}</p>
        </div>
        <Button className=" mt-3" onClick={() => navigate("/")}>
          {"Main page"}
        </Button>
      </div>
    </div>
  );
};

export default Error;
