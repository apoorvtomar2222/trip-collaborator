import { useEffect } from 'react'
import '../styles/globals.css'
import NavBar from './internal/NavBar'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('user');
    if (location.pathname === '/' || location.pathname === '/internal') {
      if (!userId) {
        router.push('/internal/LoginPage');
      } else {
        router.push('/internal/Feeds');
      }

    }
    if (!userId) {
      router.push('/internal/LoginPage');
    }
  }, []);
  return (
    <NavBar>
      <Component {...pageProps} />
    </NavBar>
  )
}

export default MyApp
