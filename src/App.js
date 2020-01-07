import React, { Component } from "react";
import jsonProduction from "./contracts/Production.json";
import Web3 from 'web3';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-awesome-modal';



import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";



class App extends Component {
    
  constructor(props) {
      super(props);
      this.state = {
        Web3: null,
        account: '',
        contratProduction: '',
        visible : false,
        visible2 : false,
        visible3 : false,
        producersCount: 0,
        producers: [],
        producerName: '', 
        producerShare: '',
        mandatsCount: 0,
        mandats: [],
        mandatType: '',
        revenuesCount: 0,
        revenues: [],
        amountRevenues: '',
        loading: true,
        text: '', inputText: '', mode:'nothing',
      }
      //this.addProd = this.addProd.bind(this),
  }
 
        async componentWillMount() { 
          await this.loadWeb3() 
          await this.loadBlockchainData() 
        }

        async loadWeb3() {
          if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
          }
          else if (window.ethereum) {
            window.web3= new Web3(window.web3.currentProvider)
          }
          else {
            window.alert('non-ethereum browser detected. you should consider trying metamask!')
          }
        }

        async loadBlockchainData() {
          const web3 = window.web3
          // Load account
          const accounts = await web3.eth.getAccounts()
          this.setState({
          account: accounts[0],
          web3: web3
          })
          const networkId = await web3.eth.net.getId()
          this.setState({
            networkId: networkId
          })
          const networkData = jsonProduction.networks[networkId]
          if(networkData) {
          const _contratProduction = new web3.eth.Contract(jsonProduction.abi, networkData.address)
          this.setState({
            contratProduction : _contratProduction._address,
          })
          //on charge les infos producer
          const producersCount = await _contratProduction.methods.producersCount().call()
          this.setState({ producersCount })
              // Load producers
              for (var i = 1; i <= producersCount; i++) {
                const producer = await _contratProduction.methods.producers(i).call()
                this.setState({
                  producers: [...this.state.producers, producer]
                })
              }
          //on charge les infos mandat
          const mandatsCount = await _contratProduction.methods.mandatsCount().call()
          this.setState({ mandatsCount })
              // Load mandats
              for (var i = 1; i <= mandatsCount; i++) {
                const mandat = await _contratProduction.methods.mandats(i).call()
                this.setState({
                  mandats: [...this.state.mandats, mandat]
                })
              
              }

              //on charge les infos revenue
          const revenuesCount = await _contratProduction.methods.revenuesCount().call()
          this.setState({ revenuesCount })
              // Load revenues
              for (var i = 1; i <= revenuesCount; i++) {
                const revenue = await _contratProduction.methods.revenues(i).call()
                this.setState({
                  revenues: [...this.state.revenues, revenue]
                })
                }


          this.setState({ loading: false})
          } else {
          window.alert('Contract not deployed to detected network.')
          }
          }

          

  //fonctions pour les modals

        openModal() {
            this.setState({
                visible : true
            });
        }

        closeModal() {
            this.setState({
                visible : false
            });
        }

        openModal2() {
          this.setState({
              visible2 : true
          });
      }

      closeModal2() {
          this.setState({
              visible2 : false
          });
      }

      openModal3() {
        this.setState({
            visible3 : true
        });
    }

    closeModal3() {
        this.setState({
            visible3 : false
        });
    }

        

  

  //premiere fonction du contrat add producer
  async addProd(producerName, producerShare) {
    this.setState({ loading: true })

    const {account, web3, contratProduction} = this.state
    const contract = new web3.eth.Contract(jsonProduction.abi, contratProduction)
     await contract.methods.addProducer(producerName, producerShare).send({from: account})
     this.setState({ loading: false })
     this.closeModal();
    };

     //deuxieme fonction du contrat add mandat
     async addMand(mandatType) {
      this.setState({ loading: true })
  
      const {account, web3, contratProduction} = this.state
      const contract = new web3.eth.Contract(jsonProduction.abi, contratProduction)
       await contract.methods.addMandat(mandatType).send({from: account})
       this.setState({ loading: false })
       this.closeModal2();
      };

      //troisieme fonction du contrat
     async addRev(amountRevenue) {
      this.setState({ loading: true })
  
      const {account, web3, contratProduction} = this.state
      const contract = new web3.eth.Contract(jsonProduction.abi, contratProduction)
       await contract.methods.addRevenue(amountRevenue).send({from: account})
       this.setState({ loading: false })
       this.closeModal3();
      };


  render() {
    //definir ici chaque variables des formulaires
    const { producerName, producerShare, mandatType, amountRevenue } = this.state
    return (
      <div className="App">
         
         <div class="letter">
         <p class="h2">Contrat de production</p>
         <h3><small class="text-muted">Saisir et enregistrer dans la blockchain le contrat</small>
</h3>
<br></br>

<div class="progress-bg">
    	<div class="progress-bar">
        	<h3 class="raised">5000€
&nbsp;recettes </h3>
        </div>
        	
        	<h3 class="goal">Budget: 100000€</h3>
    </div>

<br></br>



  <p>Veuillez saisir les informations du contrat</p>
  {/* 
  --Accordion by React bootstrap https://react-bootstrap.github.io/getting-started/introduction
  
  */}
  

  
  <Accordion>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      Co-producteurs
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
      <div>
            {(() => {
              if (this.state.producersCount == 0) {
                return (
                  <div><table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Part producteur</th>
                    </tr>
                  </thead>
                
                </table>il n'y a pas de producteur pour l'instant</div>
                )
              } else {
                return (
                  <div><table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Part producteur</th>
                    </tr>
                  </thead>
                  <tbody>
                      { this.state.producers.map((producer, key) => {
                            return(
                              <tr key={key}>
                                <th scope="row">{producer.id.toString()}</th>
                                <td>{producer.name}</td>
                                <td>{producer.producerShare}%</td>
                                </tr>
                            )
                          })}
        
                  </tbody>
                </table></div>
                )
              }
            })()}
    </div>
             

      <br></br>
      <br></br>
      <Button variant="outline-primary" size="sm" value="Open" onClick={() => this.openModal()} >Ajouter un coproducteur</Button>

      <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
              <Card>
                    <Card.Header as="h5">Ajouter au contrat</Card.Header>
                    <Card.Body>
                      <Card.Title>Ajouter un coproducteur</Card.Title>
                      <Card.Text>
                        Veuillez saisir le nom du coproducteur et le pourcentage de ses parts dans le projet
                        </Card.Text>
                        <br></br>

                      <Form>
                        <Form.Control type="text" size="sm" id="producerName" placeholder="Nom" onChange={adresse => this.setState({producerName: adresse.target.value})} />{' '}
                        <br></br>
                        <Form.Control type="number" size="sm" id="producerShare" min="1" max="99" placeholder="Part Producteur"  onChange={adresse => this.setState({producerShare: adresse.target.value})} />
                      <br></br>

                      <Button variant="secondary" size="sm" onClick={() => this.closeModal()}>Annuler</Button>{' '}
                      <Button variant="outline-danger" size="sm" onClick={() => this.addProd(producerName, producerShare)} >Enregistrer dans la blockchain</Button>
                      </Form>
                    </Card.Body>
              </Card>
                </Modal>
      </Card.Body>
    </Accordion.Collapse>
  </Card>

{/* 
  --Accordion mandats
  
  */}

  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1">
      Mandats
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
        <div>
            {(() => {
              if (this.state.mandatsCount == 0) {
                return (
                  <div><table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Type de mandat</th>

                    </tr>
                  </thead>
                
                </table>il n'y a pas de mandat pour l'instant</div>
                )
              } else {
                return (
                  <div><table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Type de mandat</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                      { this.state.mandats.map((mandat, key) => {
                            return(
                              <tr key={key}>
                                <th scope="row">{mandat.id.toString()}</th>
                                <td>{mandat.mandatType}</td>
                                
                                </tr>
                            )
                          })}
        
                  </tbody>
                </table></div>
                )
              }
            })()}
    </div>
             

      <br></br>
      <br></br>
      <Button variant="outline-primary" size="sm" value="Open" onClick={() => this.openModal2()} >Ajouter un mandat</Button>

      <Modal visible={this.state.visible2} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal2()}>
              <Card>
                    <Card.Header as="h5">Ajouter au contrat</Card.Header>
                    <Card.Body>
                      <Card.Title>Ajouter un mandat</Card.Title>
                      <Card.Text>
                        Veuillez saisir le type de mandat
                        </Card.Text>
                        
      
      <br></br>

                      <Form>
                        <Form.Control type="text" size="sm" id="mandatType" placeholder="Type de mandat" onChange={adresse => this.setState({mandatType: adresse.target.value})} />{' '}
                        <br></br>
                        
                      <br></br>

                      <Button variant="secondary" size="sm" onClick={() => this.closeModal2()}>Annuler</Button>{' '}
                      <Button variant="outline-danger" size="sm" onClick={() => this.addMand(mandatType)} >Enregistrer dans la blockchain</Button>
                      </Form>
                    </Card.Body>
              </Card>
                </Modal>

      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>


  
<br></br>
 <br></br>



 <div>
  <Button id="dollars" variant="primary" size="sm"  value="Open" onClick={() => this.openModal3()}  block>
    Ajouter une recette
  </Button>
  <Modal visible={this.state.visible3} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal3()}>
              <Card>
                    <Card.Header as="h5">Ajouter au contrat</Card.Header>
                    <Card.Body>
                      <Card.Title>Ajouter une recette</Card.Title>
                      <Card.Text>
                        Veuillez saisir la recette
                        </Card.Text>
                        
      
      <br></br>

                      <Form>
                        <Form.Control type="number" size="sm" id="amountRevenue" placeholder="Montant de la recette en euros" onChange={adresse => this.setState({amountRevenue: adresse.target.value})} />{' '}
                        <br></br>
                        
                      <br></br>

                      <Button variant="secondary" size="sm" onClick={() => this.closeModal3()}>Annuler</Button>{' '}
                      <Button variant="outline-danger" size="sm" onClick={() => this.addRev(amountRevenue)} >Enregistrer dans la blockchain</Button>
                      </Form>
                    </Card.Body>
              </Card>
                </Modal>


</div>
      
<br></br>
{/* 
  --Accordion revenues
  
  */}

 <Accordion>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      Décompte des recettes
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
      <div>
            {(() => {
              if (this.state.revenuesCount === 0) {
                return (
                  <div><table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Montant</th>
                    </tr>
                  </thead>
                
                </table>il n'y a pas de recette pour l’instant</div>
                )
              } else {
                return (
                  <div><table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                      { this.state.revenues.map((revenue, key) => {
                            return(
                              <tr key={key}>
                                <th scope="row">{revenue.id.toString()}</th>
                                <td>{revenue.revenueAmount}€
</td>
                                </tr>
                            )
                          })}
        
                  </tbody>
                </table></div>
                )
              }
            })()}
    </div>
             

      <br></br>
      <br></br>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  </Accordion>

  <br></br>
 <br></br>
   
 <p>Les informations inscrites dans ce contrat sont enregistrées cryptographiquement dans la blockchain. Selon la configuration, elle peuvent être enregistrées dans une blockchain publique comme le réseau mainet Ethereum, sur un réseau public non perpétuel comme le réseau Ethereum testnet Rinkeby, sur un réseau privé hébergé en propre ou sur un réseau Ethereum privé hébergé par un service cloud comme Amazon Web Services ou Microsoft Azure.</p>

  <p>Nullam tincidunt elit quis nibh blandit interdum. Duis ullamcorper pellentesque pretium. Nulla facilisi. Morbi semper nisi et justo varius non fermentum metus ornare. Proin vehicula, mi vel volutpat accumsan, libero lacus euismod massa, id feugiat velit enim nec ligula. Aliquam ipsum est, volutpat aliquam tincidunt id, sagittis et velit. Nunc vitae massa vel dui facilisis consectetur vel id sem.</p>


  <p>Aenean pulvinar, lacus ultrices euismod viverra, nulla diam interdum ligula, id mollis mi erat quis lectus. Morbi quis felis ut turpis condimentum dictum porttitor id mauris. Nam non tincidunt mauris. Donec viverra eleifend pharetra. Nulla eu ipsum et elit consectetur rutrum. Integer lorem purus, ultricies ac laoreet quis, feugiat vel dolor. Donec eu turpis neque. Nullam molestie sapien eu nibh semper sed convallis est pretium.</p>

</div>



      </div>
    );
  }
}
export default App;
