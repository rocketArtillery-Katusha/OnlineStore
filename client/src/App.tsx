import { Route, Routes } from 'react-router-dom';
import routes from './common/routes';
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header/Header';
import classes from './App.module.scss';
import Catalog from './components/Catalog/Catalog';

function App() {
  return (
    <main className={classes.mainContainer}>
      <Header />
      <Catalog />
      <div className={classes.mainContainerInner}>
        <Routes>
          <Route path={routes.mainPage} element={<MainPage />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
