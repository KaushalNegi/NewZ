import React, { Component } from "react";
import Loading from "./Loading.js";
import NewsItem from "./NewsItem.js";
import Error from "./Error.js";

export default class News extends Component {

    totalArticles = 99;
    constructor() {
        super();
        this.state = {
            articles: [],
            pageNo: 1,
            loading: true,
            keyExhaustError: false
        }
    }

    showSearchedNews = () => {
        this.totalArticles = 99;
        this.setState({
            articles: [],
            pageNo: 0,
            loading: true,
        }, this.fetchMoreData);
    }

    handleInfiniteScroll = () => {
        if (!this.state.loading && document.documentElement.scrollTop + window.innerHeight === document.documentElement.scrollHeight && Math.ceil(this.totalArticles / 9) >= this.state.pageNo + 1) {
            this.setState({ loading: true }, this.fetchMoreData)
        }
    }

    getArticles = async () => {
        let URL = this.props.topHeadlines ? `https://newsapi.org/v2/top-headlines?country=in&pagesize=9&page=${this.state.pageNo}&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}`
            : `https://newsapi.org/v2/everything?pagesize=9&page=${this.state.pageNo}&q=${this.props.searchProps.search}&searchIn=title&sortBy=popularity&language=en&apiKey=${process.env.REACT_APP_API_KEY}`;
        let data = await (await fetch(URL)).json();
        if (data.status === "error") {
            this.setState({ keyExhaustError: true });
            return [];
        }
        if (data.totalResults < 100) {
            this.totalArticles = data.totalResults;
        }
        return data.articles;
    }

    fetchMoreData = () => {
        this.setState({
            pageNo: this.state.pageNo + 1
        }, async () => {
            let data = await this.getArticles();
            this.setState({
                articles: data.length ? this.state.articles.concat(data) : [],
                loading: false
            })
        })
    }

    async componentDidMount() {
        window.addEventListener("scroll", this.handleInfiniteScroll)
        let data = await this.getArticles();
        this.setState({
            articles: data,
            loading: false
        })
    }

    componentDidUpdate(prevProps, prevState) {
        prevProps.searchProps.search !== this.props.searchProps.search && this.showSearchedNews();
    }

    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="alert alert-danger my-4" role="alert">
                        <h1>NewZ - Top headlines</h1>
                    </div>
                </div>
                <div className="row">
                    {this.state.articles.map(element =>
                        <div key={element.url} className="col-md-4 my-4">
                            <NewsItem imgURL={element.urlToImage} title={element.title} description={element.description} newsURL={element.url} author={element.author} date={element.publishedAt} name={element.source.name} />
                        </div>
                    )}
                </div>
                {
                    this.state.loading ?
                        <Loading height={(this.state.articles.length ? 15 : 75) + "vh"} />
                        :
                        this.state.articles.length === 0 && <Error keyExhaustError={this.state.keyExhaustError} />
                }
            </div>
        )
    }
}

News.defaultProps = {
    searchProps: {
        search: "",
    },
    category: "general",
    topHeadlines: true
}