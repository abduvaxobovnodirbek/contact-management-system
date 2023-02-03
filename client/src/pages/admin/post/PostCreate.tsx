import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "../../../features/post_create/Form";
import Stepper from "../../../features/post_create/stepper/Stepper";
import { useAppSelector } from "../../../hooks/useAppSelector";
import useWindowSize from "../../../hooks/useWindowSize";
import ContextWrapper from "../../../layout/ContextWrapper";

const PostCreate = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.users);
  useEffect(() => {
    if (currentUser && currentUser.role !== "super_admin") {
      navigate("/");
    }
  }, [currentUser, navigate]);
  const { width } = useWindowSize();
  return (
    <div className="min-h-screen">
      <ContextWrapper
        flexOptions={`w-[90%] ${
          width > 1000 ? "justify-between" : "flex-col items-center"
        }`}
      >
        <Stepper />
        <FormComponent />
      </ContextWrapper>
    </div>
  );
};

export default PostCreate;
