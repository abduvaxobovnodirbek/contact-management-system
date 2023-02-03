import { Routes, Route } from "react-router-dom";
import Header from "./layout/header/Header";
import routes from "./routes/Routes";
import AuthModal from "./features/auth/index";
import useEffectOnce from "./hooks/useEffectOnce";
import Cookies from "universal-cookie";
import { getCurrentUser } from "./services/api/user";
import { useAppDispatch } from "./hooks/useAppDispatch";
import ProtectedRoute from "./middlewares/ProtectedRoute";

const App = () => {
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    const cookie = new Cookies();
    if (cookie.get("token")) {
      dispatch(getCurrentUser());
    }
  });
  return (
    <div>
      <div>
        <Header />
        <AuthModal />
        <Routes>
          {routes.map((item, index) => {
            if (item.protected) {
              return (
                <Route
                  path={item.path}
                  key={index}
                  element={<ProtectedRoute>{<item.element />}</ProtectedRoute>}
                />
              );
            } else {
              return (
                <Route
                  path={item.path}
                  element={<item.element />}
                  key={index}
                />
              );
            }
          })}
        </Routes>
      </div>
    </div>
  );
};

export default App;
