import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import UploadReport from './pages/UploadReport';
import FamilyManagement from './pages/FamilyManagement';
import Chat from './pages/Chat';
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadReport />} />
        <Route path="/family" element={<FamilyManagement />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Layout>
  );
}

export default App;
