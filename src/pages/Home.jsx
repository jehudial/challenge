//basic react imports
import React from "react";
import {Outlet} from "react-router-dom";

//mui imports
import Grid from "@mui/material/Unstable_Grid2";

//pages imports
import ListRecords from "../components/ListRecords";

const Home = () => {
  
  return (
    <Grid container spacing={1}>
      <Grid xs={6}>
        <ListRecords />
      </Grid>
      <Grid xs={6}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Home;
