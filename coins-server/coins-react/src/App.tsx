import './App.css';
import Header from './components/Header.tsx';
import Login from './routes/Login.tsx';
import Router from './Router.tsx';
import SideBar from './components/SideBar.tsx';
function App() {
  return (
  <div className='bg-[rgb(10,10,11)] w-screen h-screen overflow-x-hidden '>
    <Header></Header>
    {/* <section className='flex'>
    <SideBar></SideBar> */}
    <Router></Router>
    {/* </section> */}
      
    {/* <Login></Login> */}
  </div>
  );
}

export default App;
