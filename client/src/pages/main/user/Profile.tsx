import { FaUserEdit } from "react-icons/fa";
import { toggleProfileModal } from "../../../services/ui/modalSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import UserProfile from "../../../components/userProfile/UserProfile";
import useWindowSize from "../../../hooks/useWindowSize";
import ContextWrapper from "../../../layout/ContextWrapper";
import ProfileModal from "../../../features/profile/ProfileModal";

const Profile = () => {
  const { width } = useWindowSize();
  const { currentUser } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleProfileModal(true));
  };

  return (
    <ContextWrapper
      flexOptions={`justify-between items-start ${
        width < 900 ? "w-[95%]" : ""
      }`}
    >
      <ProfileModal />

      <div className={"w-[100%] border shadow-md"}>
        <>
          <FaUserEdit
            onClick={handleClick}
            className="absolute right-[40%] !cursor-pointer"
            fontSize={30}
            color="gray"
          />
          <UserProfile user={currentUser || undefined} />
        </>
      </div>
    </ContextWrapper>
  );
};

export default Profile;
