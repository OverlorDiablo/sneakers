import React from 'react';
import { api } from '../../api';
import { Card } from '../../components';
import { CartItem } from '../../redux/slices/cart/types';
import styles from './Orders.module.scss';

type OrderItem = {
  id: number,
  items: CartItem[]
}

export function Orders() {
  const [orders, setOrders] = React.useState<CartItem[]>([]);

  const fetchData = async () => {
    const { data } = await api.get<OrderItem[]>('/orders')
    setOrders(data.reduce((prev: CartItem[], obj: OrderItem) => [...prev, ...obj.items], []));
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className={styles.lineName}>
        <h1>Мои заказы</h1>
      </div>

      <div className={styles.products}>
        {orders.map((obj: CartItem) => (
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
}