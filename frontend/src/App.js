import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductDetail from './screens/ProductDetail'
import CartScreen from './screens/CartScreen'

function App() {
  return (
    <Router>
    <Header/>
      <main className = "py-5">
      <Container>
        <Route path = '/' component={ HomeScreen}  exact />
        <Route path = '/product/:id' component={ProductDetail}/>
        <Route path = '/Cart/:id?' component={CartScreen}/>
      </Container>
      </main>
    <Footer/>
    </Router>

  );
}

export default App;
