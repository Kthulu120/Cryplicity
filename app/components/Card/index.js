/* eslint-disable react/require-default-props */
import React from 'react';
import Wrapper from './Wrapper';
import Title from './Title';
import Description from './Description';
import Author from './Author';
import PropTypes from 'prop-types';
import rocket from './../../assets/img/otherLogos/rocket.png';
import Icon from './Icon';
import { abbreviateNumber } from '../../lib/commons/util';
import ImageChooser from '../../utils/ImageChooser';
import { styled } from 'styled-components';

function time2TimeAgo(ts) {
  // This function computes the delta between the
  // provided timestamp and the current time, then test
  // the delta for predefined ranges.

  const d = new Date();  // Gets the current time
  const nowTs = Math.floor(d.getTime() / 1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
  const seconds = nowTs - ts;
  // more that two days
  if (seconds > 2 * 24 * 3600) {
    return 'a few days ago';
  }
  // a day
  if (seconds > 24 * 3600) {
    return 'yesterday';
  }

  if (seconds > 3600) {
    return 'a few hours ago';
  }
  if (seconds > 1800) {
    return 'Half an hour ago';
  }
  if (seconds > 60) {
    return `${Math.floor(seconds / 60)} minutes ago`;
  }
  // reddit played us
  return 'some time ago';
}

function generateGradient(isSelf) {
  if (isSelf) { return 'linear-gradient(135deg, #e0f7ff, 85%, #96e4ff)'; }
  const OPTIONS = ['linear-gradient(135deg, #f7e0f9, 80%, #f9eff3)', 'linear-gradient(135deg, #fff5d3, 60%, #ffcfc4)'];
  return OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
}


function Card(props) {
  return (
    <Wrapper style={{ background: generateGradient(props.isSelf) }}>
      <Icon src={ImageChooser.redditFlairImageChooser(props.post.data.link_flair_text)} alt={props.post.data.title} />
      <Title>{props.post.data.title}</Title>
      <Description>{props.post.data.selftext}</Description>
      <Author> {`${props.post.data.author} - ${abbreviateNumber(props.post.data.ups)} Upvotes, submitted  ${time2TimeAgo(props.post.data.created_utc)}`} </Author>
    </Wrapper>
  );
}

Card.propTypes = {
  post: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};


export default Card;
