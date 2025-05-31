'use client'

import Link from 'next/link'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'

const MenuLink = ({ item }) => {
  const pathname = usePathname() || ''; // Safeguard against null value

  return (
    <Link href={item.path} className={`${styles.container} ${pathname === item.path ? styles.active : ''}`}>
      {item.icon}
      <span>{item.title}</span>
    </Link>
  )
}

export default MenuLink;
