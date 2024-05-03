import { useInputValidation } from "6pp";
import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";
import ForumIcon from "@mui/icons-material/Forum";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgb(217 42 42 / 50%), rgb(21 0 227 / 50%))",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "rgb(52, 152, 219)",
              width: "100%",
              padding: 4,
            }}
          >
            <ForumIcon
              sx={{
                color: "white",
                height: "4rem",
                width: "4rem",
              }}
            />
            <Typography variant="h4" color={"white"}>
              BaatKarlo
            </Typography>
            <Typography variant="h7" color={"white"}>
              Chat App
            </Typography>
          </Stack>
          <Typography variant="h5" paddingTop={"1.4rem"} fontStyle={"oblique"}>
            Admin Login
          </Typography>
          <form
            style={{
              width: "100%",
              padding: "2rem",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="secretKey"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
