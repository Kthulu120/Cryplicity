import React, { Component } from 'react';
import OptionMenu from './OptionMenu';
import axios from 'axios';
import Menu from './Menu';
import { dispatch } from 'react-redux';
import ArticleWrapper from './ArticleWrapper';
import Card from '../Card';
import { Col } from 'react-flexbox-grid';


export default class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      textBox: '',
      posts: []
    };
  }

  componentDidMount = () => {
    this.loadNewsFeed();
  };

  handleChange = (event, index, value) => this.setState({ value });

  deleteSubreddit = (index) => {
    const arr = this.props.subreddits;
    arr.splice(index, 1);
    this.props.setSubreddits(arr);
    this.setState({ textBox: '' });
    this.loadNewsFeed();
  };

  addSubreddit = (e) => {
    const arr = this.props.subreddits;
    arr.push(this.state.textBox);
    this.props.setSubreddits(arr);
    this.setState({ textBox: '' });
    this.loadNewsFeed();
  }

  loadNewsFeed = () => {
    let urlString = '';
    this.props.subreddits.forEach((entry, index) => {
      if (index === 0) {
        urlString += entry;
      } else {
        urlString += `+${entry}`;
      }
    });
    const url = 'https://www.reddit.com/r/{URL_STRING}.json'.replace('{URL_STRING}', urlString);
    axios.get(url).then((response) => {
      // Grabs Articles
      this.setState({ posts: response.data.data.children });
    }).catch();
  };

  render() {
    return (
      <Col sm={12}>
        <OptionMenu>
          <Menu
            handleChange={this.handleChange}
            addSubreddit={this.addSubreddit}
            subreddits={this.prop.subreddits}
          />
        </OptionMenu>
        <ArticleWrapper>
          {/* eslint-disable max-len */}
          {
            this.state.posts.map((post) => (
              <Card post={post} isSelf={post.data.is_self} selfText={post.data.selftext} id={post.data.name} />
            ))
          }
        </ArticleWrapper>
      </Col>
    );
  }
}
