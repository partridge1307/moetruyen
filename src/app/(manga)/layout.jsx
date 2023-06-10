import '@styles/globals.css';
import Header from '@components/Header/Header';

const Layout = ({ children }) => {
  return (
    <main className="app">
      <Header />
      {children}
    </main>
  );
};

export default Layout;
