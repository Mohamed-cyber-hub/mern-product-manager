import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
  Paper,
  Snackbar,
  Alert,
  Box,
  Avatar,
  Fade,
  Zoom,
  CircularProgress,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  AddPhotoAlternate,
  AttachMoney,
  ShoppingBag,
  Add,
  CheckCircle,
} from '@mui/icons-material';
import { useState } from 'react';
import { useProductStore } from '../store/product';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const { createProduct } = useProductStore();
  const theme = useTheme();

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      setToast({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      const result = await createProduct(newProduct);

      if (!result || typeof result !== 'object') {
        throw new Error('Unexpected response from createProduct');
      }

      const { success, message } = result;

      setToast({
        open: true,
        message,
        severity: success ? 'success' : 'error',
      });

      if (success) {
        setNewProduct({ name: '', price: '', image: '' });
        setImagePreview('');
        setTimeout(() => {
          navigate('/');
        },1000); // Redirect after 1 second
      }
    } catch (error) {
      setToast({
        open: true,
        message: error.message || 'Something went wrong.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    setNewProduct({ ...newProduct, image: url });

    if (url && isValidImageUrl(url)) {
      setImagePreview(url);
    } else {
      setImagePreview('');
    }
  };

  const isValidImageUrl = (url) => {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url);
    } catch {
      return false;
    }
  };

  const isFormValid = newProduct.name && newProduct.price;

  return (
    <>
      {/* Background */}
      <Box
        className="absolute inset-0 -z-10"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -10,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(125% 125% at 50% 10%, #000 60%, #63e 100%)',
        }}
      />

      <Container maxWidth="md">
        <Fade in timeout={800}>
          <Box sx={{ py: 4 }}>
            <Stack spacing={4} alignItems="center">
              <Box textAlign="center" sx={{ mb: 2 }}>
                <Zoom in timeout={600}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'primary.main',
                      mb: 2,
                      mx: 'auto',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    }}
                  >
                    <Add sx={{ fontSize: 40 }} />
                  </Avatar>
                </Zoom>
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                  }}
                >
                  Create New Product
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ maxWidth: 400, mx: 'auto' }}
                >
                  Add a new product to your inventory with ease
                </Typography>
              </Box>

              <Box sx={{ width: '100%', maxWidth: 600 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    },
                  }}
                >
                  <Stack spacing={4}>
                    {imagePreview && (
                      <Fade in timeout={500}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                          <Paper
                            elevation={3}
                            sx={{
                              p: 1,
                              borderRadius: 2,
                              background: theme.palette.background.paper,
                            }}
                          >
                            <Box
                              component="img"
                              src={imagePreview}
                              alt="Product preview"
                              sx={{
                                width: 120,
                                height: 120,
                                objectFit: 'cover',
                                borderRadius: 1,
                                display: 'block',
                              }}
                              onError={() => setImagePreview('')}
                            />
                          </Paper>
                        </Box>
                      </Fade>
                    )}

                    <TextField
                      label="Product Name"
                      name="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ShoppingBag color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#111', // dark field
                          color: '#eee',
                          '& fieldset': {
                            borderColor: '#6633ee', // matches #63e
                          },
                          '&:hover fieldset': {
                            borderColor: '#8f5eff',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#aa88ff',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#fff',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#fff',
                        },
                        input: { color: '#eee' }, // input text
                      }}
                    />

                    <TextField
                      label="Price"
                      name="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoney color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#111', // dark field
                          color: '#eee',
                          '& fieldset': {
                            borderColor: '#6633ee', // matches #63e
                          },
                          '&:hover fieldset': {
                            borderColor: '#8f5eff',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#aa88ff',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#fff',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#fff',
                        },
                        input: { color: '#eee' }, // input text
                      }}
                    />

                    <TextField
                      label="Image URL"
                      name="image"
                      value={newProduct.image}
                      onChange={handleImageChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AddPhotoAlternate color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      helperText="Enter a valid image URL to preview"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#111', // dark field
                          color: '#eee',
                          '& fieldset': {
                            borderColor: '#6633ee', // matches #63e
                          },
                          '&:hover fieldset': {
                            borderColor: '#8f5eff',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#aa88ff',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#fff',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#fff',
                        },
                        input: { color: '#eee' }, // input text
                      }}
                    />

                    <Divider sx={{ my: 2 }} />

                    <Button
                      variant="contained"
                      onClick={handleAddProduct}
                      fullWidth
                      disabled={!isFormValid || loading}
                      size="large"
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <CheckCircle />
                        )
                      }
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #331155, #6633ee)',
                        color: '#fff',
                        boxShadow: '0 0 10px #6633ee55',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #220044, #5522cc)',
                          boxShadow: '0 0 15px #6633eeaa',
                          transform: 'translateY(-2px)',
                        },
                        '&:disabled': {
                          background: '#333',
                          color: '#777',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {loading ? 'Creating Product...' : 'Add Product'}
                    </Button>
                  </Stack>
                </Paper>
              </Box>
            </Stack>
          </Box>
        </Fade>

        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={() => setToast({ ...toast, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setToast({ ...toast, open: false })}
            severity={toast.severity}
            variant="filled"
            sx={{ width: '100%', borderRadius: 2 }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default CreatePage;
