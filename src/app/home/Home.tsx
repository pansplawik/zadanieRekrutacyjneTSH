import './Home.css';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Stack, Typography } from '@mui/material';
import Card from '@mui/joy/Card';
import { ShopCard } from 'app/components/card/Card';
import { Modals } from 'app/components/modal/Modal';
import { useLogin } from 'context/viewType/userContext';
import Empty from './Empty.png';
import Avatar from './Avatar.png';
export const Home = () => {
  const { login } = useLogin();
  const [products, setProducts] = useState<Product[]>([]);
  const chunkArray = (array) => {
    const groups = [];
    const totalGroups = 7;
    const chunkSize = Math.ceil(array.length / totalGroups);

    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      groups.push(chunk);
    }

    if (groups.length > totalGroups) {
      groups[totalGroups - 2] = groups[totalGroups - 2].concat(groups.pop());
    }

    return groups;
  };

  const fetchData = async () => {
    try {
      let allProducts: Product[] = [];
      const response = await fetch(
        `http://jointshfrontendapi-env-3.eba-z7bd6rn6.eu-west-1.elasticbeanstalk.com/products?limit=100`,
        {
          method: 'GET',
          mode: 'cors',
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const productsArray: Product[] = data.items.map((item: any) => ({
        name: item.name || '',
        description: item.description || '',
        rating: item.rating || 0,
        image: item.image || '',
        promo: item.promo || false,
      }));

      allProducts = [...allProducts, ...productsArray];
      setProducts(allProducts);
      const chunkedProducts = chunkArray(allProducts);
      setProducts(chunkedProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [modalInfo, setModalInfo] = useState({
    name: '',
    description: '',
    image: '',
  });

  const openAndSetModal = ({ name, description, image }) => {
    setModal(true);
    console.log(modal);
    setModalInfo({
      name,
      description,
      image,
    });
  };
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="shop-container">
        {login ? (
          <Card
            sx={{
              width: '45rem',
              height: '25rem',
              backgroundColor: 'white',
              border: 'None',
              margin: '4rem',
              alignItems: 'center',
            }}
          >
            <img
              src={Empty}
              loading="lazy"
              alt=""
              style={{ maxHeight: '3.5rem', maxWidth: '3.5rem', padding: '5rem' }}
            />
            <Typography
              style={{
                textAlign: 'center',
                fontSize: '1.125rem',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '1rem',
              }}
            >
              Ooops… It’s empty he
            </Typography>
            <Typography className="describe">There are no product</Typography>
          </Card>
        ) : (
          products.length > 0 &&
          products[page].map((product: Product) => (
            <ShopCard
              key={product.id}
              product={{
                name: product.name,
                description: product.description,
                rating: product.rating,
                image: product.image,
                promo: product.promo,
                active: product.active,
                id: product.id,
              }}
              modalOpen={openAndSetModal}
            />
          ))
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        {!login && (
          <Stack spacing={3}>
            <Pagination count={6} defaultPage={page} showFirstButton showLastButton onChange={handleChange} />
          </Stack>
        )}
      </div>
    </>
  );
};
