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
        producersCount: 0,
        producers: [],
        producerName: '', 
        producerShare: '',
        mandatsCount: 0,
        mandats: [],
        mandatType: '',
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
              // Load producers
              for (var i = 1; i <= mandatsCount; i++) {
                const mandat = await _contratProduction.methods.mandats(i).call()
                this.setState({
                  mandats: [...this.state.mandats, mandat]
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

        

  

  //premiere fonction add producer
  async addProd(producerName, producerShare) {
    this.setState({ loading: true })

    const {account, web3, contratProduction} = this.state
    const contract = new web3.eth.Contract(jsonProduction.abi, contratProduction)
     await contract.methods.addProducer(producerName, producerShare).send({from: account})
     this.setState({ loading: false })
     this.closeModal();
    };

     //deuxieme fonctionadd mandat
     async addMand(mandatType) {
      this.setState({ loading: true })
  
      const {account, web3, contratProduction} = this.state
      const contract = new web3.eth.Contract(jsonProduction.abi, contratProduction)
       await contract.methods.addMandat(mandatType).send({from: account})
       this.setState({ loading: false })
       this.closeModal2();
      };


  render() {
    const { producerName, producerShare, mandatType } = this.state
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
    
    
 <p>Mauris porta odio augue. Nam turpis dui, volutpat id feugiat vitae, sagittis a justo. Nam iaculis aliquet erat non varius. Suspendisse justo arcu, tincidunt sed auctor sit amet, fermentum id turpis. Suspendisse sed enim quis lorem vestibulum fermentum a ut nulla.</p>
  <p>Nullam tincidunt elit quis nibh blandit interdum. Duis ullamcorper pellentesque pretium. Nulla facilisi. Morbi semper nisi et justo varius non fermentum metus ornare. Proin vehicula, mi vel volutpat accumsan, libero lacus euismod massa, id feugiat velit enim nec ligula. Aliquam ipsum est, volutpat aliquam tincidunt id, sagittis et velit. Nunc vitae massa vel dui facilisis consectetur vel id sem.</p>


  <p>Aenean pulvinar, lacus ultrices euismod viverra, nulla diam interdum ligula, id mollis mi erat quis lectus. Morbi quis felis ut turpis condimentum dictum porttitor id mauris. Nam non tincidunt mauris. Donec viverra eleifend pharetra. Nulla eu ipsum et elit consectetur rutrum. Integer lorem purus, ultricies ac laoreet quis, feugiat vel dolor. Donec eu turpis neque. Nullam molestie sapien eu nibh semper sed convallis est pretium.</p>

</div>



      </div>
    );
  }
}
export default App;
