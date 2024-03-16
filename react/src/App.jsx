import React, { useState } from 'react';
import Admin from './Admin';
import Client from './Client';

function App() {
  const [currentView, setCurrentView] = useState('client');

  return (
    <>
    <div>
      <button onClick={() => setCurrentView('client')}>Client</button>
      <button onClick={() => setCurrentView('admin')}>Admin</button>
    </div>
      <hr />
    <div>
      {currentView === 'client' && <Client />}
      {currentView === 'admin' && <Admin />}
    </div>
    </>
  );
}

export default App;