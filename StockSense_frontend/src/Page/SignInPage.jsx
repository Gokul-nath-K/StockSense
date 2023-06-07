import "../App.css";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import { useForm } from "react-hook-form";
import { authuser } from "../service/UserApi/user";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textfield: {
    fontWeight:"bold"
  }
}))
const SignInPage = () => {

  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      authuser(data.email, data.password).then((res) => {
        if (res.data === false) {
          alert("Invalid username or password. ");
        } else {
          navigate("/main");
        }
      });
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <>
      <div className="sign-in-container">
        <Container maxWidth="sm">
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 5,
                borderRadius: 5,
                bgcolor: "#B5B9C5",
              }}
            >
              <Grid container direction="column" spacing={2}>
                <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                  <HttpsRoundedIcon sx={{ fontSize: 40 }} />
                </Grid>
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid item>
                    <Box sx={{ p: 3 }}>
                      <TextField
                        className={classes.textfield}
                        type="email"
                        fullWidth
                        placeholder="Enter email id"
                        variant="filled"
                        // autoFocus
                        inputProps={{
                          style:{ fontWeight:"bold", color:"black"}
                        }}
                        sx={{ color: "#ffffff" }}
                        {...register("email", {
                          required: "Required",
                          pattern: {
                            value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                            message: "Invalid email address",
                          },
                        })}
                        error={!!errors?.email}
                        helperText={errors?.email ? errors.email.message : null}
                      ></TextField>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{ p: 3 }}>
                      <TextField
                        className={classes.textfield}
                        type="password"
                        fullWidth
                        placeholder="Enter password"
                        variant="filled"
                        // autoFocus
                        inputProps={{
                          style:{ fontWeight:"bold", color:"black"}
                        }}
                        sx={{ color: "#ffffff" }}
                        {...register("password", {
                          required: "Required",
                          pattern: {
                            value:
                              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/i,
                            message: "weak password",
                          },
                        })}
                        error={!!errors?.password}
                        helperText={
                          errors?.password ? errors.password.message : null
                        }
                      ></TextField>
                    </Box>
                  </Grid>
                  <Grid item sx={{ display: "flex", justifyContent: "start" }}>
                    <Box sx={{ p: 1, pl : 3 }}>
                      <Typography variant="p">Don't have an account? <Link to="/signup" style={{ textDecoration : "none"}}>Sign up. </Link></Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ p: 3 }}>
                      <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        startIcon={<DoneSharpIcon />}
                        sx={{
                          bgcolor: "#23262B",
                          color: "white",
                        }}
                      >
                        Sign in
                      </Button>
                    </Box>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default SignInPage;
