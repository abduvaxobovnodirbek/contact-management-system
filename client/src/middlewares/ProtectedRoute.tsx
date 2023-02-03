import { Navigate, useLocation } from "react-router-dom";
import Cookie from "universal-cookie";
const cookies = new Cookie();

function ProtectedRoute({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const isUserExist = cookies.get("token");
  if (!isUserExist) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}

export default ProtectedRoute;
