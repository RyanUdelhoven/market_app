import './globals.css'
import NavBar from '@/components/NavBar';

export default function Home() {

  const initialStock = {
    ticker: 'AAPL',
    currentPrice: 150.00,
    lastClose: 148.50,
  };

  const navLinks = [
    { href: '/', label: 'Home', active: false },
    { href: '/stocks', label: 'Stocks', active: false },
    { href: '/options', label: 'Options', active: false },
    { href: '/about', label: 'About', active: false },
  ];

  return (
    <main>
      <NavBar logoSrc="/logo.png" initialStock={initialStock} navLinks={navLinks} />
      {/* <Component {...pageProps} /> */}
    </main>
  );
}
