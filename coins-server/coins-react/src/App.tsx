import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header.tsx';
import Router from './Router.tsx';

function App() {
  
  return (
  <div className='bg-[rgb(10,10,11)] w-screen h-screen overflow-auto'>
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
