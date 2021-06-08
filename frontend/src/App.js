import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
function App() {
  return (
    <div>
    <Header/>
    Hello
    <main className = "py-5">
    <Container>
    <h1>Hey</h1>
    </Container>
    </main>
    <Footer/>
    </div>
  );
}

export default App;
