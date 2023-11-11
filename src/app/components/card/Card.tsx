import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

import starFull from 'assets/images/starFull.png';
import starEmpty from 'assets/images/starEmpty.png';
import './Card.css';

type Product = {
  name: string;
  description: string;
  rating: number;
  image: string;
  promo: boolean;
  active: boolean;
  id: string;
  modalOpen: () => void;
};

type ProductCardProps = {
  product: Product;
};

export const ShopCard: React.FC<ProductCardProps> = ({ product }) => {
  const RenderStars = () => {
    const stars = [];
    const rating = product.rating;

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img key={i} src={starFull} alt={`Star ${i}`} className="star" />);
      } else {
        stars.push(<img key={i} src={starEmpty} alt={`Empty Star ${i}`} className="star" />);
      }
    }

    return stars;
  };
  return (
    <Card
      sx={{
        width: '18rem',
        height: '25rem',
        flexShrink: 0,
        backgroundColor: 'white',
        border: 'None',
        margin: '4rem',
      }}
    >
      <div>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        ></IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={product.image} loading="lazy" alt="" />
      </AspectRatio>
      <CardContent>
        <Typography className="labelCard">{product.name}</Typography>
        <Typography className="describe">{product.description}</Typography>
        <CardContent orientation="horizontal" sx={{ marginLeft: '0.7rem', marginTop: '1.5rem' }}>
          <RenderStars />
        </CardContent>
        <Button color="primary" sx={{ width: '100%', marginTop: '1rem' }} onClick={() => product.modalOpen}>
          Show details
        </Button>
      </CardContent>
    </Card>
  );
};
