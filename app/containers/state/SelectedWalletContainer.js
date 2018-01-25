import { connect } from 'react-redux';
import { DELETE_WALLET } from '../../actions/wallets';
import SelectedWallet from '../../components/wallets/SelectedWalletContainer/SelectedWallet';

const mapStateToProps = state => ({
  wallets: state.walletManager.wallets,
  selectedWallet: state.walletManager.selectedWallet,
});


const mapDispatchToProps = dispatch => ({
  deleteWallet: (id) => {
    dispatch(DELETE_WALLET(id));
  }
});

const SelectedWalletContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedWallet);

export default SelectedWalletContainer;
