import { Button } from "antd";
import { authButton } from "../../types/index";

const CustomButton = ({ icon, text, handleFunc }: authButton) => {
  return (
    <Button
      className="ant-btn w-[205px] flex h-[38px] items-center rounded-2xl "
      onClick={handleFunc}
    >
      <img src={icon} alt={text + " icon"} />{" "}
      <span className="ml-2">{text}</span>
    </Button>
  );
};

export default CustomButton;
