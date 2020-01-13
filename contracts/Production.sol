pragma solidity ^0.5.12;

contract Production {

string public name;




    // Model a Producer
    struct Producer {
        uint id;
        string name;
        uint producerShare;
    }

    // Model a Mandat
    struct Mandat {
        uint id;
        string mandatType;
    }


    // Model a Revenue
    struct Revenue {
        uint id;
        string revenueAmount;
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
    // Store Revenues Count
    uint public revenuesCount;
    //addedRevenue event
    event addedRevenueEvent (
        uint indexed revenuesCount
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
        producers[producersCount] = Producer(producersCount, _name, _producerShare);
        //trigger voted event
        emit addedProducerEvent(producersCount, _name, _producerShare, msg.sender);


    }

    function getProducer(uint producerID) public view
    returns (uint, string memory, uint) {

        Producer storage producer = producers[producerID];
        return (producer.id, producer.name, producer.producerShare);
    }


    function addMandat (string memory _mandatType) public {
        mandatsCount ++;
        mandats[mandatsCount] = Mandat(mandatsCount, _mandatType);
        //trigger voted event
        emit addedMandatEvent(mandatsCount);

    }

    function addRevenue (string memory _revenueAmount) public {
        revenuesCount ++;
        revenues[revenuesCount] = Revenue(revenuesCount, _revenueAmount);
        //trigger voted event
        emit addedRevenueEvent(revenuesCount);

    }



}