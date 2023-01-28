import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";


function Card({
  id,
  imageUrl,
  title,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  added = false,
  loading = false,
}) {

  const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    console.log(id);

    onPlus({ id, imageUrl, title, price });
    setIsAdded(!isAdded);
  }

  const onClickFavorite = () => {
    onFavorite({ id, imageUrl, title, price });
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={styles.card}>
      {
        loading ? (
          <ContentLoader
            speed={2}
            width={150}
            height={204}
            viewBox="0 0 150 190"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
            <rect x="0" y="110" rx="3" ry="3" width="150" height="15" />
            <rect x="0" y="130" rx="3" ry="3" width="100" height="15" />
            <rect x="0" y="165" rx="8" ry="8" width="80" height="24" />
            <rect x="118" y="157" rx="8" ry="8" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={isFavorite ? "/img/liked.svg" : "/img/unlike.svg"}
                className={styles.actionButton}>
              </img>
            </div>
            <img src={imageUrl} className={styles.sneakerPhoto}></img>
            <p className={styles.cardInfo}>{title}</p>
            <div className={styles.cardPrice}>
              <div>
                <p>Цена:</p>
                <b>{price} грн.</b>
              </div>
              <img
                src={isAdded ? "/img/plus-active.svg" : "/img/plus.svg"}
                onClick={onClickPlus}
                className={styles.addToCart}>
              </img>
            </div>
          </>
        )
      }

    </div>
  );
}

export default Card;