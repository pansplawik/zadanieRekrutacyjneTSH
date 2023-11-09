import { Link, Outlet } from 'react-router-dom';

import { AppRoute } from 'routing/AppRoute.enum';
import './Layout.css';

export const Layout = () => {
  return (
    <div className="app">
      <nav className="app__navigation">
        <ul className="app__menu">
          <li className="app__name_app">join.tsh.io</li>
          <li>
            <input type="text" className="search" defaultValue={'Search'}></input>
          </li>
          <li className="promo__and__active">
            <input type="checkbox" className="check"></input>
            Active
          </li>
          <li className="promo__and__active">
            <input type="checkbox" className="check"></input>
            <a className="promo__and__active"> Promo</a>
          </li>
        </ul>
      </nav>
      <main className="app__main">
        <Outlet />
      </main>
    </div>
  );
};
