import React, { Component } from 'react';

export default class NewsItem extends Component {
    state = {
        imgValid: true
    }
    render() {
        let { imgURL, title, description, newsURL, author, date, name } = this.props;
        return (
            <>
                <div className="card position-relative">
                    <span className="position-absolute badge rounded-pill bg-danger" style={{ top: "0%", right: "0%" }}>{name}</span>
                    <img className="card-img-top" src={imgURL && this.state.imgValid ? imgURL : process.env.REACT_APP_altImgURL} alt="not found" onError={() => {
                        this.setState({
                            imgValid: false
                        })
                    }} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text text-muted">Contributed by -
                            <strong className="text-info">{author ? author : "Anonymous"}</strong>
                        </p>
                        <p className="card-text text-muted">Date -
                            <strong>{date ? new Date(date).toGMTString() : "Unknown"}</strong>
                        </p>
                        <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-warning">Read more</a>
                    </div>
                </div>
            </>
        )
    }
}