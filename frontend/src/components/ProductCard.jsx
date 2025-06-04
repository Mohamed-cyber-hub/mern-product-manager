import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Alert,
  Chip,
  Backdrop,
  Fade,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useState, useEffect } from 'react'; // Add useEffect import
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const { deleteProduct, updateProduct } = useProductStore();

  // ADD THIS useEffect to sync local state with prop changes
  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    setSnackbar({
      open: true,
      message,
      severity: success ? 'success' : 'error',
    });
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(
      product._id,
      updatedProduct
    );
    setOpenDialog(false);
    setSnackbar({
      open: true,
      message: success ? 'Product updated successfully' : message,
      severity: success ? 'success' : 'error',
    });
  };

  return (
    <>
      {/* Product Card */}
      <Card
        sx={{
          'maxWidth': 345,
          'height': '100%',
          'display': 'flex',
          'flexDirection': 'column',
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdropFilter': 'blur(20px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'borderRadius': '20px',
          'transition': 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          'position': 'relative',
          'overflow': 'hidden',
          '&:hover': {
            transform: 'translateY(-12px) scale(1.02)',
            boxShadow: '0 20px 40px rgba(102, 51, 238, 0.3)',
            border: '1px solid rgba(102, 51, 238, 0.4)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4, #6633ee)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 1,
          },
        }}>
        {/* Product Image - UPDATED WITH FIXED DIMENSIONS */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              'width': 345, // Fixed width
              'height': 220, // Fixed height
              'objectFit': 'cover', // Ensures image covers the area without stretching
              'transition': 'transform 0.4s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              px: 1.5,
              py: 0.5,
            }}>
            <Chip
              icon={
                <AttachMoneyIcon
                  sx={{
                    fontSize: '1rem !important',
                  }}
                />
              }
              label={product.price}
              size="small"
              sx={{
                'background': 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                'color': '#fff',
                'fontWeight': 600,
                'border': 0,
                '& .MuiChip-icon': {
                  color: '#fff',
                },
              }}
            />
          </Box>
        </Box>

        {/* Card Content */}
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              color: '#fff',
              fontSize: '1.25rem',
              lineHeight: 1.3,
              mb: 1,
            }}>
            {product.name}
          </Typography>
        </CardContent>

        {/* Action Buttons */}
        <CardActions
          sx={{
            p: 2,
            pt: 0,
            justifyContent: 'center',
            gap: 1,
          }}>
          <IconButton
            onClick={() => setOpenDialog(true)}
            sx={{
              'background': 'rgba(102, 51, 238, 0.2)',
              'color': '#6633ee',
              'border': '1px solid rgba(102, 51, 238, 0.3)',
              'borderRadius': '12px',
              'width': 44,
              'height': 44,
              'transition': 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(102, 51, 238, 0.3)',
                transform: 'scale(1.1)',
                boxShadow: '0 4px 12px rgba(102, 51, 238, 0.4)',
              },
            }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteProduct(product._id)}
            sx={{
              'background': 'rgba(255, 107, 107, 0.2)',
              'color': '#FF6B6B',
              'border': '1px solid rgba(255, 107, 107, 0.3)',
              'borderRadius': '12px',
              'width': 44,
              'height': 44,
              'transition': 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255, 107, 107, 0.3)',
                transform: 'scale(1.1)',
                boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
              },
            }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>

      {/* Update Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: {
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)',
          },
        }}
        PaperProps={{
          sx: {
            background: 'rgba(20, 20, 20, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            color: '#fff',
          },
        }}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 1,
          }}>
          <Typography
            variant="h5"
            component="span"
            sx={{
              fontWeight: 600,
              color: '#fff',
            }}>
            Update Product
          </Typography>
          <IconButton
            onClick={() => setOpenDialog(false)}
            sx={{
              'color': 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: '#fff',
              },
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} mt={1}>
            <TextField
              label="Product Name"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  name: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  'color': '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6633ee',
                  },
                },
                '& .MuiInputLabel-root': {
                  'color': 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: '#6633ee',
                  },
                },
              }}
            />
            <TextField
              label="Price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  price: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  'color': '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6633ee',
                  },
                },
                '& .MuiInputLabel-root': {
                  'color': 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: '#6633ee',
                  },
                },
              }}
            />
            <TextField
              label="Image URL"
              value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  image: e.target.value,
                })
              }
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {'color': '#fff', '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '12px',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6633ee',
                  },
                },
                '& .MuiInputLabel-root': {
                  'color': 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: '#6633ee',
                  },
                },
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={handleUpdateProduct}
            variant="contained"
            sx={{
              'background': 'linear-gradient(45deg, #6633ee, #9c27b0)',
              'borderRadius': '12px',
              'px': 3,
              'py': 1,
              'textTransform': 'none',
              'fontWeight': 600,
              'boxShadow': '0 4px 15px rgba(102, 51, 238, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a2dc7, #8e24aa)',
                boxShadow: '0 6px 20px rgba(102, 51, 238, 0.4)',
              },
            }}>
            Update Product
          </Button>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{
              'borderColor': 'rgba(255, 255, 255, 0.3)',
              'color': '#fff',
              'borderRadius': '12px',
              'px': 3,
              'py': 1,
              'textTransform': 'none',
              'fontWeight': 600,
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                background: 'rgba(255, 255, 255, 0.05)',
              },
            }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Enhanced Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{
            borderRadius: '12px',
            backdropFilter: 'blur(20px)',
            background:
              snackbar.severity === 'success'
                ? 'rgba(76, 175, 80, 0.9)'
                : 'rgba(244, 67, 54, 0.9)',
            color: '#fff',
            fontWeight: 500,
          }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;