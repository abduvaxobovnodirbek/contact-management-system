import { useState, SyntheticEvent, cloneElement } from "react";
import { useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useWindowSize from "../../../hooks/useWindowSize";
import { childrenProps, TabTypes } from "../../../types";

export default function TabMenu({
  children,
  tabOptions,
}: TabTypes & childrenProps) {
  const [value, setValue] = useState(0);
  const { width } = useWindowSize();
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const location = useLocation();

  return (
    <Box
      sx={
        width > 900 && location.pathname !== "/admin/panel"
          ? { width: "65%" }
          : { width: "100%" }
      }
    >
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        position="sticky"
        top={0}
        className="!bg-white  z-50 "
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabOptions.names.map((tab, i) => (
            <Tab label={tab} key={i} className="" />
          ))}
        </Tabs>
      </Box>

      {cloneElement(children, { value })}
    </Box>
  );
}
