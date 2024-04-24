//basic react imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

//tanstack and api imports
import { useMutation, useQuery } from "@tanstack/react-query";
import { read, update, remove, queryClient } from "../api/challengeApi";

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

const EditRecordForm = () => {
  //state Declarations
  const [value, setValue] = useState(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();

  //state functions and handlers
  const handleChange = (event) => {
    if (indeterminate) {
      setIndeterminate(false);
    }
    setChecked(event.target.checked);
  };

  //tanstack query queries and mutations
  //single record query
  const { data: record, isPending: recordIsPending } = useQuery({
    queryKey: ["all Records", id],
    queryFn: ({ queryKey }) => read(queryKey[1]),
  });

  //delete mutation
  const { mutate: removeRecord, isPending: deleteIsPending } = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all Records"] });
      navigate("/");
    },
  });

  //update mutation
  const { mutate: updateRecord, isPending: updateIsPending } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all Records"] });
      //   navigate('/');
    },
  });

  useEffect(() => {
    if (record) {
      setValue(record?.date ? dayjs(new Date(record.date)) : null);
      if (typeof record.check === "boolean") {
        setChecked(record.check);
      } else {
        setIndeterminate(true); // Assuming 'indeterminate' should be false when record.check is defined
      }
    }
  }, [record]);

  //formik setup
  const formik = useFormik({
    initialValues: {
      name: record ? record.name : "",
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
      } else values.date=null
      if (!indeterminate) {
        values.check = checked;
      }
      updateRecord({ id: record._id, record: values });
      //   formik.resetForm((values = ""));
    },
  });

  //if record is not loaded return progress bar
  if (recordIsPending) {
    return (
      <Box sx={{ width: "100%", padding: 1 }}>
        <LinearProgress />
      </Box>
    );
  }

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
          title={
            <Typography variant="h3">{`${
              record.name.charAt(0).toUpperCase() + record.name.slice(1)
            }`}</Typography>
          }
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
          {updateIsPending || deleteIsPending ? <LinearProgress /> : null}
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
            <Button
              variant="contained"
              type="submit"
              disabled={updateIsPending}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={deleteIsPending}
              onClick={() => {
                removeRecord(record._id);
              }}
            >
              Delete Record
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};

export default EditRecordForm;
