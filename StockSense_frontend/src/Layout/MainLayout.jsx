import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import EnhancedTable from "../components/MUI_Table_example";
import Home from "../Page/Home";

const drawerWidth = "15%";
export default function MainLayout() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "#8E9CD3",
          }}
        >
          <Toolbar>
            <Typography variant="h5" sx={{ color: "#050418" }}>
              StockSense
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="main-con">
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
        </div>
      </Box>
    </>
  );
}
