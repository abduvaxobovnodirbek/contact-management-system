import { TelegramShareButton } from "react-share";
import TelegramIcon from "@mui/icons-material/Telegram";
import logo from "../../../assets/logo.png";

const Sharing = () => {
  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="flex justify-center items-center">
        <img src={logo} alt="logo" className="w-[30%] cursor-pointer " />
        <span className="mx-2 font-serif text-2xl text-black">+</span>
        <TelegramIcon sx={{ color: "#03776f" }} fontSize="large" />
      </div>
      <h3
        className="ml-2 font-serif text-lg font-bold italic text-center"
        style={{ color: "#03776f" }}
      >
        Invite Friends
      </h3>
      <TelegramShareButton
        url={"http://localhost:3000"}
        className="mt-3 mb-3 !px-4 !py-1 text-white rounded-2xl"
        style={{
          border: "1px solid blue !important",
          background: "#03776f",
          color: "#fff !important",
        }}
      >
        Share with Telegram
      </TelegramShareButton>
    </div>
  );
};

export default Sharing;
