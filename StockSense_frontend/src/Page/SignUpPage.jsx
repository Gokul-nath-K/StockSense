import "../App.css";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { postuser } from "../service/UserApi/user";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      postuser(data).then((response) => {
        if (response.data === false) {
          alert("User already exist");
        } else {
          navigate("/home");
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
                    <Box sx={{ p: 2 }}>
                      <TextField
                        type="email"
                        fullWidth
                        label="Enter your email id"
                        placeholder="Enter email id"
                        variant="outlined"
                        autoFocus
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
                    <Box sx={{ p: 2 }}>
                      <TextField
                        type="name"
                        fullWidth
                        label="Enter your name"
                        placeholder="Enter your name"
                        variant="outlined"
                        // autoFocus
                        {...register("name", {
                          required: "Required",
                          pattern: {
                            value: /^(?=.*[a-z]).{4,32}$/i,
                            message: "must contaim atleast 4 character",
                          },
                        })}
                        error={!!errors?.name}
                        helperText={errors?.name ? errors.name.message : null}
                      ></TextField>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{ p: 2 }}>
                      <TextField
                        type="password"
                        fullWidth
                        label="Enter your password"
                        placeholder="Enter password"
                        variant="outlined"
                        // autoFocus
                        {...register("password", {
                          required: "Required",
                          pattern: {
                            value:
                              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/i,
                            message:
                              "must contain atleast 8 character which includes numbers and letter",
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
                    <Box sx={{ p: 1, pl: 3 }}>
                      <Typography variant="p">
                        Already have an account?{" "}
                        <Link to="/" style={{ textDecoration: "none" }}>
                          Sign in.{" "}
                        </Link>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ p: 2 }}>
                      <Button
                        type="submit"
                        // color="success"
                        variant="contained"
                        startIcon={<DoneSharpIcon />}
                        sx={{
                          bgcolor: "rgb(51, 102, 255)",
                          color: "#fff",
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

export default SignUpPage;
