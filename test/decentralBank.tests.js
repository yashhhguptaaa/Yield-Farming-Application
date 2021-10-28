

const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank',([owner,customer]) => {
    let tether, rwd, decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')   
    }

    before(async () => {
        // Load Contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)

        // Transfer all tokens to DecentralBank (1 million)
        await rwd.transfer(decentralBank.address, tokens('1000000'))

        // Transfer 100 Tethers to Customer
        await tether.transfer(customer,tokens('100'),{from: owner})
    })

    describe('Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name()
            assert.equal(name ,'Tether')
        })
    })

    describe('RWD Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name()
            assert.equal(name ,'Reward Token')
        })
    })

    describe('Decentral Bank Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name ,'Decentral Bank')
        })

        it('contract has tokens',async () => {
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })

    describe('Yield Farming', async () => {
        it('rewards tokens for staking', async () => {
            let result 

            //Check Investor Balance
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'),'Customer Tether Wallet Balance before stalking')
        

            // Check Staking For Customer of 100 tokens
            await tether.approve(decentralBank.address, tokens('100'), {from: customer})
            await decentralBank.depositTokens(tokens('100'), {from : customer})

            // check Updated Balance Of Customer
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'),'Customer Tether Wallet Balance After stalking')

            // Check updated balance of Decentral Bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result, tokens('100'),'Decentral Bank Balance should be 100')

            // Is Staking Balance
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'true', 'customer is staking status after staking')
    })

    })
    })
    
})