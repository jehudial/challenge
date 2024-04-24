//basic react imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//tanstack and api imports
import { useQuery } from "@tanstack/react-query";
import { read } from "../api/challengeApi";

//mui imports
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
// import Grid from "@mui/material/Unstable_Grid2/Grid2";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[400],
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const ListRecords = () => {
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["all Records"],
    queryFn: () => read(),
  });
  //if fetching and no data present returns progress bar
  if (isPending) {
    return <LinearProgress />;
  }

  //maps data into new array with formatted date if it is present
  const records = data.map((record) => ({
    id: record._id,
    name: record.name,
    date: record.date ? new Date(record.date).toLocaleString() : "",
    check: record.check,
  }));

  //defines columns for mui data grid
  //check column has a custom render that uses a ternary to see if check exists
  //and if it does returns mui checkbox with the value otherwise null
  const columns = [
    // {field: "id", headername: "ID"},
    { field: "name", headerName: "Name", width: 140 },
    { field: "date", headerName: "Date", width: 240 },
    {
      field: "check",
      headerName: "Check",
      width: 100,
      renderCell: (params) =>
        typeof params.value === "boolean" ? (
          <Checkbox checked={params.value} disabled />
        ) : null,
      sortable: false,
    },
  ];

  return (
    <Box sx={{ height: 470, width: "100%", padding: 1 }}>
      <StripedDataGrid
        getRowId={(row) => row.id}
        density="compact"
        onRowClick={(event) => navigate(`/${event.id}`)}
        rows={records}
        columns={columns}
        //   getRowHeight={() => "auto"}
        //   getEstimatedRowHeight={() => 200}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 30, 40]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
      />
    </Box>
  );
};

export default ListRecords;
