import React, { useContext } from "react";
import "../App.css";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { postproduct } from "../service/ProductApi/product";
import { productContext } from "../Data/ProductContext";
import { styled } from "@material-ui/core";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#050418",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#050418",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#050418",
    },
    "&:hover fieldset": {
      borderColor: "#050418",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#050418",
    },
  },
});

export default function AddProduct({ setisAddProduct }) {
  const { products, dispatch } = useContext(productContext);

  const addProduct = () => {
    setisAddProduct(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      postproduct(data).then( dispatch({ type: "add", items: data }) );
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    addProduct();
  };

  return (
    <>
      <div className="addproduct-container">
        <Container maxWidth="xs" sx={{ paddingTop: 4 }}>
          <Grid
            container
            spacing={3}
            direction="column"
            justifyContent="center"
            style={{ minHeight: "100vh", minWidth: "125%", fontWeight: "bold" }}
          >
            <Paper
              elevation={24}
              sx={{
                padding: 3,
                borderRadius: 5,
                bgcolor: "#B5B9C5",
              }}
            >
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6">New item</Typography>
                  </Box>
                </Grid>
                <Divider />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ padding: 2 }}>
                    <Grid item>
                      <Box sx={{ p: 2 }}>
                        <CssTextField
                          type="name"
                          fullWidth
                          required
                          label="Name"
                          placeholder="Enter product name"
                          variant="standard"
                          {...register("name", {
                            required: "Required",
                          })}
                          error={!!errors?.name}
                          helperText={errors?.name ? errors.name.message : null}
                        />
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box sx={{ p: 2 }}>
                        <CssTextField
                          type="category"
                          fullWidth
                          required
                          label="category"
                          placeholder="Enter product category"
                          variant="standard"
                          {...register("category", {
                            required: "Required",
                          })}
                          error={!!errors?.category}
                          helperText={
                            errors?.category ? errors.category.message : null
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box sx={{ p: 2 }}>
                        <CssTextField
                          type="price"
                          fullWidth
                          required
                          label="price"
                          placeholder="Enter product price"
                          variant="standard"
                          {...register("price", {
                            required: "Required",
                          })}
                          error={!!errors?.price}
                          helperText={
                            errors?.price ? errors.price.message : null
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box sx={{ p: 2 }}>
                        <CssTextField
                          type="quantity"
                          fullWidth
                          required
                          label="quantity"
                          placeholder="Enter product quantity"
                          variant="standard"
                          {...register("quantity", {
                            required: "Required",
                          })}
                          error={!!errors?.quantity}
                          helperText={
                            errors?.quantity ? errors.quantity.message : null
                          }
                        />
                      </Box>
                    </Grid>
                    <br />
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        direction: "row",
                      }}
                    >
                      <Box sx={{ p: 2, display: "flex" }}>
                        <Box sx={{ padding: 2 }}>
                          <Button
                            color="error"
                            variant="contained"
                            startIcon={<SaveRoundedIcon />}
                            sx={{
                              color: "black",
                            }}
                            onClick={addProduct}
                          >
                            cancel
                          </Button>
                        </Box>
                        <Box sx={{ padding: 2 }}>
                          <Button
                            type="submit"
                            color="success"
                            variant="contained"
                            startIcon={<SaveRoundedIcon />}
                            sx={{
                              bgcolor: "#23262B",
                              color: "white",
                            }}
                          >
                            Save
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </div>
    </>
  );
}
