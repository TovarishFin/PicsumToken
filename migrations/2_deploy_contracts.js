const PicsumToken = artifacts.require('PicsumToken')

const defaultName = 'PicsumToken'
const defaultSymbol = 'pmt'
const defaultUriBase = 'https://picsum.photos/200/300?image='

module.exports = deployer => {
  deployer.deploy(PicsumToken, defaultName, defaultSymbol, defaultUriBase)
}
