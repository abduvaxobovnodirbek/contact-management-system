import { useAppSelector } from "../../hooks/useAppSelector";
import CustomModal from "./modal/CustomModal";
import {
  toggleEmailLoginForm,
  toggleEmailRegisterForm,
} from "../../services/ui/modalSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Login from "./Form/Login";
import Register from "./Form/Register";

const Auth = () => {
  const dispatch = useAppDispatch();
  const { showEmailLoginForm, showEmailRegisterForm } = useAppSelector(
    (state) => state.authModal
  );

  const openEmailLoginForm = () => dispatch(toggleEmailLoginForm(true));
  const openEmailRegisterForm = () => dispatch(toggleEmailRegisterForm(true));

  return (
    <CustomModal>
      <div>
        {showEmailLoginForm ? <Login /> : <Register />}
        <div>
          {showEmailLoginForm ? (
            <p className="mt-5 text-center font-serif">
              {"No accaunt?"}{" "}
              <span
                style={{
                  color: "#03776f",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={openEmailRegisterForm}
              >
                {"Create one"}
              </span>
            </p>
          ) : showEmailRegisterForm ? (
            <>
              <p className="mt-5 text-center font-serif">
                {"Already have an account?"}
              </p>
              <p
                style={{
                  color: "#03776f",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onClick={openEmailLoginForm}
              >
                {"Sign in"}
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default Auth;
