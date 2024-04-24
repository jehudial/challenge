//basic react imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

//tanstack and api imports
import { useMutation } from "@tanstack/react-query";
import { create, queryClient } from "../api/challengeApi";

//mui imports
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
// import Grid from "@mui/material/Unstable_Grid2/Grid2";

//form imports
import * as Yup from "yup";
import { useFormik } from "formik";
import dayjs from "dayjs";

const NewRecordForm = () => {
  const [value, setValue] = useState(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  const navigate = useNavigate();

  //mutate function to add new record
  const { mutate: createRecord, isPending: saveIsPending } = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      //   console.log(data);
      queryClient.invalidateQueries({ queryKey: ["all Records"] });
      navigate(`/${data._id}`);
    },
  });

  //formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      //   date: null,
      // check: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required-Please enter a name"),
      // date: Yup.date()
    }),
    enableReinitialize: true,

    onSubmit: (values) => {
      if (value !== null) {
        values.date = new Date(value);
      }
      if (!indeterminate) {
        values.check = checked;
      }
      createRecord(values);
      //   formik.resetForm((values = ""));
    },
  });

  const handleChange = (event) => {
    if (indeterminate) {
      setIndeterminate(false);
    }
    setChecked(event.target.checked);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        // padding: 1,
        mt: 2,
        alignItems: "center",
        justifyContent: "Center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card raised>
        <CardHeader
          sx={{ pb: 0 }}
          title={<Typography variant="h3">New Record</Typography>}
        />
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Stack spacing={1}>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                id="name"
                name="name"
                label="Name"
                //   helperText="Select Project Type"
                value={formik.values.name}
                onChange={formik.handleChange}
                // onChange={onChangeLookUp}
                // onBlur={onChangeLookUp}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <DateTimePicker
                selected={formik.values.date}
                clearable="true"
                id="date"
                name="date"
                label="date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                slotProps={{
                  actionBar: {
                    actions: ["clear", "accept"],
                  },
                }}
                //   value={formik.values.name}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={handleChange}
                  />
                }
                label="Check"
              />
            </Stack>
          </CardContent>
          {saveIsPending ? <LinearProgress /> : null}
          <CardActions>
            <Button
              color="warning"
              variant="contained"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={saveIsPending}>
              Create
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};

export default NewRecordForm;
