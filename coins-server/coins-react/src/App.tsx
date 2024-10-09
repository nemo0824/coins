import './App.css';
import Header from './components/Header.tsx';
import Login from './routes/Login.tsx';
import Router from './Router.tsx';
function App() {
  return (
  <>
    <Header></Header>
    <Router></Router>
    {/* <Login></Login> */}
  </>
  );
}

export default App;
