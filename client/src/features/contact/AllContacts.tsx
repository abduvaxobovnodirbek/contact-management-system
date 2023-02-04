import { Box } from "@mui/material";
import { useGetContactQuery } from "../../services/api/contact";
import ContactsTable from "./ContactsTable";

const AllContacts = () => {
  const { data: contacts, isLoading } = useGetContactQuery();

  return (
    <Box sx={{ width: "100%" }}>
      <h3
        className="text-center text-xl font-serif text-white  shadow-md p-3 mb-8"
        style={{ background: "#03776f" }}
      >
        All Contact Users
      </h3>
      <ContactsTable
        users={contacts}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default AllContacts;
