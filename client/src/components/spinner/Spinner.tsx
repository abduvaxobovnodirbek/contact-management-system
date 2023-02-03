import { Spin } from "antd";

const Spinner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Spin
      spinning={isLoading}
      size={"large"}
      className="!w-screen !h-screen fixed z-50 top-0 left-0 flex justify-center items-center"
      style={{ background: "#f8fcffa9" }}
    />
  );
};

export default Spinner;
