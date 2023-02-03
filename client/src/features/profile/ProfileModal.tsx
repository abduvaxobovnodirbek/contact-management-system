import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import { Fade } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleProfileModal } from "../../services/ui/modalSlice";

import ProfileForm from "./ProfileForm";
import { User } from "../../types/api";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

export default function ProfileModal({ user }: { user?: User }) {
  const { showProfileModal } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();
  const handleClose = (): void => {
    dispatch(toggleProfileModal(false));
  };

  return (
    <div>
      <Dialog
        open={showProfileModal}
        TransitionComponent={Transition}
        keepMounted
        transitionDuration={500}
        BackdropProps={{ style: { backgroundColor: "#ffffffcf" } }}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            boxShadow: "black 0px 0px 7px 0px #505050",
            width: "500px",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <DialogTitle
          className="relative top-5 w-[100%]"
          sx={{ color: "#03776f" }}
        >
          <p className="font-serif text-center w-[100%]">Edit Profile</p>
        </DialogTitle>
        <DialogContent className="mt-12">
          <ProfileForm user={user} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
