import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Button, Box } from "@mui/material";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
export default function ParkingAcceptance({ slot }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [registrationNumber, setRegistrationNumber] = useState();
  const [vehicleColor, setVehicleColor] = useState();
  const [removeSlot, setRemoveSlot] = useState();
  const [filterData, setFilterData] = React.useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [theArray, setTheArray] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event) => {
    setFilterData(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickExit = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleCloseExit = () => {
    setAnchorEl1(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const booking = (e) => {
    e.preventDefault();
    let nums = [];
    let ans = 1;
    if (theArray.length < slot) {
      for (let i = 0; i < theArray.length; i++) {
        nums.push(theArray[i][0]);
      }
      nums.sort((a, b) => a - b);
      for (let i = 0; i < nums.length; i++) {
        // eslint-disable-next-line
        if (nums[i] == ans) ans++;
      }
      setTheArray((oldArray) => [
        ...oldArray,
        [ans, "booked", registrationNumber, vehicleColor],
      ]);

      setNewArray((oldArray) => [
        ...oldArray,
        [ans, "booked", registrationNumber, vehicleColor],
      ]);
      enqueueSnackbar(`Your parking slot is Booked at slot Number ${ans} `, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar(`All parking slot is fiiled! `, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
    handleClose();
  };

  const exiting = (e) => {
    e.preventDefault();
    for (let index = 0; index < theArray.length; index++) {
      // eslint-disable-next-line
      if (theArray[index][0] == removeSlot) {
        theArray.splice(index, 1);
        setTheArray(theArray);
        setNewArray(theArray);
      }
    }
    enqueueSnackbar(
      `you have successfully removed your Vehicle from slot ${removeSlot} `,
      {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      }
    );
    handleCloseExit();
  };

  const FilterByColor = () => {
    if (filterData && inputSearch.length > 0) {
      setTheArray(newArray);
      setTheArray(
        theArray.filter((park) =>
          park[3]
            .toLowerCase()
            .includes(filterData && inputSearch.toLowerCase())
        )
      );
    }
  };

  const FilterByRegistration = () => {
    if (filterData && inputSearch.length > 0) {
      setTheArray(newArray);
      setTheArray(
        theArray.filter((park) =>
          park[2]
            .toLowerCase()
            .includes(filterData && inputSearch.toLowerCase())
        )
      );
    }
  };
  const filterSearch = (e) => {
    e.preventDefault();
    if (filterData === "vehicleColor") {
      FilterByColor();
    } else if (filterData === "All") {
      setTheArray(newArray);
    } else {
      FilterByRegistration();
    }
    enqueueSnackbar(`you have successfully applied filter `, {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const id = open ? "simple-popover" : undefined;
  const id1 = open1 ? "simple-popover" : undefined;

  return (
    <div>
      <Stack direction="row" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={1.5}></Grid>
          <Grid item xs={12} md={4.5} lg={4.5}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                sx={{ flexGrow: 1, p: 3, textTransform: "capitalize" }}
                variant="contained"
                color="success"
                onClick={handleClick}
              >
                Please click to Book Parking for your Vehicle
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4.5} lg={4.5}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                sx={{ flexGrow: 1, p: 3, textTransform: "capitalize" }}
                variant="contained"
                color="error"
                onClick={handleClickExit}
              >
                Please click to Remove your vehicle from Parking
              </Button>
            </Box>
          </Grid>
          <Grid item xs={1.5}></Grid>
        </Grid>
      </Stack>
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
            label="Registration Number"
            variant="outlined"
            type="text"
            name="RegistrationNumber"
            placeholder="Enter Registration Number"
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
          <TextField
            label="Vehicle Color"
            variant="outlined"
            type="text"
            name="VehicleColor"
            placeholder="Enter Vehicle Color"
            onChange={(e) => setVehicleColor(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2, textTransform: "capitalize" }}
            onClick={booking}
          >
            Book
          </Button>
        </Stack>
      </Popover>
      <Popover
        id={id1}
        open={open1}
        anchorEl={anchorEl1}
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
            label="Remove Solt"
            variant="outlined"
            type="Number"
            name="RemoveSlot"
            placeholder="Enter Slot Number"
            onChange={(e) => setRemoveSlot(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2, textTransform: "capitalize" }}
            onClick={exiting}
          >
            Leave
          </Button>
        </Stack>
      </Popover>
      <Grid container spacing={2}>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Box sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} lg={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Filter Data
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterData}
                    label="Filter Data"
                    onChange={handleChange}
                  >
                    <MenuItem value="registrationNumber">
                      Registration Number
                    </MenuItem>
                    <MenuItem value="vehicleColor">Vehicle Color</MenuItem>
                    <MenuItem value="All">All Data</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <TextField
                  fullWidth
                  label="Search Here"
                  variant="outlined"
                  type="text"
                  name="SearchHere"
                  placeholder="Enter Text Here"
                  onChange={(e) => setInputSearch(e.target.value)}
                  disabled={filterData === "All" ? true : false}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Box sx={{ display: "flex" }}>
                  <Button
                    sx={{ flexGrow: 1, p: 2, textTransform: "capitalize" }}
                    color="secondary"
                    variant="contained"
                    onClick={filterSearch}
                  >
                    Please click to Search Your Vehicle
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 5, mb: 3 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#000" }}>
                    <TableCell sx={{ color: "#fff" }}> Filled Slots</TableCell>
                    <TableCell align="right" sx={{ color: "#fff" }}>
                      Status
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#fff" }}>
                      Registration Number
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#fff" }}>
                      Vehicle Color
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {theArray.map((row) => (
                    <TableRow
                      key={row[0]}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row[0]}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#FF0000" }}>
                        {row[1]}
                      </TableCell>
                      <TableCell align="right">{row[2]}</TableCell>
                      <TableCell align="right">{row[3]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={1.5}></Grid>
      </Grid>
    </div>
  );
}
