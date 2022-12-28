/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';


const Home = () => <h1>Home</h1>

const Notes = () => <h1>Notes</h1>

const Users= () => <h1>Users</h1>

const inlineStyles = {
  padding: 5
}

const App = () => {
  const [page, setPage] = useState(() => {
    const { pathname } = window.location
    const page = pathname.slice(1)
    return page
  })

  const getContent = () => {
    switch (page) {
      case 'notes':
        return <Notes />
      case 'users':
        return <Users />
      default:
        return <Home />
    }
  }


  const toPage = page => event => {
    window.history.pushState(null, '', `/${page}`)
    event.preventDefault()
    setPage(page)
  }

  return (
    <div>
      <header>
        <a href='#' onClick={toPage('home')} style={inlineStyles}>home</a>
        <a href='#' onClick={toPage('notes')} style={inlineStyles}>notes</a>
        <a href='#' onClick={toPage('users')} style={inlineStyles}>users</a>
      </header>
      {getContent()}
    </div>
  )
}


export default App;