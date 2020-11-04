import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/svgs/logo.svg';

const routes = [
  {
    icon: 'fas fa-tachometer-alt',
    link: '/',
    text: 'Dashboard',
  },
  {
    icon: 'fas fa-user',
    link: '/manage/members/me',
    text: 'Profile',
  },
  {
    icon: 'fas fa-user-cog',
    link: '/manage/users',
    text: 'Manage Users',
  },
  {
    icon: 'fas fa-users-cog',
    link: '/manage/members',
    text: 'Manage Members',
  },
  {
    icon: 'fas fa-calendar-alt',
    link: '/manage/events',
    text: 'Manage Events',
  },
  {
    icon: 'fas fa-clock',
    link: '/manage/participations',
    text: 'Manage Participations',
  },
  {
    icon: 'fas fa-user',
    link: '/manage/accounts/me',
    text: 'Account',
  },
];

const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        <li className='logo'>
          <Link to='/' className='nav-link'>
            <img src={Logo} alt='RIVAlumni Logo' />

            <span className='link-text logo-text'>RIVAlumni</span>
          </Link>
        </li>

        {routes.map(({ icon, link, text }) => (
          <li className='nav-item' key={link}>
            <Link to={link} className='nav-link'>
              <i className={icon} />

              <span className='link-text'>{text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Navbar };
