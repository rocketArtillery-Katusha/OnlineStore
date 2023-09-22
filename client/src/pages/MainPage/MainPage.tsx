import ProductCard from '../../components/ProductCrad/ProductCard';
import classes from './main-page.module.scss';

const MainPage = () => {
    return (
        <>
            <h1 className={classes.searchResult}>Поиск: Транспорт</h1>
            <div className={classes.containerCards}>{[...new Array(8)].map((el) => <ProductCard />)}</div>
        </>
    )
}

export default MainPage