import { connect } from 'react-redux';
import { DELETE_WALLET } from '../../actions/wallets';
import NewsFeed from "../../components/news/NewsFeed";
import {SET_SUBREDDITS} from "../../actions/settings";

const mapStateToProps = state => ({
  subreddits: state.storeManager.newsFeed.subreddits,
  tableData: state.chartsManager.wantedCoinsInfoSummary,
});


const mapDispatchToProps = dispatch => ({
  setSubreddits: (arrayOfSubreddits) => {
    dispatch(SET_SUBREDDITS(arrayOfSubreddits));
  }
});

const NewsFeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsFeed);

export default NewsFeedContainer;
