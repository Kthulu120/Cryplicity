import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  ContentAdd, DropDownMenu, FlatButton, FontIcon, IconButton, IconMenu, MenuItem, Paper, RaisedButton,
  TextField
} from 'material-ui';
import { coinDictionary } from '../../lib/coins/coinList';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { dispatch } from 'react-redux';
import { store } from './../../index';
import styles from './article.css';
import axios from 'axios'
import redditImg from './../../assets/img/otherLogos/reddit.png'
import {NewsArticle} from "./NewsArticle";

const style = {
  marginRight: 'auto',
};

export default class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      textBox: '',
      posts: []
    };
    this.loadNewsFeed();
  }

  handleChange = (event, index, value) => this.setState({ value });

  deleteSubreddit = (index) => {
    const arr = this.props.subreddits;
    arr.splice(index, 1);
    console.log(arr);
    this.props.setSubreddits(arr);
    this.setState({ textBox: '' });
    this.loadNewsFeed();
  };

  loadNewsFeed = () => {
    let urlString = '';
    this.props.subreddits.forEach((entry, index) => {
      if (index === 0) {
        urlString += entry;
      } else {
        urlString += `+${entry}`;
      }
    });
    const url = 'https://www.reddit.com/r/{URL_STRING}.json'.replace("{URL_STRING}", urlString);
    axios.get(url).then((response) => {
      // Grabs Articles
      this.setState({posts: response.data.data.children});
    })
  }

  render() {
    return (
      <Col sm={12}>
        <div className={styles.optionMenu}>
          <div className={styles.newsMenu}>
            <TextField
              hintText="Type In Subreddit & Click 'Add Sub'"
              onChange={(e) => {
                console.log(e.target.value);
                this.setState({ textBox: e.target.value });
              }}
            />
            <FlatButton
              onClick={(e) => {
                const arr = this.props.subreddits;
                arr.push(this.state.textBox);
                this.props.setSubreddits(arr);
                this.setState({ textBox: '' });
                this.loadNewsFeed();
              }}
              label="Add Sub"
              style={{ height: '100%' }}
            />
            <DropDownMenu value={-1} onChange={this.handleChange}>

              <MenuItem value={-1} primaryText="Click on Subreddits Here To Remove" disabled />

              {
                this.props.subreddits.map((currElem, index) => (
                  <MenuItem
                    value={index}
                    key={Math.random()}
                    onClick={(e) => {
                      this.deleteSubreddit(index);
                    }}
                    primaryText={currElem.toString()}
                  />
                  ))
              }
            </DropDownMenu>
          </div>
        </div>
        <div className={styles.articleContainer}>
          {
            this.state.posts.map((post) => (
              <NewsArticle post={post} />
            ))
          }
        </div>
      </Col>

    );
  }
}
