//basic react imports
import React from "react";
import { useNavigate } from "react-router-dom";

//tanstack and api imports
import { useQuery } from "@tanstack/react-query";
import { read } from "../api/challengeApi";

//mui imports
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid } from "@mui/x-data-grid";

// import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from "@mui/material/Box";
// import Checkbox from "@mui/material/Checkbox";

//component imports
import EditRecordForm from "../components/EditRecordForm";
// import ListRecords from "../components/ListRecords";

const EditRecord = () => {
  return (
    <Box>
      <EditRecordForm />
    </Box>
  );
};

export default EditRecord;
