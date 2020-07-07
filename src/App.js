import React from "react";
import Header from './components/home/Header'
import DashBoard from './components/home/DashBoard'
import Footer from './components/home/Footer'
import Audio from './components/Audio'

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <DashBoard />
      <Footer />
      <Audio />
    </div>
  );
}

export default App;
