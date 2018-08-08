const PicsumToken = artifacts.require('PicsumToken')

const defaultName = 'PicsumToken'
const defaultSymbol = 'PMT'
const defaultUriBase = 'https://picsum.photos/600/400?image='

module.exports = deployer => {
  deployer.deploy(PicsumToken, defaultName, defaultSymbol, defaultUriBase)
}
