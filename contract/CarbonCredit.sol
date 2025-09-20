pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CarbonCredit is ERC20 {
    struct UserInfo {
        string email;
        bytes32 passwordHash; // Store hashed password
        bool isWorker;
    }
    struct Contribution {
        address user;
        string imageUrl;
        string location;
        uint256 workerId;
        bool approved;
        bool disapproved;
    }
    mapping(address => UserInfo) public users;
    mapping(uint256 => Contribution) public contributions;
    uint256 public nextContributionId;
    address public admin; // Contract deployer

    event UserRegistered(address user, string email, bool isWorker);
    event ContributionSubmitted(uint256 id, address user, string imageUrl, string location, uint256 workerId);
    event ContributionApproved(uint256 id, address user);
    event ContributionDisapproved(uint256 id, address user);

    constructor() ERC20("CarbonSHM", "CSHM") {  // Themed for Shardeum/SHM
        admin = msg.sender;
    }

    modifier onlyWorker() {
        require(users[msg.sender].isWorker, "Not a worker");
        _;
    }

    function registerUser(string memory email, bytes32 passwordHash, bool isWorker) external {
        require(bytes(users[msg.sender].email).length == 0, "User already registered");
        users[msg.sender] = UserInfo(email, passwordHash, isWorker);
        emit UserRegistered(msg.sender, email, isWorker);
    }

    function submitContribution(string memory imageUrl, string memory location, uint256 workerId) external {
        contributions[nextContributionId] = Contribution(msg.sender, imageUrl, location, workerId, false, false);
        emit ContributionSubmitted(nextContributionId++, msg.sender, imageUrl, location, workerId);
    }

    function approveContribution(uint256 contributionId) external onlyWorker {
        Contribution storage contrib = contributions[contributionId];
        require(!contrib.approved && !contrib.disapproved, "Contribution already processed");
        contrib.approved = true;
        _mint(contrib.user, 10 * 10**decimals()); // Mint 10 CSHM credits
        emit ContributionApproved(contributionId, contrib.user);
    }

    function disapproveContribution(uint256 contributionId) external onlyWorker {
        Contribution storage contrib = contributions[contributionId];
        require(!contrib.approved && !contrib.disapproved, "Contribution already processed");
        contrib.disapproved = true;
        emit ContributionDisapproved(contributionId, contrib.user);
    }

    function getContributionsByUser(address user) external view returns (Contribution[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < nextContributionId; i++) {
            if (contributions[i].user == user) count++;
        }
        Contribution[] memory userContributions = new Contribution[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextContributionId; i++) {
            if (contributions[i].user == user) {
                userContributions[index++] = contributions[i];
            }
        }
        return userContributions;
    }
}