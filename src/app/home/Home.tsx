import './Home.css';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';

import { ShopCard } from 'app/components/card/Card';
import { Modals } from 'app/components/modal/Modal';

export const Home = () => {
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
      for (let currentPage = 1; currentPage <= 5; currentPage++) {
        const response = await fetch(
          `http://jointshfrontendapi-env-3.eba-z7bd6rn6.eu-west-1.elasticbeanstalk.com/products?page=${currentPage}`,
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
      }
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    name: null,
    describe: null,
    image: null,
  });

  const openAndSetModal = () => {
    setModalOpen(true);
  };
  return (
    <>
      <div className="shop-container">
        {products.length > 0 &&
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
                modalOpen: () => openAndSetModal(),
              }}
            />
          ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Stack spacing={3}>
          <Pagination count={6} defaultPage={page} showFirstButton showLastButton onChange={handleChange} />
        </Stack>
      </div>
      <Modals
        product={{
          open: modalOpen,
          description: modalInfo.describe || '', // Using the nullish coalescing operator to provide a default value
          name: modalInfo.name || '',
          image: modalInfo.image || '',
          handleClose: () => setModalOpen(false),
        }}
      />
    </>
  );
};
