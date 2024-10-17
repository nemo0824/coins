import './App.css';
import Header from './components/Header.tsx';
import Login from './routes/Login.tsx';
import Router from './Router.tsx';
function App() {
  return (
  <div className='bg-[#0A0A0B] min-h-screen'>
    <Header></Header>
    <Router></Router>
    {/* <Login></Login> */}
  </div>
  );
}

export default App;
