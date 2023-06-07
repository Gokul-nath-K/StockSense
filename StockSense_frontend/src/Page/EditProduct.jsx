import {
  Button,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import { productContext } from "../Data/ProductContext";
import { useLocation, useNavigate } from "react-router-dom";
import { getproduct, updateproduct } from "../service/ProductApi/product";

const EditProduct = () => {
  const { register, handleSubmit } = useForm();
  const { products, dispatch } = useContext(productContext);

  const location = useLocation();

  let navigate = useNavigate();

  const onSubmit = (data) => {
    let id = location.state.targetProduct.id;
    try {
      updateproduct(id, data).then(() => {
        const updatedProducts = products.map((product) =>
          product.id === id ? { ...product, ...data } : product
        );
        dispatch({ type: "fetch", items: updatedProducts });
      });
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    navigate("/main");
  };

  return (
    <>
      <div className="edit-container">
        <Container maxWidth="sm" sx={{ mt: 10 }}>
          <Paper
            elevation={5}
            sx={{
              minHeight: "50vh",
              borderRadius: 3,
              p: 1,
              bgcolor: "#B5B9C5",
              fontVariant: "bold",
            }}
          >
            <Toolbar
              sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
              }}
            >
              <Typography
                sx={{ flex: "1 1 100%", paddingLeft: 2 }}
                variant="h5"
                id="tableTitle"
                component="div"
              >
                Products
              </Typography>
            </Toolbar>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                alignContent="space-evenly"
                container
                minHeight="50vh"
                justifyContent="center"
              >
                <Grid item>
                  <Grid container direction="row">
                    <Grid item sx={{ pr: 4 }}>
                      <TextField
                        type="name"
                        label="Name"
                        placeholder="Name"
                        variant="standard"
                        defaultValue={location.state.targetProduct.name}
                        //   autoFocus
                        {...register("name")}
                      ></TextField>
                    </Grid>
                    <Grid item sx={{ pl: 2 }}>
                      <TextField
                        type="category"
                        label="Category"
                        placeholder="Category"
                        variant="standard"
                        defaultValue={location.state.targetProduct.category}
                        //   autoFocus
                        {...register("category")}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <br />
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Grid item sx={{ pr: 4 }}>
                      <TextField
                        type="price"
                        label="Price"
                        placeholder="Price"
                        variant="standard"
                        defaultValue={location.state.targetProduct.price}
                        //   autoFocus
                        {...register("price")}
                      ></TextField>
                    </Grid>
                    <Grid item sx={{ pl: 2 }}>
                      <TextField
                        type="quantity"
                        label="Quantity"
                        placeholder="Quantity"
                        variant="standard"
                        defaultValue={location.state.targetProduct.quantity}
                        //   autoFocus
                        {...register("quantity")}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <br />
                <Grid container direction="row" sx={{ pl: 6 }}>
                  <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    startIcon={<DoneSharpIcon />}
                    sx={{
                      bgcolor: "rgb(51, 102, 255)",
                      color: "black",
                      p: 1.5,
                    }}
                  >
                    Update info
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default EditProduct;
