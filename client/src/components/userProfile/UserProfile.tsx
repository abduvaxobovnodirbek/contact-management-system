import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar } from "@mui/material";
import { User } from "../../types/api";
import Cloudinary from "../cloudImage/Cloudinary";

const UserProfile = ({ user }: { user: User | undefined }) => {
  return (
    <div className="flex items-center flex-col ">
      {user?.image ? (
        <div className="!overflow-hidden !rounded-[100%] !h-[150px] !w-[150px]">
          <Cloudinary img={user?.image} />
        </div>
      ) : (
        <Avatar sx={{ background: "#03776f", width: 150, height: 150 }}>
          <AccountCircleIcon className="text-white !text-7xl" />
        </Avatar>
      )}
      <span className="text-center mt-6 font-serif font-bold text-gray-600 ">
        {user?.name}
      </span>
      <span className="px-3 text-center mt-6 font-serif text-gray-600">
        {user?.userInfo}
      </span>
    </div>
  );
};

export default UserProfile;
