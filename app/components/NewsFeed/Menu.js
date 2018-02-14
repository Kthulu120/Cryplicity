import React from 'react';
import MenuWrapper from './MenuWrapper';
import { DropDownMenu, FlatButton, MenuItem, TextField } from 'material-ui';

const Menu = (props) => (
  <MenuWrapper>
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
  </MenuWrapper>
    );

export default Menu;
