import { connect } from 'react-redux';
import Home from '../../components/Home';
import { SET_WANTED_COIN_DATA, ADD_RECHART_HOME_COIN_DATA } from '../../actions/charts';
import moment from 'moment';

const mapStateToProps = state => ({
  wallets: state.walletManager.wallets,
  tableData: state.chartsManager.wantedCoinsInfoSummary,
  graphData: state.chartsManager.rechartHomeData
});


const mapDispatchToProps = dispatch => ({
  recordData: (data) => {
    const transformedData = {};
    transformedData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    for (const row in data) {
      transformedData[`${data[row].name}`] = parseFloat(data[row].price_usd);
    }
    dispatch(SET_WANTED_COIN_DATA(data));
    dispatch(ADD_RECHART_HOME_COIN_DATA(transformedData));
  }
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;
