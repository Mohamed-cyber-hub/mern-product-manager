import {
  Container,
  Grid,
  Stack,
  Typography,
  Box,
  Fade,
  CircularProgress,
  Button,
} from '@mui/material';
import {
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const {
    fetchProducts,
    products,
  } = useProductStore();
  const [
    loading,
    setLoading,
  ] = useState(true);
  const [fadeIn, setFadeIn] =
    useState(false);

  useEffect(() => {
    const loadProducts =
      async () => {
        await fetchProducts();
        setLoading(false);
        setTimeout(
          () =>
            setFadeIn(true),
          100
        );
      };
    loadProducts();
  }, [fetchProducts]);

  console.log(
    'Products:',
    Array.isArray(products)
      ? products.filter(
          Boolean
        )
      : products
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}>
      {/* Your specified background */}
      <Box
        sx={{
          position:
            'absolute',
          inset: 0,
          zIndex: -1,
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems:
            'center',
          px: 5,
          py: 24,
          background:
            'radial-gradient(125% 125% at 50% 10%, #000 60%, #6633ee 100%)',
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position:
            'relative',
          zIndex: 1,
        }}>
        <Stack
          spacing={6}
          sx={{ py: 8 }}>
          {/* Hero Section */}
          <Fade
            in={fadeIn}
            timeout={1000}>
            <Box textAlign="center">
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: {
                    xs: '2.5rem',
                    md: '4rem',
                    lg: '5rem',
                  },
                  background:
                    'linear-gradient(45deg, #fff, #e3f2fd)',
                  backgroundClip:
                    'text',
                  WebkitBackgroundClip:
                    'text',
                  WebkitTextFillColor:
                    'transparent',
                  textShadow:
                    '0 4px 20px rgba(255,255,255,0.3)',
                  mb: 2,
                  letterSpacing:
                    '-0.02em',
                }}>
                Current
                Products
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color:
                    'rgba(255,255,255,0.8)',
                  fontWeight: 300,
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6,
                }}>
                Discover our
                amazing
                collection of
                premium
                products
              </Typography>
            </Box>
          </Fade>

          {/* Loading State */}
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={300}>
              <Stack
                alignItems="center"
                spacing={3}>
                <CircularProgress
                  size={60}
                  thickness={
                    4
                  }
                  sx={{
                    'color':
                      '#fff',
                    '& .MuiCircularProgress-circle':
                      {
                        strokeLinecap:
                          'round',
                      },
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color:
                      'rgba(255,255,255,0.8)',
                    fontWeight: 300,
                  }}>
                  Loading
                  amazing
                  products...
                </Typography>
              </Stack>
            </Box>
          ) : (
            /* Products or Empty State */
            <Fade
              in={!loading}
              timeout={800}>
              <Box>
                {Array.isArray(
                  products
                ) &&
                products.filter(
                  Boolean
                ).length >
                  0 ? (
                  /* Products Grid */
                  <Grid
                    container
                    spacing={
                      4
                    }>
                    {products
                      .filter(
                        (
                          product
                        ) =>
                          product &&
                          product._id
                      ) // Ensure valid products
                      .map(
                        (
                          product,
                          index
                        ) => (
                          <Fade
                            key={
                              product._id
                            }
                            in={
                              !loading
                            }
                            timeout={
                              1000 +
                              index *
                                200
                            }>
                            <Grid
                              item
                              xs={
                                12
                              }
                              sm={
                                6
                              }
                              md={
                                4
                              }
                              lg={
                                3
                              }>
                              <Box
                                sx={{
                                  'transform':
                                    'translateY(0)',
                                  'transition':
                                    'all 0.3s ease',
                                  '&:hover':
                                    {
                                      transform:
                                        'translateY(-8px)',
                                    },
                                }}>
                                <ProductCard
                                  product={
                                    product
                                  }
                                />
                              </Box>
                            </Grid>
                          </Fade>
                        )
                      )}
                  </Grid>
                ) : (
                  /* Empty State */
                  <Box
                    sx={{
                      textAlign:
                        'center',
                      py: 8,
                      px: 4,
                    }}>
                    <Box
                      sx={{
                        fontSize:
                          '4rem',
                        mb: 3,
                        opacity: 0.8,
                        animation:
                          'bounce 2s infinite',
                      }}>
                      📦
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color:
                          '#fff',
                        fontWeight: 600,
                        mb: 2,
                        fontSize:
                          {
                            xs: '1.8rem',
                            md: '2.5rem',
                          },
                      }}>
                      No
                      Products
                      Yet
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color:
                          'rgba(255,255,255,0.7)',
                        mb: 4,
                        maxWidth: 400,
                        mx: 'auto',
                        lineHeight: 1.6,
                      }}>
                      Be the
                      first to
                      add an
                      amazing
                      product
                      to our
                      collection!
                    </Typography>
                    <Button
                      component={
                        Link
                      }
                      to="/create"
                      variant="contained"
                      size="large"
                      sx={{
                        'background':
                          'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                        'border': 0,
                        'borderRadius':
                          '25px',
                        'boxShadow':
                          '0 8px 25px rgba(0,0,0,0.3)',
                        'color':
                          'white',
                        'fontSize':
                          '1.1rem',
                        'fontWeight': 600,
                        'px': 4,
                        'py': 1.5,
                        'textTransform':
                          'none',
                        'transition':
                          'all 0.3s ease',
                        '&:hover':
                          {
                            background:
                              'linear-gradient(45deg, #FF5252, #26C6DA)',
                            transform:
                              'translateY(-2px)',
                            boxShadow:
                              '0 12px 35px rgba(0,0,0,0.4)',
                          },
                      }}>
                      ✨
                      Create
                      Your
                      First
                      Product
                    </Button>
                  </Box>
                )}
              </Box>
            </Fade>
          )}
        </Stack>
      </Container>

      {/* Custom CSS animations */}
      <style jsx="true">{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(
                0px
              )
              rotate(0deg);
          }
          33% {
            transform: translateY(
                -10px
              )
              rotate(1deg);
          }
          66% {
            transform: translateY(
                5px
              )
              rotate(-1deg);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(
              0
            );
          }
          40% {
            transform: translateY(
              -10px
            );
          }
          60% {
            transform: translateY(
              -5px
            );
          }
        }
      `}</style>
    </Box>
  );
};

export default HomePage;
