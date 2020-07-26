import React from 'react';

import Navigation from './features/navigation/Navigation';
import TodoTable from './features/todo/TodoTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation>
        <TodoTable />
      </Navigation>
    </div>
  );
}

export default App;
