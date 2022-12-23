import React from "react";
import Header from "./compnents/Header/Header";
import Cart from "./compnents/Cart/Cart";
import Main from "./compnents/Main/Main";



function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => item.id === obj.id)) {
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id))
    } else {
      setCartItems((prev) => [...prev, obj])
    }
  }

  return (
    <div className="wrapper">

      {cartOpened ? <Cart items={cartItems} onClickCloseCart={() => setCartOpened(false)} /> : null}

      <Header onClickOpenCart={() => setCartOpened(true)} />

      <Main addToCart={onAddToCart} />

    </div>
  );
}

export default App;