import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Parking from "../assests/2343894.png";
import Stack from "@mui/material/Stack";
export default function Heading() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Stack direction="row" sx={{ justifyContent: "center" }}>
            <img src={Parking} alt="" height="75" />
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{ mt: 4, ml: 1 }}
            >
              Parking Lots
            </Typography>
          </Stack>
        </AppBar>
      </Box>
    </div>
  );
}
