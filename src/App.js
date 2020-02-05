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
        visible3: false,
        visible4: false,
        visible5: false,
        producersCount: 0,
        producers: [],
        listProducers: [],
        producerName: '', 
        producerShare: '',
        producerAddress: '',
        haveSigned: [],
        signatures: [],
        signaturesCount: 0,
        mandatsCount: 0,
        mandats: [],
        mandatType: '',
        revenuesCount: 0,
        revenues: [],
        amountRevenues: '',
        articlesCount: 0,
        articles: [],
        articleTitle: '',
        articleContent: '',
        loading: true,
        text: '', inputText: '', mode:'nothing',
      }
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


            //on charge les infos signature
            const signaturesCount = await _contratProduction.methods.signaturesCount().call()
            this.setState({ signaturesCount })
            // Load signatures
            for (var i = 1; i <= signaturesCount; i++) {
              const signature = await _contratProduction.methods.signatures(i).call()
              this.setState({
                signatures: [...this.state.signatures, signature]
              })

            }

            //on charge les infos recette
            const revenuesCount = await _contratProduction.methods.revenuesCount().call()
            this.setState({ revenuesCount })
            // Load revenues
            for (var i = 1; i <= revenuesCount; i++) {
              const revenue = await _contratProduction.methods.revenues(i).call()
              this.setState({
                revenues: [...this.state.revenues, revenue]
              })
            }
            const revenuesTotal = await _contratProduction.methods.revenuesTotal().call()
            this.setState({ revenuesTotal })
 


            
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
            
            //on charge les infos article
            const articlesCount = await _contratProduction.methods.articlesCount().call()
            this.setState({ articlesCount })
            // Load articles
            for (var i = 1; i <= articlesCount; i++) {
              const article = await _contratProduction.methods.articles(i).call()
              this.setState({
                articles: [...this.state.articles, article]
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

      openModal4() {
        this.setState({
          visible4: true
        });
      }

      closeModal4() {
        this.setState({
          visible4: false
        }); 
      }
  
  openModal5() {
    this.setState({
      visible5: true
    });
  }

  closeModal5() {
    this.setState({
      visible5: false
    });
  }

    //fonction pour les onglets revenues

    openCity(cityName) {
      var i;
      var x = document.getElementsByClassName("city");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      document.getElementById(cityName).style.display = "block";
      }



    //fonction pour imprimer le decompte

  
    printFunc() {
    var divToPrint = document.getElementById('printarea');
    var htmlToPrint = '' +
        '<style type="text/css">' +
        'table th, table td {' +
        'border:1px solid #000;' +
        'padding;0.5em;' +
        '}' +
        '</style>';
    htmlToPrint += divToPrint.outerHTML;
    var newWin = window.open("");
    newWin.document.write("<h3 align='center'>Liste des recettes</h3>");
    newWin.document.write(htmlToPrint);
    newWin.print();
    newWin.close();
    }



    //fonction pour convertir les dates unix des recettes

  toDate(Unixtimestamp) {
  var timestamp = Unixtimestamp,
    date = new Date(timestamp * 1000),
    datevalues = [
      date.getDate() + '/',
      date.getMonth() + 1 + '/',
      date.getFullYear(),   
      //date.getHours(),
      //date.getMinutes(),
      //date.getSeconds(),
    ];
    return (datevalues); 
  }


  //fonction qui check si l'utilisateur est producteur
  async isProducer() {
    const { web3, contratReputation} = this.state
    const contract = new web3.eth.Contract(jsonProduction.abi, contratReputation)
    const prod = await contract.methods.isProducer().call()
    if (prod === true ) {
      this.setState({
        prod: true
      })
    } else {
      this.setState({
        prod: false
      })
    }
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

      //troisieme fonction du contrat pour ajouter une recette
     async addRev(amountRevenue) {
      this.setState({ loading: true })
  
      const {account, web3, contratProduction} = this.state
      const contract = new web3.eth.Contract(jsonProduction.abi, contratProduction)
       await contract.methods.addRevenue(amountRevenue).send({from: account})
       this.setState({ loading: false })
       this.closeModal3();
      };

       //quatrieme fonction du contrat pour ajouter un article
  async addArt(articleTitle, articleContent) {
      this.setState({ loading: true })
  
      const {account, web3, contratProduction} = this.state
      const contract = new web3.eth.Contract(jsonProduction.abi, contratProduction)
    await contract.methods.addArticle(articleTitle, articleContent).send({from: account})
       this.setState({ loading: false })
       this.closeModal4();
  };
  
  //quatrieme fonction du contrat pour ajouter une signature
  async sign() {
    this.setState({ loading: true })

    const { account, web3, contratProduction } = this.state
    const contract = new web3.eth.Contract(jsonProduction.abi, contratProduction)
    await contract.methods.sign().send({ from: account })
    this.setState({ loading: false })
    this.closeModal5();
  };


  render() {

    //definir ici chaque variables des formulaires
    const { producerName, producerShare, mandatType, prod, amountRevenue, revenuesTotal, articleTitle, articleContent } = this.state
    return (
      <div className="App">
        <div className="letter">
          <p className="h2">Contrat de production</p>
          <h3><small className="text-muted">Saisir et enregistrer dans la blockchain le contrat et les recettes du film</small>
</h3>
<br></br>

<div className="progress-bg">
    	<div className="progress-bar">
              <h3 className="raised">{revenuesTotal}€
&nbsp;recettes </h3>
        </div>
        	
        	<h3 className="goal">Budget: 100000€</h3>
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
       <div>  {/*--on peut modifier le contrat seulement si personne n'a encore signe*/}
            {(() => {
              if (this.state.signaturesCount == 0) {
                return (
                  <div>

                  <Button variant="outline-primary" size="sm" value="Open" onClick={() => this.openModal()} >Ajouter un coproducteur</Button>

                </div>
                )
              } else {
                return (
                  <div>

        
                  </div>
                )
              }
            })()}
    </div> {/*--fin condition affichage signature*/}

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
                  <div>  {/*--on peut modifier le contrat seulement si personne n'a encore signe*/}
                    {(() => {
                      if (this.state.signaturesCount == 0) {
                        return (
                          <div>

                            <Button variant="outline-primary" size="sm" value="Open" onClick={() => this.openModal2()} >Ajouter un mandat</Button>

                          </div>
                        )
                      } else {
                        return (
                          <div>


                          </div>
                        )
                      }
                    })()}
                  </div> {/*--fin condition affichage signature*/}

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
                        Veuillez saisir la recette (montant en euros)
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
{/* --Accordion revenues */}

 <Accordion>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      Décompte des recettes
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
      
       {/*--Tab bar revenues */}     

       <div className="w3-bar w3-black">
          <button className="w3-bar-item w3-button" onClick={() => this.openCity('London')}>Historique</button>
          
          <button className="w3-bar-item w3-button" onClick={() => this.openCity('Paris')}>Répartition</button>
          </div>     

                  <br></br>
                  <br></br>
                  
        {/*--First tab revenues */}
      
        <div id="London" className="w3-container city">
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
                  <div>
                    <div id="printarea">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Montant</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.revenues.map((revenue, key) => {
                            return (
                              <tr key={key}>
                                <th scope="row">{revenue.id.toString()}</th>
                                <td>{this. toDate(revenue.revenueTimestamp)}</td>
                                <td>{revenue.revenueAmount}€</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <Button variant="secondary" size="sm"        onClick={() => this.printFunc()}
                    >
                      Imprimer
                    </Button>
                  </div>
                );
              }
            })()}
    </div>

                  {/*--Second tab revenues */}

                  <div id="Paris" className="w3-container city" style={{ display: 'none' }}>
                    <p>Le nombre total des recettes est de :</p>
                    <p>{revenuesTotal} €</p>
                      

                  <div>
                    {(() => {
                      if (this.state.producersCount == 0) {
                        return (
                          <div><table className="table">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Montant</th>
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
                                <th scope="col">Montant</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.producers.map((producer, key) => {
                                return (
                                  <tr key={key}>
                                    <th scope="row">{producer.id.toString()}</th>
                                    <td>{producer.name}</td>
                                    <td>{producer.producerShare / 100 * revenuesTotal}€</td>
                                  </tr>
                                )
                              })}

                            </tbody>
                          </table></div>
                        )
                      }
                    })()}
                  </div>
                  </div> {/*--fin Second tab revenues */}
             

      <br></br>
      <br></br>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  </Accordion>


          <br></br>
          <br></br>      

          <div>  {/*--on peut modifier le contrat seulement si personne n'a encore signe*/}
            {(() => {
              if (this.state.signaturesCount == 0) {
                return (
                  <div>

                    <Button variant="outline-secondary" size="sm" value="Open" onClick={() => this.openModal4()} block>
                      Ajouter un article au contrat
                  </Button>

                  </div>
                )
              } else {
                return (
                  <div>


                  </div>
                )
              }
            })()}
          </div> {/*--fin condition affichage signature*/}


          <Modal visible={this.state.visible4} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal4()}>
            <Card>
              <Card.Header as="h5">Ajouter un article au contrat</Card.Header>
              <Card.Body>
                <Card.Title>Ajouter un article</Card.Title>
                <Card.Text>
                  Veuillez saisir l'intitulé de l'article
                        </Card.Text>


                <br></br>

                <Form>
                  <Form.Control type="text" size="sm" id="articleTitle" placeholder="Titre de l'article" onChange={adresse => this.setState({ articleTitle: adresse.target.value })} />{' '}
                  <br></br>
                  <Form.Control as="textarea" rows="3" size="sm" id="articleContent" placeholder="Contenu de l'article"  onChange={adresse => this.setState({ articleContent: adresse.target.value })} />
                  <br></br>

                  <br></br>

                  <Button variant="secondary" size="sm" onClick={() => this.closeModal4()}>Annuler</Button>{' '}
                  <Button variant="outline-danger" size="sm" onClick={() => this.addArt(articleTitle, articleContent)} >Enregistrer dans la blockchain</Button>
                </Form>
              </Card.Body>
            </Card>
          </Modal>
          

  <br></br>
 <br></br>

          <div>
            {(() => {
              if (this.state.articlesCount == 0) {
                return (
                  <div>il n'y a pas d'article pour l'instant</div>
                )
              } else {
                
                return (
                  <div>
                    
                    
                   
                    
                      {this.state.articles.map((article, key) => {
                        return (
                          <div key={key}>
                            <Accordion>
                              <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">Article{" "} 
                              {article.id.toString()}.
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>


                                    
                                    <p>{article.articleTitle}</p>
                                    <p>{article.articleContent}</p>

                                    
                              </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            </Accordion>
                          </div>
                        )
                      })}

                    
                  </div>
                )
              }
            })()}
          </div>
          


          <br></br>
          <br></br>

         
          <div>  {/*--on peut modifier le contrat seulement si personne n'a encore signe*/}
            {/*--condition a modifier : seulement si on ne l'a pas deja fait et que l'on est un producteur*/}
            {(() => {
              if (this.state.signaturesCount == 0) {
                return (
                  <div>

                    <Button variant="outline-danger" size="sm" onClick={() => this.openModal5()} >Signer le contrat</Button>

                  </div>
                )
              } else {
                return (
                  <div>


                  </div>
                )
              }
            })()}
          </div> {/*--fin condition affichage signature*/}
          
          <Modal visible={this.state.visible5} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal5()}>
            <Card>
              <Card.Header as="h5">Signer le contrat</Card.Header>
              <Card.Body>
                <Card.Title>Vous êtes sur le point de signer le contrat </Card.Title>
                
                  <div className="alert alert-warning">
                    <strong>Attention !</strong> une fois le contrat signé, il n'est plus possible d'ajouter des éléments du contrat à l'exception des recettes.
                    </div>
                <Card.Text>
                        </Card.Text>


                <br></br>

                <br></br>

                <Button variant="secondary" size="sm" onClick={() => this.closeModal5()}>Annuler</Button>{' '}
                <Button variant="outline-danger" size="sm" onClick={() => this.sign()} >Signer le contrat</Button>

              </Card.Body>
            </Card>
          </Modal>

          <br></br>

          <br></br>



             
 <p>Les informations inscrites dans ce contrat sont enregistrées cryptographiquement dans la blockchain. Selon la configuration, elle peuvent être enregistrées dans une blockchain publique comme le réseau mainet Ethereum, sur un réseau public non perpétuel comme le réseau Ethereum testnet Rinkeby, sur un réseau privé hébergé en propre ou sur un réseau Ethereum privé hébergé par un service cloud comme Amazon Web Services ou Microsoft Azure.</p>




  

</div>



      </div>
    );
  }
}
export default App;
