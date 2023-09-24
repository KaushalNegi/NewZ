import React, { Component } from 'react';
import Navbar from "./Components/Navbar.js"
import News from "./Components/News.js";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

export default class App extends Component {
  state = {
    search: localStorage.getItem("search"),
  };
  whatToSearch = input => {
    this.setState({
      search: input
    })
  }

  render() {
    return (
      <Router>
        <Navbar heading="NewZ" searchProps={this.state} whatToSearch={this.whatToSearch} />
        <Routes>
          <Route exact path="/" element={<News key="general" category="general" />} />
          <Route exact path="/business" element={<News key="business" category="business" />} />
          <Route exact path="/entertainment" element={<News key="entertainment" category="entertainment" />} />
          <Route exact path="/health" element={<News key="health" category="health" />} />
          <Route exact path="/science" element={<News key="science" category="science" />} />
          <Route exact path="/sports" element={<News key="sports" category="sports" />} />
          <Route exact path="/technology" element={<News key="technology" category="technology" />} />
          <Route exact path="/search" element={<News key="search" searchProps={this.state} topHeadlines={false} />} />
        </Routes>
      </Router>
    )
  }
}