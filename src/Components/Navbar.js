import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Navbar extends Component {

    state = {
        disableSearchButton: true
    }

    handleSearch = () => {
        let input = document.getElementById("searchNews").value;
        let triggerLink = document.getElementById("triggerLink");
        localStorage.setItem("search", input);
        this.props.whatToSearch(input);
        triggerLink.click();
    }

    handleKeyPress = (event) => {
        let searchNews = document.getElementById("searchNews");
        if (event.key === "Enter") {
            let searchButton = document.getElementById("searchButton");
            searchButton.click();
        }
        else {
            searchNews.value.length ? (this.state.disableSearchButton && this.setState({ disableSearchButton: false })) : (!this.state.disableSearchButton && this.setState({ disableSearchButton: true }));
        }
    }

    componentDidMount() {
        let searchNews = document.getElementById("searchNews");
        searchNews.addEventListener("keyup", this.handleKeyPress);
    }

    render() {
        return (
            <>
                <nav className="navbar sticky-top navbar-expand-lg bg-dark navbar-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand mx-2" to="/">{this.props.heading}</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/business">business</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/entertainment">entertainment</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/">general</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/health">health</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/science">science</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/sports">sports</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/technology">technology</Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <input id="searchNews" className="form-control me-2" type="text" placeholder="Search" aria-label="Search" />
                                <button id="searchButton" className="btn btn-outline-success text-light" disabled={this.state.disableSearchButton} onClick={this.handleSearch}>
                                    <Link id="triggerLink" className="nav-link" to="/search">Search</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}