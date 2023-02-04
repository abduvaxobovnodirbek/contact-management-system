import React from "react";
import AllContacts from "../../../features/contact/AllContacts";
import ContextWrapper from "../../../layout/ContextWrapper";

const UsersAllContacts = () => {
  return (
    <div>
      <ContextWrapper flexOptions={"justify-between items-start"}>
        <AllContacts />
      </ContextWrapper>
    </div>
  );
};

export default UsersAllContacts;
