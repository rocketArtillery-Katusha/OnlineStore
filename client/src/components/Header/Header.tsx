import classes from './header.module.scss';
// import { BsCart2 } from 'react-icons/bs';
// import { AiOutlineUser } from 'react-icons/ai'
// import { RxHamburgerMenu } from 'react-icons/rx'
import reactIcons from '../../common/reactIcons';

const Header = () => {
  const { RxHamburgerMenu, AiOutlineUser, BsCart2 } = reactIcons.headerIcons;

  return (
    <header className={classes.header}>
      <div className={classes.headerInner}>
        <h1 className={classes.logo}>O.Store</h1>
        <div className={classes.headerMenu}>
          <RxHamburgerMenu />
          <span>Каталог</span>
        </div>
        <input className={classes.searchInput} type="text" placeholder='Поиск по сайту...' />
        <div className={classes.headerMenu}>
          <BsCart2 />
          <span>Корзина</span>
        </div>
        <div className={classes.headerMenu}>
          <AiOutlineUser />
          <span>Войти</span>
        </div>
      </div>
    </header>
  )
}

export default Header