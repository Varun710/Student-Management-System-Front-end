import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { TextField, Button, Typography, Box } from "@material-ui/core";
import { lightBlue, orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: theme.palette.background.default,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(2),
      width: "30ch",
    },
  },
  button: {
    background: theme.palette.type === "light" ? lightBlue[500] : orange[500],
    color: theme.palette.type === "light" ? "#fff" : "#000",
  },
  table: {
    marginTop: theme.spacing(4),
    "& th, td": {
      padding: theme.spacing(2),
      border: "1px solid",
    },
    "& th": {
      fontWeight: "bold",
      background: theme.palette.type === "light" ? lightBlue[500] : orange[500],
      color: theme.palette.type === "light" ? "#fff" : "#000",
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: lightBlue[900],
    },
    secondary: {
      main: orange[800],
    },
  },
});

function App() {
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/student/getAll")
      .then((response) => setStudents(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      address: address,
    };
    axios
      .post("http://localhost:8080/student/add", data)
      .then((response) => {
        setStudents([...students, response.data]);
        setName("");
        setAddress("");
        window.location.reload(); // Reloads the page
      })
      .catch((error) => console.log(error));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Typography variant="h5" color="secondary" gutterBottom>
          Student Database
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            label="Address"
            variant="outlined"
            value={address}
            onChange={handleAddressChange}
          />
          <Button type="submit" variant="contained" className={classes.button}>
            Add Student
          </Button>

          <Typography variant="h5" color="secondary" align="center">
            Students List
          </Typography>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </Box>
    </ThemeProvider>
  );
}

export default App;
