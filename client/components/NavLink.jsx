// components/NavLink.js
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import styles from '@/styles/NavLink.module.css';

const NavLink = ({ href, children, active }) => {
  const router = useRouter();
  const isActive = router.pathname === href || active;

  return (
    <Link href={href} passHref className={`${styles.navLink} ${isActive ? styles.active : ''}`}>
        {children}
    </Link>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

NavLink.defaultProps = {
  active: false,
};

export default NavLink;
