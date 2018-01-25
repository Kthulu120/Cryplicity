import { connect } from 'react-redux';
import { DELETE_WALLET } from '../../actions/wallets';
import WalletsHome from '../../components/wallets/WalletsHome';

const mapStateToProps = state => ({
  wallets: state.walletManager.wallets,
  tableData: state.chartsManager.wantedCoinsInfoSummary,
});


const mapDispatchToProps = dispatch => ({
  deleteWallet: (id) => {
    dispatch(DELETE_WALLET(id));
  }
});

const WalletContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletsHome);

export default WalletContainer;
