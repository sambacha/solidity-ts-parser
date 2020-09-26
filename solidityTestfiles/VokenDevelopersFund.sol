/**
 * Source Code first verified at https://etherscan.io on Thursday, April 18, 2019
 (UTC) */

pragma solidity ^0.5.7;

// Voken Developers Fund
// 
// More info:
//   https://vision.network
//   https://voken.io
//
// Contact us:
//   <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="d4a7a1a4a4bba6a094a2bda7bdbbbafabab1a0a3bba6bf">[email protected]</a>
//   <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="8bf8fefbfbe4f9ffcbfde4e0eee5a5e2e4">[email protected]</a>


/**
 * @title Ownable
 */
contract Ownable {
    address internal _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev The Ownable constructor sets the original `owner` of the contract
     * to the sender account.
     */
    constructor () internal {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @return the address of the owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0));
        _owner = newOwner;
        emit OwnershipTransferred(_owner, newOwner);
    }

    /**
     * @dev Rescue compatible ERC20 Token
     *
     * @param tokenAddr ERC20 The address of the ERC20 token contract
     * @param receiver The address of the receiver
     * @param amount uint256
     */
    function rescueTokens(address tokenAddr, address receiver, uint256 amount) external onlyOwner {
        IERC20 _token = IERC20(tokenAddr);
        require(receiver != address(0));
        uint256 balance = _token.balanceOf(address(this));

        require(balance >= amount);
        assert(_token.transfer(receiver, amount));
    }

    /**
     * @dev Withdraw Ether
     */
    function withdrawEther(address payable to, uint256 amount) external onlyOwner {
        require(to != address(0));

        uint256 balance = address(this).balance;

        require(balance >= amount);
        to.transfer(amount);
    }
}


/**
 * @title ERC20 interface
 * @dev see https://eips.ethereum.org/EIPS/eip-20
 */
interface IERC20{
    function balanceOf(address owner) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
}


/**
 * @title Voken Developers Fund
 */
contract VokenDevelopersFund is Ownable{
    IERC20 public Voken;

    event Donate(address indexed account, uint256 amount);

    /**
     * @dev constructor
     */
    constructor() public {
        Voken = IERC20(0x82070415FEe803f94Ce5617Be1878503e58F0a6a);
    }

    /**
     * @dev donate
     */
    function () external payable {
        emit Donate(msg.sender, msg.value);
    }

    /**
     * @dev transfer Voken
     */
    function transferVoken(address to, uint256 amount) external onlyOwner {
        assert(Voken.transfer(to, amount));
    }

    /**
     * @dev batch transfer
     */
    function batchTransfer(address[] memory accounts, uint256[] memory values) public onlyOwner {
        require(accounts.length == values.length);
        for (uint256 i = 0; i < accounts.length; i++) {
            assert(Voken.transfer(accounts[i], values[i]));
        }
    }
}