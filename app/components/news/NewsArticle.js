import React from 'react';
import styles from './article.css';
import redditImg from './../../assets/img/otherLogos/reddit.png';
import {abbreviateNumber} from "../../lib/commons/util";
import moment from 'moment';

moment.fn.minutesFromNow = () => {
  let r = Math.floor((+new Date() - (+this))/60000);
  return r + ' min' + ((r===1) ? '' : 's') + ' ago';
}

export const NewsArticle = ({post}) => (
  <div className={styles.paper}>
    <div className={styles.article}>
      <img
        src={(post.data.thumbnail !== "") && (post.data.thumbnail !== "self") && (post.data.thumbnail !== " ")? post.data.thumbnail : redditImg}
        className={styles.articleImg}
      />
      <div className={styles.articleInfo}>
        <div className="ac">
          <div className={styles.articleTitle}>
            {post.data.title}
          </div>
          <div className={styles.articleInfoContainer}>
            <div className={styles.articleTimestmp}>
                  submitted {moment.unix(parseFloat(post.data.created)).minutesFromNow()} ago by &nbsp;
            </div>
            <div className={styles.articlePoster}>
              {post.data.author}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.articleOption}>
        {abbreviateNumber(post.data.ups).toString()} Upvotes
      </div>
    </div>
  </div>

    );
