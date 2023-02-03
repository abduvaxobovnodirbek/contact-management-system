import { useState, MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import useWindowSize from "../../hooks/useWindowSize";
import logo from "../../assets/logo.png";
import { renderMenu, renderMobileMenu, menuId, mobileMenuId } from "./Menu";
import AddContactBtn from "../../components/button/AddContactBtn";
import Cloudinary from "../../components/cloudImage/Cloudinary";
import SearchCustom from "../../components/searchInput/SearchCustom";
import SignIn from "../../features/auth/button/SignIn";
import { isAuthenticated } from "../../utils/AuthUserDefiner";
import { useAppSelector } from "../../hooks/useAppSelector";
import { User } from "../../types/api";
import { removeCurrentUser } from "../../services/api/user";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import useEffectOnce from "../../hooks/useEffectOnce";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const cookie = new Cookies();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    if (!cookie.get("user_basket")) {
      cookie.set("user_basket", []);
    }
  });

  const { currentUser } = useAppSelector((state) => state.users);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (route: string) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate(route);
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    cookie.remove("token");
    cookie.remove("role");
    dispatch(removeCurrentUser());
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          elevation={1}
          className="!bg-white !text-black "
        >
          <Toolbar>
            <img
              src={logo}
              alt="logo"
              onClick={() => navigate("/")}
              className="w-[100px]  cursor-pointer"
            />
            <SearchCustom />
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { sm: "none", xs: "none", md: "flex" } }}>
              {isAuthenticated() && currentUser ? (
                <AddContactBtn />
              ) : (
                <SignIn />
              )}

              {isAuthenticated() && currentUser ? (
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  {currentUser?.image ? (
                    <div className="overflow-hidden w-[35px] h-[35px] rounded-full">
                      <Cloudinary img={currentUser?.image} />
                    </div>
                  ) : (
                    <Avatar
                      sx={{ background: "#03776f", width: 35, height: 35 }}
                    >
                      <span>{currentUser.name.slice(0, 1)}</span>
                    </Avatar>
                  )}
                </IconButton>
              ) : (
                ""
              )}
            </Box>

            {width < 900 ? (
              <>
                {isAuthenticated() && currentUser ? (
                  <AddContactBtn />
                ) : (
                  <SignIn />
                )}
              </>
            ) : (
              ""
            )}

            {isAuthenticated() && currentUser ? (
              <Box sx={{ display: { sm: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  className=""
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            ) : (
              ""
            )}
          </Toolbar>

          {isAuthenticated() && currentUser
            ? renderMobileMenu({
                mobileMoreAnchorEl,
                isMobileMenuOpen,
                handleMobileMenuClose,
                handleProfileMenuOpen,
                user: currentUser as User,
              })
            : ""}

          {isAuthenticated() && currentUser
            ? renderMenu({
                anchorEl,
                isMenuOpen,
                handleMenuClose,
                user: currentUser as User,
                handleLogout,
                location,
              })
            : ""}
        </AppBar>
      </Box>
    </>
  );
}
