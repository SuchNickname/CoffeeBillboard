import './App.css';
import {variables} from './Connection.js';
import {React, Component} from 'react';
import {Item} from './components/Item.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export class App extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      coffeelist:[],
      coffeename:'',
      coffeeprice:'',
      photoFileName:'none',
      PhotoPath:variables.PHOTO_URL,
      editMode: false,
      deleteItem: false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.createCoffee = this.createCoffee.bind(this);
  }

  updateList(){
    
    fetch(variables.API_URL+'coffee').then(response=>response.json()).then(data => {
      this.setState({
        coffeelist:data,
        showModal: false
      });
    });
  }

  componentDidMount(){
    
    this.updateList();
  }

  handleShow(){
    this.setState({showModal:true});
  }
  handleClose(){
    this.setState({showModal:false});
  }

  createCoffee(){
    
    fetch(variables.API_URL+'coffee', {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        'coffeename':this.state.coffeename,
        'coffeeprice':this.state.coffeeprice,
        'imagefilename':this.state.photoFileName
      })
    }).then(response => {
      if(!response.ok){
        throw new Error('Something went wrong');
      }

      this.setState({showModal:false, coffeename: '', coffeeprice: 0});
      this.updateList();
      return response.json();
    }).catch(e=>console.log(e));
    
  }

  handleImageClick = (event) =>{
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("file", event.target.files[0], event.target.files[0].name);

    fetch(variables.API_URL+'coffee/savefile', {
      method:'POST',
      body:formData
    }).then(res=>res.json()).then(data => this.setState({photoFileName:data}))

  }

  onChangeValue(e){
    // console.log(e.target.id);
    fetch(variables.API_URL + 'coffee/' + e.target.id, {
      method:'DELETE',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    }).then(res => res.json()).then(() => this.updateList());

  }

  render(){
    const {coffeelist} = this.state;
    return(
      <div className="App">
      <button className='btn btn-primary' style={{position:'fixed', right:0, marginRight:'50px'}} onClick={() => this.setState({editMode:!this.state.editMode})}>Edit</button>
        <div className='banner'>
          <img src="./banner1.png" alt='banner'/>
        </div>
        
        <div className='addDiv'>
          {/* <i className="fa fa-plus fa-3x" type="button" aria-hidden="true" data-toggle='modal' data-target='#exampleModal'></i> */}
          {this.state.editMode ? <Button variant='primary' onClick={this.handleShow} style={{backgroundColor:'brown'}}>Add new coffee</Button> : ''}
        </div>
        

        <div className='items-grid'>
          
            {/* {coffeelist.map(a => <div className='item'>{a.coffeeName}</div>)} */}
            
            {coffeelist.map(a =>
            <Item coffeename={a.coffeeName} photourl={a.imageFileName} price={a.coffeePrice} key={a.rowid} coffeeid={a.rowid} editmode={this.state.editMode} onChangeValue={this.onChangeValue.bind(this)} />)
            }
              
            
              
            
            
            
        </div>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          
            <Modal.Header closeButton>
              <Modal.Title>Add new coffee flavour</Modal.Title>
            </Modal.Header>
            <Form>
            <Modal.Body>
              
                <Form.Group>
                  <Form.Label>Coffee name</Form.Label>
                  <Form.Control type='textarea' onChange={(e) => this.setState({coffeename:e.target.value})} value={this.state.coffeename} placeholder='Enter coffee name'/>

                  <Form.Label>Coffee price</Form.Label>
                  <Form.Control type='number' step=".01" onChange={(e) => this.setState({coffeeprice: e.target.value})} value={this.state.coffeeprice} placeholder='Enter price in EUR'/>

                  <Form.Label>Add picture</Form.Label>
                  <Form.Control type='file' onChange={this.handleImageClick.bind(this)}/>



                </Form.Group>
                
              
            </Modal.Body>

            <Modal.Footer>
              <Button variant='secondary' onClick={this.handleClose}>Close</Button>
              <Button variant='primary' onClick={this.createCoffee}>Save</Button>
            </Modal.Footer>
            </Form>
          

        </Modal>

        

      </div>

    );
  }

}

export default App;

