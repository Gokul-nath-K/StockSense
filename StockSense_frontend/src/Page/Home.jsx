import {
  Box,
  Paper,
  Table,
  TableBody,
  IconButton,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Checkbox,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { makeStyles } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../Data/ProductContext";
import AddProduct from "./AddProduct";

import { useNavigate } from "react-router-dom";
import {
  deleteproduct,
  getSortedProduct,
  getcount,
} from "../service/ProductApi/product";

const useStyles = makeStyles((theme) => ({
  tablecell: {
    color: "#050418",
  },
  tablerow: {
    border: 4,
    bgcolor: "yellow",
  },
}));

export default function Home() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { products, dispatch, loading, setLoading, fetchData } = useContext(productContext);

  const [page, setPage] = useState(0);
  const [sorted, setSorted] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [direction, setDirection] = useState("asc");
  const [isAddProduct, setisAddProduct] = useState(false);
  const [selected, setSelected] = useState([]);
  const [targetItem] = useState([]);
  const [productCount, setProductCount] = useState();
  let selectedIndex = [];
  const [order, setOrder] = useState("");
  const [item_id, setItemId] = useState(0);

  const headCells = [
    {
      id: "category",
      label: "Category",
    },
    {
      id: "price",
      label: "Price",
    },
    {
      id: "quantity",
      label: "Quantity",
    },
  ];

  useEffect(() => {
    if (!sorted) {
      getcount()
        .then((res) => {
          setProductCount(res.data);
        })
        .then(() => {
          fetchData(page, rowsPerPage);
        });
    } else {
      handleSorting(order, item_id);
    }
  }, [page, rowsPerPage, products.length, order, item_id, sorted]);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const deleteData = async () => {
    setLoading(true);
    try {
      setEditableIndex();
      const indexesToDelete = [...selectedIndex];
      for (const index of indexesToDelete) {
          await deleteproduct(index).then( () => fetchData(page, rowsPerPage));
        }
      setLoading(false);
      setSelected([])
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const addProduct = () => {
    setisAddProduct(true);
  };

  const navigateToEdit = () => {
    setEditableIndex();
    navigate("/update", {
      state: {
        targetProduct: targetItem[0],
      },
    });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = products.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const setEditableIndex = () => {
    if (selected.length !== 0) {
      products.map((product) => {
        if (selected.includes(product.id)) {
          selectedIndex.push(product.id);
          targetItem.push(product);
        }
      });
    }
  };

  const handleSorting = (dir, label) => {
    setOrder(dir);
    setItemId(label);
    if (dir === "asc") {
      getSortedProduct(label, dir, page, rowsPerPage).then((res) => {
        dispatch({ type: "fetch", items: res.data });
        setDirection("desc");
        setSorted(true);
      });
    } else {
      getSortedProduct(label, dir, page, rowsPerPage).then((res) => {
        dispatch({ type: "fetch", items: res.data ? res.data : [] });
        setDirection("asc");
        setSorted(true);
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {isAddProduct ? (
        <AddProduct
          isAddProduct={isAddProduct}
          setisAddProduct={setisAddProduct}
          dispatch={dispatch}
        />
      ) : (
        <></>
      )}
      <div className="home-container">
        { loading ? 
        <>
        
        <Box className="inner-container">
          <Box sx={{ minWidth: 1000, p : 15}}>
          <Paper
              sx={{
                minWidth: 1000,
                minHeight: 500,
                bgcolor: isAddProduct ? "#888" : "#f1edef",
                color: "white",
              }}
            >
              <Toolbar
                sx={{
                  pl: { sm: 2 },
                  pr: { xs: 1, sm: 1 },
                  p: 1,
                }}
              >
                <Typography
                  sx={{ flex: "1 1 100%", paddingLeft: 2, color: "#050418" }}
                  variant="h5"
                  id="tableTitle"
                  component="div"
                >
                  Products
                </Typography>
              </Toolbar>
              <div className="load" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight : 320, }}>
                <Typography
                    sx={{ flex: "1 1 100%", color: "#050418", position : "absolute"}}
                    variant="h5"
                    id="tableTitle"
                    component="div"
                  >
                    loading...
                  </Typography>
              </div>
            </Paper>
          </Box>
        </Box>
        </>  
        
        : 
        <>
        
        <Box className="inner-container">
          <Box sx={{ minWidth: 1000, p: 15 }}>
            <Paper
              sx={{
                minWidth: 1000,
                bgcolor: isAddProduct ? "#888" : "#f1edef",
                color: "white",
              }}
            >
              <Toolbar
                sx={{
                  pl: { sm: 2 },
                  pr: { xs: 1, sm: 1 },
                  p: 1,
                }}
              >
                <Typography
                  sx={{ flex: "1 1 100%", paddingLeft: 2, color: "#050418" }}
                  variant="h5"
                  id="tableTitle"
                  component="div"
                >
                  Products
                </Typography>
                {selected.length === 0 ? (
                  <>
                    <Box sx={{ paddingRight: 4 }}>
                      <IconButton onClick={addProduct}>
                        <AddBoxOutlinedIcon className={classes.tablecell} />
                      </IconButton>
                    </Box>
                  </>
                ) : selected.length === 1 ? (
                  <>
                    <Box sx={{ paddingRight: 4 }}>
                      <IconButton onClick={navigateToEdit}>
                        <EditOutlinedIcon className={classes.tablecell} />
                      </IconButton>
                    </Box>
                    <Box sx={{ paddingRight: 4 }}>
                      <IconButton onClick={deleteData}>
                        <DeleteOutlineOutlinedIcon
                          className={classes.tablecell}
                        />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ paddingRight: 4 }}>
                      <IconButton onClick={deleteData}>
                        <DeleteOutlineOutlinedIcon
                          className={classes.tablecell}
                        />
                      </IconButton>
                    </Box>
                  </>
                )}
              </Toolbar>
              <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                  <TableHead>
                    <TableRow hover sx={{ borderBottom: 1, color: "#050418" }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          indeterminate={
                            selected.length > 0 &&
                            selected.length !== products.length
                          }
                          checked={
                            selected.length > 0 &&
                            selected.length === products.length
                          }
                          onChange={handleSelectAllClick}
                          className={classes.tablecell}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none" sortDirection = {direction}>
                        <TableSortLabel direction={direction}>
                          <Typography
                            className={classes.tablecell}
                            scope="row"
                            align="right"
                            sx={{
                              fontSize: 18,
                              minWidth: 150,
                              textAlign: "left",
                            }}
                            onClick={() => handleSorting(direction, "name")}
                          >
                            Name
                          </Typography>
                        </TableSortLabel>
                      </TableCell>
                      {headCells.map((headcell) => (
                        <TableCell
                          component="th"
                          scope="row"
                          align="right"
                          key={headcell.id}
                          sx={{ paddingRight: 5, minWidth: 150 }}
                          onClick={() => handleSorting(direction, headcell.id)}
                        >
                          <TableSortLabel direction={direction}>
                            <Typography
                              className={classes.tablecell}
                              sx={{ fontSize: 18 }}
                            >
                              {headcell.label}
                            </Typography>
                          </TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products &&
                      products.map((product) => {
                        const isProductSelected = isSelected(product.id);
                        return (
                          <TableRow
                            key={product.id}
                            hover
                            selected={isProductSelected}
                            onClick={(e) =>
                              handleClick(e, product.name, product.id)
                            }
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                className={classes.tablecell}
                                checked={isProductSelected}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Typography className={classes.tablecell}>
                                {product.name}
                              </Typography>
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="right"
                              sx={{ paddingRight: 5 }}
                            >
                              <Typography className={classes.tablecell}>
                                {product.category}
                              </Typography>
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="right"
                              sx={{ paddingRight: 5 }}
                            >
                              <Typography className={classes.tablecell}>
                                {product.price}
                              </Typography>
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="right"
                              sx={{ paddingRight: 5 }}
                            >
                              <Typography className={classes.tablecell}>
                                {product.quantity}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={productCount ? productCount : 10}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Box>
        </>
        }
      </div>
    </>
  );
}
