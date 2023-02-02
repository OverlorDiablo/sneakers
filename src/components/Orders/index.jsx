import React from 'react';
import { api } from '../../api';
import { Card } from '../../components';
import styles from './Orders.module.scss';

export const Orders = () => {
  const [orders, setOrders] = React.useState([]);

  const fetchData = async () => {
    const { data } = await api.get('/orders');
    setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className={styles.lineName}>
        <h1>Мои заказы</h1>
      </div>

      <div className={styles.products}>
        {orders.map((obj) => (
          <Card
            key={+obj.id * Math.random()}
            id={obj.id}
            title={obj.title}
            price={obj.price}
            imageUrl={obj.imageUrl}
          />
        ))}
      </div>
    </main>
  );
};
