import React, { Component } from "react";
export default class Loading extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: this.props.height }}>
                <div className="spinner-border" style={{
                    width: "3rem",
                    height: "3rem",
                    role: "status"
                }}>
                </div>
            </div>
        )
    }
}