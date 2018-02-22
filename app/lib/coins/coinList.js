import Coin from './Coin';
import ada from '../../assets/img/coinLogos/cardano.png';
import bch from '../../assets/img/coinLogos/bch.png';
import btc from '../../assets/img/coinLogos/bitcoin.png';
import DASH from '../../assets/img/coinLogos/dash.png';
import eth from '../../assets/img/coinLogos/ethereum.png';
import IOTA from '../../assets/img/coinLogos/iota.png';
import ltc from '../../assets/img/coinLogos/litecoin.png';
import xrp from '../../assets/img/coinLogos/ripple.png';
// Mangle Egg Thanks To Logomakr
import mangleEgg from '../../assets/img/coinLogos/mangleEgg.png';
import Ethereum from "./Ethereum";
import Bitcoin from "./Bitcoin";
import Dogecoin from "./Dogecoin";
import Litecoin from "./Litecoin";
import BitcoinCash from "./BitcoinCash";
import Ripple from "./Ripple";
import ZCash from "./ZCash";
import Nano from "./Nano";

export const coinList = [
  { name: 'bitcoin', ticker: 'BTC', option: 'Bitcoin' },
  { name: 'ethereum', ticker: 'ETH', option: 'Ethereum' },
  { name: 'bitcoin-cash', ticker: 'BCH', option: 'Bitcoin Cash' },
  { name: 'ripple', ticker: 'XRP', option: 'Ripple' },
  { name: 'litecoin', ticker: 'LTC', option: 'Litecoin' },
  { name: 'cardano', ticker: 'ADA', option: 'Cardano' },
  { name: 'iota', ticker: 'MIOTA', option: 'IOTA' },
  { name: 'dash', ticker: 'DASH', option: 'Dash' },
  { name: 'nem', ticker: 'XEM', option: 'NEM' },
  { name: 'monero', ticker: 'XMR', option: 'Monero' },
  { name: 'bitcoin-gold', ticker: 'BTG', option: 'Bitcoin Gold' },
  { name: 'stellar', ticker: 'XLM', option: 'Stellar' },
  { name: 'eos', ticker: 'EOS', option: 'EOS' },
  { name: 'neo', ticker: 'NEO', option: 'NEO' },
  { name: 'ethereum-classic', ticker: 'ETC', option: 'Ethereum Classic' },
  { name: 'tron', ticker: 'TRX', option: 'TRON' },
  { name: 'qtum', ticker: 'QTUM', option: 'Qtum' },
  { name: 'populous', ticker: 'PPT', option: 'Populous' },
  { name: 'Lisk', ticker: 'LSK', option: 'Lisk' },
  { name: 'omisego', ticker: 'OmiseGO', option: 'OMG' },
  { name: 'zcash', ticker: 'ZEC', option: 'Zcash' },
  { name: 'dogecoin', ticker: 'DOGE', option: 'Dogecoin' },
  { name: 'nano', ticker: 'NANO', option: 'Nano' },

];

export const coinDictionary = {
  bitcoin: { name: 'bitcoin', ticker: 'BTC', option: 'Bitcoin', color: '#f9b01d', logo: btc, about: "Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network. Bitcoin is open-source; its design is public, nobody owns or controls Bitcoin and everyone can take part. Through many of its unique properties, Bitcoin allows exciting uses that could not be covered by any previous payment system." },
  ethereum: { name: 'ethereum', ticker: 'ETH', option: 'Ethereum', color: '#4c4a46', logo: eth, about: "Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third party interference.These apps run on a custom built blockchain, an enormously powerful shared global infrastructure that can move value around and represent the ownership of property.This enables developers to create markets, store registries of debts or promises, move funds in accordance with instructions given long in the past (like a will or a futures contract) and many other things that have not been invented yet, all without a middle man or counterparty risk." },
  'bitcoin-cash': { name: 'bitcoin-cash', ticker: 'BCH', option: 'Bitcoin Cash', color: '#3baf18', logo: bch, about: "Bitcoin Cash brings sound money to the world, fulfilling the original promise of Bitcoin as 'Peer-to-Peer Electronic Cash'. Merchants and users are empowered with low fees and reliable confirmations. The future shines brightly with unrestricted growth, global adoption, permissionless innovation, and decentralized development. All Bitcoin holders as of block 478558 are also owners of Bitcoin Cash. All are welcome to join the Bitcoin Cash community as we move forward in creating sound money accessible to the whole world."},
  ripple: { name: 'ripple', ticker: 'XRP', option: 'Ripple', color: '#0f6996', logo: xrp, about: "Ripple provides one frictionless experience to send money globally using the power of blockchain. By joining Ripple’s growing, global network, financial institutions can process their customers’ payments anywhere in the world instantly, reliably and cost-effectively. Banks and payment providers can use the digital asset XRP to further reduce their costs and access new markets." },
  litecoin: { name: 'litecoin', ticker: 'LTC', option: 'Litecoin', color: '#3ea5f9', logo: ltc, about: "Litecoin is a peer-to-peer Internet currency that enables instant, near-zero cost payments to anyone in the world. Litecoin is an open source, global payment network that is fully decentralized without any central authorities. Mathematics secures the network and empowers individuals to control their own finances. Litecoin features faster transaction confirmation times and improved storage efficiency than the leading math-based currency. With substantial industry support, trade volume and liquidity, Litecoin is a proven medium of commerce complementary to Bitcoin." },
  cardano: { name: 'cardano', ticker: 'ADA', option: 'Cardano', color: '#1a4466', logo: ada, about: "Cardano is a decentralised public blockchain and cryptocurrency project and is fully open source. Cardano is developing a smart contract platform which seeks to deliver more advanced features than any protocol previously developed. It is the first blockchain platform to evolve out of a scientific philosophy and a research-first driven approach. The development team consists of a large global collective of expert engineers and researchers" },
  iota: { name: 'iota', ticker: 'MIOTA', option: 'IOTA', color: '#1f3242', logo: IOTA, about: "As the Internet-of-Things keep expanding, the need for interoperability and sharing of resources become a necessity. IOTA enables companies to explore new business-2-business models by making every technological resource a potential service to be traded on an open market in real time, with no fees." },
  dash: { name: 'dash', ticker: 'DASH', option: 'Dash', color: '#005faf', logo: DASH, about: "At Dash’s core is a unique fully-incentivized peer-to-peer network. Miners are rewarded for securing the blockchain and masternodes are rewarded for validating, storing and serving the blockchain to users. Masternodes represent a new layer of network servers that work in highly secure clusters called quorums to provide a variety of decentralized services, like instant transactions, privacy and governance, while eliminating the threat of low-cost network attacks." },
  nem: { name: 'nem', ticker: 'XEM', option: 'NEM', color: '#d39e58', logo: mangleEgg, about: "The NEM Smart Asset System allows you to totally customize how you use the NEM blockchain. First, your Namespace defines your home on the blockchain where you can name your own Mosaics, provide easy-to-remember names to user addresses, and more.Mosaics then are the basic building blocks of Smart Assets that you can use to represent lots of simple things: it could be a coin, a signature, a status update or more – you decide.To create truly Smart Assets however, NEM allows you to create Addresses that act as containers for Mosaics that can be connected with Multisig rules. An address can simply represent a user, such as an account holder. But it can also represent an individual unique asset such as a document, or a song, or a package. You can then update that asset through configurable Transactions. See our “example use cases” below to see how Smart Assets can be used to create a wide variety of blockchain solutions, quickly and reliably." },
  monero: { name: 'monero', ticker: 'XMR', option: 'Monero', color: '#f25800', logo: mangleEgg, about: "Monero is a secure, private, and untraceable cryptocurrency. It is open-source and accessible to all. With Monero, you are your own bank. Only you control and are responsible for your funds. Your accounts and transactions are kept private from prying eyes." },
  'bitcoin-gold': { name: 'bitcoin-gold', ticker: 'BTG', option: 'Bitcoin Gold', color: '#ffa100', logo: mangleEgg, about: "The purpose of Bitcoin Gold is to make Bitcoin mining decentralized again. Satoshi Nakamoto’s idealistic vision of “one CPU one vote” has been superseded by a reality where the manufacture and distribution of mining equipment has become dominated by a very small number of entities, some of which have engaged in abusive practices against individual miners and the Bitcoin network as a whole. By changing Bitcoin’s proof-of-work algorithm from SHA256 to Equihash, all of the specialized SHA256 mining equipment will be obsolete for mining the Bitcoin Gold blockchain. Thus, Bitcoin Gold will provide an opportunity for countless new people around the world to participate in the mining process with widely-available consumer hardware that is manufactured and distributed by reputable mainstream corporations. A more decentralized, democratic mining infrastructure is more resilient and more in line with Satoshi’s original vision." },
  stellar: { name: 'stellar', ticker: 'XLM', option: 'Stellar', color: '#808e8e', logo: mangleEgg, about: "Stellar is a distributed, hybrid blockchain that is fully open-source. It is infrastructure that exists to facilitate cross-asset transfers of value, including payments. With just one integration into the Stellar Network, you will join an open, global financial network where all actors – be they people, payment networks, or banks – have equal access & economic participation." },
  eos: { name: 'eos', ticker: 'EOS', option: 'EOS', color: '#262626', logo: mangleEgg, about: "EOS.IO is software that introduces a blockchain architecture designed to enable vertical and horizontal scaling of decentralized applications (the “EOS.IO Software”). This is achieved through an operating system-like construct upon which applications can be built. The software provides accounts, authentication, databases, asynchronous communication and the scheduling of applications across multiple CPU cores and/or clusters. The resulting technology is a blockchain architecture that has the potential to scale to millions of transactions per second, eliminates user fees and allows for quick and easy deployment of decentralized applications." },
  neo: { name: 'neo', ticker: 'NEO', option: 'NEO', color: '#6ab551', logo: mangleEgg, about: "NEO is a non-profit community-based blockchain project that utilizes blockchain technology and digital identity to digitize assets, to automate the management of digital assets using smart contracts, and to realize a 'smart economy' with a distributed network. NEO was founded in 2014 and was real-time open source on GitHub in June 2015. Since its inception, the NEO team has experienced the upsurge and boom of the blockchain industry and the frenzy and cooling of the digital money market. We believe technology drives progress and together we can create the future. Motivated by this, NEO has been created to shift our traditional economy into the new era of the 'Smart Economy'" },
  'ethereum-classic': { name: 'ethereum-classic', ticker: 'ETC', option: 'Ethereum Classic', color: '#436c82', logo: mangleEgg, about: "We believe the core value proposition of any blockchain is immutability; valid transactions can never be erased or forgotten. Individuals interacting on Ethereum Classic are governed by this reality; Code is Law.This does not necessarily mean that code replaces existing laws, or that only code is law (there are many geographical jurisdictions), but it gives users the opportunity to enter into a new blockchain-based jurisdiction where agreements are governed by code. By entering into contracts on Ethereum Classic, you can be certain that the network remains neutral. The outcome of transactions will be dictated by code you voluntarily interact with. Unless explicitly defined by the contract code, there are no reversals, no undos, no opt-outs. Transactions are final; applications are unstoppable." },
  tron: { name: 'tron', ticker: 'TRX', option: 'TRON', color: '#1e5572', logo: mangleEgg, about: "TRON is a blockchain-based decentralized protocol that aims to construct a worldwide free content entertainment system with the blockchain and distributed storage technology. The protocol allows each user to freely publish, store and own data, and in the decentralized autonomous form, decides the distribution, subscription and push of contents and enables content creators by releasing, circulating and dealing with digital assets, thus forming a decentralized content entertainment ecosystem. Peiwo App with over 10 million users will become the first TRON-compatible entertainment APP." },
  qtum: { name: 'qtum', ticker: 'QTUM', option: 'Qtum', color: '#4cade0', logo: mangleEgg, about: "Combining a modified Bitcoin Core infrastructure with an intercompatible version of the Ethereum Virtual Machine (EVM), Qtum merges the reliability of Bitcoin’s unfailing blockchain with the endless possibilities provided by smart contracts. Designed with stability, modularity and interoperability in mind, Qtum is the foremost toolkit for building trusted decentralized applications, suited for real-world, business oriented use cases. Its hybrid nature, in combination with a first-of-its-kind PoS consensus protocol, allow Qtum applications to be compatible with major blockchain ecosystems, while providing native support for mobile devices and IoT appliances." },
  bitconnect: { name: 'bitconnect', ticker: 'BCC', option: 'BitConnect', color: '#ff843d', logo: mangleEgg, about: "SCAM" },
  populous: { name: 'populous', ticker: 'PPT', option: 'Populous', color: '#1d2856', logo: mangleEgg, about: "Populous is a P2P (peer-to-peer) invoice finance platform that is globalising what is currently a localised and limited market sector. It is a global invoice trading platform built on Blockchain's distributed ledger technology. Invoice finance is a form of funding that instantly unlocks the cash tied up in outstanding sales invoices. Business owners allow invoice buyers to buy invoices at a discounted rate in order to unlock their cash quicker. Once invoices are paid by the invoice debtor, the invoice buyer receives the amount previously agreed upon. Populous uniquely connects business owners with invoice buyers on a global scale by leveraging the security, transparency, and speed of Blockchain via XBRL data, Altman Z-score formula, smart contracts and stable fiat-pegged tokens. We will disrupt the traditional invoice financing system by eliminating the need for third parties or financial institutions by connecting businesses with global invoice buyers directly." },
  lisk: { name: 'lisk', ticker: 'LSK', option: 'Lisk', color: '#0d4077', logo: mangleEgg, about: "Nowadays, we have Apple’s App Store and Google’s Play Store. Both centralized solutions owned by corporations for centralized applications. The Lisk Foundation believes in a decentralised future. In order to achieve this, Lisk strives to make blockchain technology accessible for everybody by building a blockchain application platform likewise for users and developers." },
  omisego: { name: 'omisego', ticker: 'OmiseGO', option: 'OMG', color: '#1e3cff', logo: mangleEgg, about: "OmiseGO is the answer to a fundamental coordination problem amongst payment processors, gateways and financial institutions. By enabling decentralized exchange on a public blockchain at high volume and low cost, OmiseGO provides a next-generation value transfer service operating across currencies and asset types. Through the OmiseGO network connected to the Ethereum mainnet, anyone will be able to conduct financial transactions such as payments, remittances, payroll deposit, B2B commerce, supply-chain finance, loyalty programs, asset management and trading, and other on-demand services, in a completely decentralized and inexpensive way. Further, millions of mainstream users in the largest growing economies in the world will be enabled to make the transition from using fiat money to using decentralized currencies such as ETH, BTC, and others. The OmiseGO network is intrinsically agnostic between fiat and decentralized money: as far as adoption and usage go, the system is constructed so that the best currencies will win." },
  zcash: { name: 'zcash', ticker: 'ZEC', option: 'Zcash', color: '#af8021', logo: mangleEgg, about: "Bitcoin and most cryptocurrencies expose your entire payment history to the public. Zcash is the first open, permissionless cryptocurrency that can fully protect the privacy of transactions using zero-knowledge cryptography." },
  dogecoin: { name: 'dogecoin', ticker: 'DOGE', option: 'Dogecoin', color: '#af7501', logo: mangleEgg, about: "Dogecoin is a decentralized, peer-to-peer digital currency that enables you to easily send money online. Think of it as 'the internet currency.'" },
  nano: { name: 'nano', ticker: 'NANO', option: 'Nano', color: '#1e3cfa', logo: mangleEgg, about: "Launched in 2015 by Colin LeMahieu as RaiBlocks, Nano is a low-latency payment platform that requires minimal resources; making Nano ideal for peer-to-peer transactions.Nano transactions happen immediately, so it's a currency you can use every day for purchases large or small.Pay for the purchase, not the privilege – zero fees on whatever you buy, from bus ticket to business class flight.Nano can process over 1000x more transactions per second than Bitcoin, so you'll never get stuck in a queue." },

};

export const coinObjectDictionary = {
  bitcoin: new Bitcoin('bitcoin', 'BTC', 'Bitcoin'),
  ethereum: new Ethereum('ethereum', 'ETH', 'Ethereum'),
  'bitcoin-cash': new BitcoinCash('bitcoin-cash', 'BCH', 'Bitcoin Cash'),
  ripple: new Ripple('ripple', 'XRP', 'Ripple'),
  litecoin: new Litecoin('litecoin', 'LTC', 'Litecoin'),
  cardano: new Coin('cardano', 'ADA', 'Cardano'),
  iota: new Coin('iota', 'MIOTA', 'IOTA'),
  dash: new Coin('dash', 'DASH', 'Dash'),
  nem: new Coin('nem', 'XEM', 'NEM'),
  monero: new Coin('monero', 'XMR', 'Monero'),
  'bitcoin-gold': new Coin('bitcoin-gold', 'BTG', 'Bitcoin Gold'),
  stellar: new Coin('stellar', 'XLM', 'Stellar'),
  eos: new Coin('eos', 'EOS', 'EOS'),
  neo: new Coin('neo', 'NEO', 'NEO'),
  'ethereum-classic': new Coin('ethereum-classic', 'ETC', 'Ethereum Classic'),
  tron: new Coin('tron', 'TRX', 'TRON'),
  qtum: new Coin('qtum', 'QTUM', 'Qtum'),
  populous: new Coin('populous', 'PPT', 'Populous'),
  lisk: new Coin('lisk', 'LSK', 'Lisk'),
  omisego: new Coin('omisego', 'OmiseGO', 'OMG'),
  zcash: new ZCash('zcash', 'ZEC', 'Zcash'),
  dogecoin: new Dogecoin('dogecoin', 'DOGE', 'Dogcoin'),
  nano: new Nano('nano','NANO', 'Nano')
};
