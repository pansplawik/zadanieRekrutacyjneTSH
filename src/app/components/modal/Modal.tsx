import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

type Product = {
  open: boolean;
  description: string;
  name: string;
  image: string;
  handleClose: () => void; // Corrected the type for handleClose
};

// Define the ProductCardProps type
type ProductCardProps = {
  product: Product;
};

// Define the Modals component
export const Modals: React.FC<ProductCardProps> = ({ product }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={product.open}
      onClose={product.handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={product.open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {product.name}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {product.description}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};
