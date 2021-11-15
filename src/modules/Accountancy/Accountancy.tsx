import { useCallback, useEffect, useMemo, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import moment from 'moment';
import { Product } from 'types/Product';
import Card from 'components/Card';
import { dateAndTimeDisplayFormat } from 'utils/constants';
import { handleException } from 'utils/handleException';
import { mapOrdersRange } from 'utils/mappers/mapOrdersRange';
import { mapOrdersWithBuyingPrice } from 'utils/mappers/mapOrdersWithPriceBuying';
import { Data, MappedOrder } from 'utils/mappers/types';
import OrdersTable from './components/OrdersTable.tsx';
import Stock from './components/Stock';
import Summary from './components/Summary';
import * as api from './api';
import * as S from './styles';

const Accountancy = () => {
  const [orders, setOrders] = useState<MappedOrder[]>();
  const [range, setRange] = useState<number[]>();
  const [products, setProducts] = useState<Product[]>(
    JSON.parse(localStorage.getItem('data') || '{}')?.allProducts,
  );

  const { isLoadingShippings, getShippingMethods } = api.useGetShippingMethod();
  const { isLoading: isLoadingProducts, getAllProducts } = api.useGetProducts();
  const { isLoading: isLoadingOrders, getAllOrders } = api.useGetOrders();
  const { isLoading: isLoadingOrderedProducts, getAllOrderedProducts } =
    api.useGetOrderedProducts();

  const handleMapData = useCallback(() => {
    const localStorageData = localStorage.getItem('data');
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      const mappedData = mapOrdersWithBuyingPrice(data);
      const orderRange = mapOrdersRange(mappedData);
      setOrders(mappedData);
      setRange(orderRange);
    }
  }, []);

  useEffect(() => {
    handleMapData();
  }, [handleMapData]);

  const handleDownloadData = useCallback(async () => {
    try {
      const shippingMethods = await getShippingMethods();
      const allProducts = await getAllProducts();
      const allOrders = await getAllOrders();
      const allOrderedProducts = await getAllOrderedProducts();

      if (allProducts && allOrders && allOrderedProducts && shippingMethods) {
        const data: Data = {
          shippingMethods: shippingMethods,
          allProducts: allProducts,
          allOrders: allOrders,
          allOrderedProducts: allOrderedProducts,
          lastUpdate: moment().format(dateAndTimeDisplayFormat),
        };
        localStorage.setItem('data', JSON.stringify(data));
        const mappedData = mapOrdersWithBuyingPrice(data);
        const orderRange = mapOrdersRange(mappedData);
        setOrders(mappedData);
        setProducts(allProducts);
        setRange(orderRange);
      }
    } catch (e: any) {
      handleException(e);
    }
  }, [getAllOrderedProducts, getAllOrders, getAllProducts, getShippingMethods]);

  const isLoading = useMemo(
    () =>
      isLoadingProducts ||
      isLoadingOrders ||
      isLoadingOrderedProducts ||
      isLoadingShippings,
    [
      isLoadingOrderedProducts,
      isLoadingOrders,
      isLoadingProducts,
      isLoadingShippings,
    ],
  );

  const ordersByRange = useMemo(() => {
    if (orders && range) {
      return orders.filter(
        (el) =>
          Number(el.order_id) >= range[0] && Number(el.order_id) <= range[1],
      );
    }
  }, [orders, range]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <S.Summary item>
          <Card title="Stan magazynowy">
            <Stock products={products} />
          </Card>
        </S.Summary>
        <S.Summary item>
          <Summary ordersByRange={ordersByRange} />
        </S.Summary>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <OrdersTable
            ordersByRange={ordersByRange}
            isLoading={isLoading}
            orders={orders}
            range={range}
            setRange={setRange}
            handleGetData={handleDownloadData}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Accountancy;