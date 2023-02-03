import * as React from "react";
import { Fade } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import { childrenProps } from "../../../types";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { toggleModal } from "../../../services/ui/modalSlice";
import logo from "../../../assets/logo.png";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

export default function CustomModal({ children }: childrenProps) {
  const { showModal, showEmailLoginForm, showEmailRegisterForm } =
    useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    dispatch(toggleModal(false));
  };

  return (
    <div>
      <Dialog
        open={showModal}
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
        <DialogTitle className="flex justify-center  items-center relative top-10">
          <span className="mr-2 font-serif text-md text-slate-600">Join</span>{" "}
          <img src={logo} className="w-[100px]" alt="logo" />
        </DialogTitle>
        {showEmailLoginForm ? (
          <DialogTitle
            className="flex justify-center  relative top-5"
            sx={{ color: "#03776f" }}
          >
            <span className="font-serif text-center">
              {" "}
              {"Sign in with email and password"}
            </span>
          </DialogTitle>
        ) : showEmailRegisterForm ? (
          <DialogTitle
            className="flex justify-center  relative top-5"
            sx={{ color: "#03776f" }}
          >
            <span className="font-serif text-center">
              {" "}
              {"Register with email and password"}
            </span>
          </DialogTitle>
        ) : (
          ""
        )}
        <DialogContent className="mt-7">{children}</DialogContent>
      </Dialog>
    </div>
  );
}
