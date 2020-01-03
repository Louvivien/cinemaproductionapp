pragma solidity ^0.5.12;

contract Production {

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

    // Store accounts that have been added
    mapping(address => bool) public listProducers;
    // Store Producers
    // Fetch Producers
    mapping(uint => Producer) public producers;
    // Store Producers Count
    uint public producersCount;

    // Store Mandats
    // Fetch Mandats
    mapping(uint => Mandat) public mandats;
    // Store Mandats Count
    uint public mandatsCount;

    //addedProducer event
    event addedProducerEvent (
        uint indexed producersCount
    );

    //addedMandat event
    event addedMandatEvent (
        uint indexed mandatsCount
    );



    constructor () public {
        //addProducer("Steven Spielberg", 50);
        //addProducer("Producteur 2", 50);
        //addMandat("Droits TV")
    }

    function addProducer (string memory _name, uint _producerShare) public {
        producersCount ++;
        producers[producersCount] = Producer(producersCount, _name, _producerShare);
        //trigger voted event
        emit addedProducerEvent(producersCount);

    }

    function addMandat (string memory _mandatType) public {
        mandatsCount ++;
        mandats[mandatsCount] = Mandat(mandatsCount, _mandatType);
        //trigger voted event
        emit addedMandatEvent(mandatsCount);

    }



}