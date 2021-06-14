import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductDetail from './screens/ProductDetail'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
function App() {
  return (
    <Router>
    <Header/>
      <main className = "py-5">
      <Container>
        <Route path = '/' component={ HomeScreen}  exact />
        <Route path = '/login' component={ LoginScreen } />
        <Route path = '/register' component={ RegisterScreen } />
        <Route path = '/profile' component={ ProfileScreen } />
        <Route path = '/product/:id' component={ProductDetail}/>
        <Route path = '/Cart/:id?' component={CartScreen}/>
        <Route path = '/admin/users' component={ UserListScreen } />
      </Container>
      </main>
    <Footer/>
    </Router>

  );
}

export default App;
