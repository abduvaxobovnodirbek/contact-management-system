import { Box } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useGetAllUsersQuery } from "../../../services/api/admin";
import { toggleProfileModal } from "../../../services/ui/modalSlice";
import { User } from "../../../types/api";
import ProfileModal from "../../profile/ProfileModal";
import UsersTable from "./UsersTable";

const AllUsers = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [user, setUser] = useState<User | undefined>(undefined);
  const dispatch = useAppDispatch();
  
  const handleShowProfile = () => {
    dispatch(toggleProfileModal(true));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <h3
        className="text-center text-xl font-serif text-white  shadow-md p-3 mb-8"
        style={{ background: "#03776f" }}
      >
        All Registered Users
      </h3>
      <UsersTable
        users={users}
        isLoading={isLoading}
        setUser={setUser}
        handleShowProfile={handleShowProfile}
      />
      <ProfileModal user={user} />
    </Box>
  );
};

export default AllUsers;
