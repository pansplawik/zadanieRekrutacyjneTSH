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
            <input type="text" placeholder="Wyszukaj..." className="search-container" />
          </li>
          <li className="promo__and__active">
            <label className="checkbox-label">
              <input type="checkbox" className="check" />
              Active
            </label>
          </li>
          <li className="promo__and__active">
            <label className="checkbox-label">
              <input type="checkbox" className="check" />
              Promo
            </label>
          </li>
          <li className="login__button">
            <button type="button" className="blue-button">
              Login
            </button>
          </li>
        </ul>
      </nav>
      <main className="app__main">
        <Outlet />
      </main>
    </div>
  );
};
