import React, { Component } from 'react'

export default class Error extends Component {

    render() {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "70vh" }}>
                <h1 style={{ fontSize: '2em', textAlign: 'center', marginBottom: "20px" }}>Oops 😓! Something went wrong.</h1>
                <p style={{ fontSize: '1.2em', textAlign: 'center' }}>
                    {
                        this.props.keyExhaustError ?
                            "You have made too many requests recently . Developer accounts are limited to 100 requests over a 24 hour period (50 request availabe every 12 hours). Please upgrade to a paid plan if you need more requests."
                            :
                            "Unfortunately, your search didn't match any results. Please try searching for something else."
                    }
                </p>
            </div>
        );
    };

}