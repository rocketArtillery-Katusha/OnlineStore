import classes from './product-card.module.scss';

const ProductCard = () => {
    return (
        <div className={classes.containerCard}>
            <img className={classes.productImg} src="https://basket-03.wb.ru/vol362/part36240/36240739/images/big/2.webp" alt="Предсмертный список зомби" />
            <div className={classes.containerIfnfoProduct}>
                <span className={classes.productPrice}>200 руб.</span>
                <span className={classes.productName}>Название продукта</span>
                <button className={classes.productBtnCart}>В корзину</button>
            </div>
        </div>
    )
}

export default ProductCard