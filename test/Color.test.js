const { assert } = require('chai')

const Color = artifacts.require('./Color.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Color', (accounts) => {
  let contract

  beforeEach(async () => {
    contract = await await Color.deployed()
  })

  describe('deployment', async () => {
    it('deploy', async () => {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Color')
    })

    it('has a symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'CLR')
    })
  })

  describe('minting', async () => {
    it('creates a new token', async () => {
      const result = await contract.mint('#000')
      const totalSupply = await contract.totalSupply()
      const event = result.logs[0].args
      //success test
      assert.equal(totalSupply, 1)
      assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
      assert.equal(
        event.from,
        0x0000000000000000000000000000000000000000,
        'from is correct'
      )
      assert.equal(event.to, accounts[0], 'to is correct')

      //failure test
      await contract.mint('#000').should.be.rejected
    })
  })

  describe('indexing', async () => {
    it('list tokens', async () => {
      await contract.mint('#FFF')
      await contract.mint('#BBB')

      const totalSupply = await contract.totalSupply()
      let color
      let result = []

      for (let index = 1; index <= totalSupply; index++) {
        color = await contract.colors(index - 1)
        result.push(color)
      }

      let expected = ['#000', '#FFF', '#BBB']
      assert.equal(result.join(','), expected.join(','))
    })
  })
})
