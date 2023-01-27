import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Typography, Button, Box } from "@mui/material";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import ParkingAcceptance from "./ParkingAcceptance";
import { useSnackbar } from "notistack";
export default function TotalSlot() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [slot, setSlot] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const slotChange = (e) => {
    e.preventDefault();
    setSlot(slot);
    enqueueSnackbar(`your max parking solt value is changed to ${slot}`, {
      variant: "warning",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
    handleClose();
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Stack direction="row" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={1.5}></Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Typography
              sx={{
                border: 1,
                textAlign: "center",
                p: 2,
                backgroundColor: "#FFAA33",
                color: "#FFF",
              }}
            >
              Total Parking Capacity
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Typography
              sx={{
                border: 1,
                textAlign: "center",
                p: 2,
                backgroundColor: "#228b22",
                color: "#FFF",
              }}
            >
              {slot}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ flexGrow: 1, p: 2, textTransform: "capitalize" }}
                onClick={handleClick}
              >
                Please click to Edit Parking Capacity
              </Button>
            </Box>
          </Grid>
          <Grid item xs={1.5}></Grid>
        </Grid>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Stack sx={{ p: 5 }}>
            <TextField
              label="Parking Capacity"
              variant="outlined"
              type="number"
              name="slot"
              placeholder="Enter Parking Capacity"
              onChange={(e) => setSlot(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, textTransform: "capitalize" }}
              onClick={slotChange}
            >
              Change Number of Slot
            </Button>
          </Stack>
        </Popover>
      </Stack>
      <ParkingAcceptance slot={slot} />
    </div>
  );
}
