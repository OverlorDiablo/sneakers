import React from "react";
import axios from "axios";
import Header from "./compnents/Header/Header";
import Cart from "./compnents/Cart/Cart";
import Main from "./compnents/Main/Main";



function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://639de1ee3542a26130521b71.mockapi.io/cart').then((res) => {
      setCartItems(res.data)
    })
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://639de1ee3542a26130521b71.mockapi.io/cart', obj);

    if (cartItems.find((item) => item.id === obj.id)) {
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id))
    } else {
      setCartItems((prev) => [...prev, obj])
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://639de1ee3542a26130521b71.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }

  return (
    <div className="wrapper">

      {cartOpened ? <Cart items={cartItems} onClickCloseCart={() => setCartOpened(false)} onRemove={onRemoveItem} /> : null}

      <Header onClickOpenCart={() => setCartOpened(true)} />

      <Main addToCart={onAddToCart} />

    </div>
  );
}

export default App;