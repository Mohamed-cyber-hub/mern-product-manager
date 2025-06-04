import { 
  Button, 
  Container, 
  Stack, 
  Typography, 
  Box, 
  IconButton,
  Tooltip 
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import StoreIcon from '@mui/icons-material/Store';

const Navbar = () => {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(20px)',
        background: 'rgba(0, 0, 0, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        py: 2
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}
      >
        {/* Logo/Brand */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              }
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(45deg, #6633ee, #9c27b0)',
                borderRadius: '12px',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(102, 51, 238, 0.3)',
              }}
            >
              <StoreIcon 
                sx={{ 
                  color: '#fff', 
                  fontSize: '1.5rem' 
                }} 
              />
            </Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(45deg, #fff, #e3f2fd)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Product Store
            </Typography>
          </Box>
        </Link>

        {/* Navigation Actions */}
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          <Tooltip title="Create New Product" arrow>
            <IconButton
              component={Link}
              to="/create"
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                color: '#fff',
                width: 48,
                height: 48,
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF5252, #26C6DA)',
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
                }
              }}
            >
              <AddIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;