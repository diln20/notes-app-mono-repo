
import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

const Home = () => <h1>Home</h1>

const Notes = () => <h1>Notes</h1>

const Users = () => <h1>Users</h1>

const inlineStyles = {
  padding: 5
}

const App = () => {
  return (
      <BrowserRouter>
      <header>
        <Link to='/' style={inlineStyles}>home</Link>
        <Link to='/notes' style={inlineStyles}>notes</Link>
        <Link to='/users' style={inlineStyles}>users</Link>
      </header>
      <Route path='/notes'>
        <Notes />
      </Route>
      <Route path='/users'>
        <Users />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </BrowserRouter>
  )
}


export default App;