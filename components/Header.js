import Link from 'next/link';
import styles from '../styles/Home.module.css'

function Header() {
  return (
    <header>
      <nav>
        <div>
          <ul className={styles.nav}>
            <div className={styles.navdiv}>
              <li className={styles.navLi}>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className={styles.navLi}>
                <Link href="/">
                  <a>Events</a>
                </Link>
              </li>
              <li className={styles.navLi}>
                <Link href="/">
                  <a>Contact us</a>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;