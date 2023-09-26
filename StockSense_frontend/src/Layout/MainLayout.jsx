import {
  AppBar,
  Drawer,
  Grid,
  IconButton,
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
import { Outlet, useNavigate } from "react-router-dom";
import EnhancedTable from "../components/MUI_Table_example";
import Home from "../Page/Home";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = "15%";
export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "#8E9CD3",
            width: "100%",
          }}
        >
          <Grid container sx={{ display:'flex'}}>
            <Grid item xs={11}>
            <Toolbar>
              <Typography variant="h5" sx={{ color: "#050418" }}>
                StockSense
              </Typography>
            </Toolbar>
            </Grid>
            <Grid item xs={1} sx={{ alignItems: "center"}}>
            <IconButton
              sx={{ color: "#ffffff", top : 12, right : 0 }}
              onClick={() => navigate("/")}
              >
              <LogoutIcon />
            </IconButton>
              </Grid>
          </Grid>
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
