pragma solidity >=0.5.0 <0.9.0;
import './RWD.sol';
import './Tether.sol';


contract DecentralBank {
    address public owner;
    string public name = 'Decentral Bank';
    Tether public tether;
    RWD public rwd;

   address [] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd,Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // Staking function
    function depositTokens(uint _amount) public {
        require(_amount > 0,'Amount cannot be 0');

        // Transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update Staking Balance
        stakingBalance[msg.sender] += _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update Staking Balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    //unstake tokens
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];

        // Require the amount to be greater than zero
        require(balance > 0, "Staking balance can't be less than zero");

        // tranfer the tokens to the specified contract address from our bank
        tether.transfer(msg.sender, balance);

        // reset staking balance
        stakingBalance[msg.sender] = 0;
        // stakingBalance[address(this)] -= balance;

        //Update staking Status
        isStaking[msg.sender] = false;
    }

    //issue rewards
    function issueTokens() public {
        // require the owner to issue tokens only
        require(msg.sender == owner,'The Caller must be owner');
        for(uint i=0; i<stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient]/9;
            if(balance > 0) {
                rwd.transfer(recipient, balance);
            }
            
        }
    }
}