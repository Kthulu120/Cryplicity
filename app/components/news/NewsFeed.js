import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid';
import {
  ContentAdd, DropDownMenu, FlatButton, MenuItem,
  TextField
} from 'material-ui';
import { dispatch } from 'react-redux';
import styles from './article.css';
import axios from 'axios';
import Card from '../Card';

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

  openModal = () => {

  };

  handleChange = (event, index, value) => this.setState({ value });

  deleteSubreddit = (index) => {
    const arr = this.props.subreddits;
    arr.splice(index, 1);
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
    const url = 'https://www.reddit.com/r/{URL_STRING}.json'.replace('{URL_STRING}', urlString);
    axios.get(url).then((response) => {
      // Grabs Articles
      this.setState({ posts: response.data.data.children });
    }).catch();
  };

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
              <Card post={post} isSelf={post.data.is_self} selfText={post.data.selftext} openModal={this.openModal} id={post.data.name}/>
            ))
          }
        </div>
      </Col>

    );
  }
}
