pragma solidity ^0.5.12;

contract Production {

string public name;
bool public oneHasSigned = false;



    // Model a Producer
    struct Producer {
        uint id;
        string name;
        uint producerShare;
        address producerAddress;
    }

    // Model a Mandat
    struct Mandat {
        uint id;
        string mandatType;
    }


    // Model a Revenue
    struct Revenue {
        uint id;
        uint revenueAmount;
        uint revenueTimestamp;
    }

    // Model an Article
    struct Article {
        uint id;
        string articleTitle;
        string articleContent;
    }

    // Model a Signature
    struct Signature {
        uint id;
        address owner;
    }



    // Store accounts that have been added
    mapping(address => bool) public listProducers;
    // Store Producers
    // Fetch Producers
    mapping(uint => Producer) public producers;
    // Store Producers Count
    uint public producersCount;
    //addedProducer event
    event addedProducerEvent (
        uint id,
        string name,
        uint producerShare,
        address owner
    );

    // Store Mandats
    // Fetch Mandats
    mapping(uint => Mandat) public mandats;
    // Store Mandats Count
    uint public mandatsCount;
    //addedMandat event
    event addedMandatEvent (
        uint indexed mandatsCount
    );

    // Store Revenues
    // Fetch Revenues
    mapping(uint => Revenue) public revenues;
    // store Revenues Total
    uint public revenuesTotal = 0;
    uint public newRevenuesTotal;
    // Store Revenues Count
    uint public revenuesCount = 0;
    //addedRevenue event
    event addedRevenueEvent (
        uint id,
        uint _revenueAmount,
        uint revenuesTotal,
        address owner, 
        uint revenueTimestamp
    );

    // Store Articles
    // Fetch Articles
    mapping(uint => Article) public articles;
    // Store Article Count
    uint public articlesCount;
     //addedArticle event
    event addedArticleEvent (
        uint id,
        string articleName,
        string articleContent

    );
    

    // Store accounts that have signed
    mapping(address => bool) public listSignatures;
    // Store Signatures
    // Fetch Signatures
    mapping(uint => Signature) public signatures;
    // Store Signatures Count
    uint public signaturesCount;
    //addedSignature event
    event addedSignatureEvent (
        uint id,
        address owner
    );


    constructor () public {
        name = "Dapp Production";

        //addProducer("Steven Spielberg", 50);
        //addProducer("Producteur 2", 50);
        //addMandat("Droits TV")
        //addRevenue("5000")
    }

    function addProducer (string memory _name, uint _producerShare) public {
          // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid producerShare
        require(_producerShare > 0);
        producersCount ++;
        producers[producersCount] = Producer(producersCount, _name, _producerShare, msg.sender);
        listProducers[msg.sender] = true;
        //trigger added producer event
        emit addedProducerEvent(producersCount, _name, _producerShare, msg.sender);


    }

    function getProducer(uint producerID) public view
    returns (uint, string memory, uint, address) {

        Producer storage producer = producers[producerID];
        return (producer.id, producer.name, producer.producerShare, producer.producerAddress);
    }


    function addMandat (string memory _mandatType) public {
        mandatsCount ++;
        mandats[mandatsCount] = Mandat(mandatsCount, _mandatType);
        //trigger added mandat event
        emit addedMandatEvent(mandatsCount);

    }

    function addRevenue (uint _revenueAmount) public {
        // Require a valid _revenueAmount
        require(_revenueAmount > 0);
        revenuesCount ++;
        newRevenuesTotal = revenuesTotal + _revenueAmount;
        revenuesTotal = newRevenuesTotal;
        revenues[revenuesCount] = Revenue(revenuesCount, _revenueAmount, block.timestamp);
        //trigger added revenue event
        emit addedRevenueEvent(revenuesCount, _revenueAmount, revenuesTotal, msg.sender, block.timestamp);

    }

    function addArticle (string memory articleTitle, string memory articleContent) public {
        articlesCount ++;
        articles[articlesCount] = Article(articlesCount, articleTitle, articleContent);
        //trigger added article event
        emit addedArticleEvent(articlesCount, articleTitle, articleContent);

    }

    //Fonction qui vérifie qu'un utilisateur est un producteur
    function isProducer() public view returns(bool) {
        if (listProducers[msg.sender] == true) {
        return true;
        } else {
            return false;
        }
    }

    
    
    //Fonction qui vérifie qu'un utilisateur a signe
    function hasSigned(address user) public view returns(bool) {
        if (listSignatures[user] == true) {
        return true;
        } else {
            return false;
        }
    }


     function sign () public {
        require(listProducers[msg.sender] = true);
        signaturesCount ++;
        oneHasSigned = true;
        signatures[signaturesCount] = Signature(signaturesCount, msg.sender);
        listSignatures[msg.sender] = true;
        
        //trigger added article event
        emit addedSignatureEvent(signaturesCount, msg.sender);

     }
}