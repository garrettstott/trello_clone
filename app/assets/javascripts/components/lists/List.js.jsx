class List extends React.Component {
  constructor(props){
    super(props);
    this.state = { cards: [], edit: false };
    this.addCard = this.addCard.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateList = this.updateList.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/cards',
      type: 'GET',
      data: { list_id: this.props.id },
      dataType: 'JSON'
    }).success( cards => {
      this.setState({ cards: cards });
    }).error( cards => {
      console.log(cards)
    });
  }

  deleteList() {
    this.props.deleteList(this.props.id);
  }

  updateList() {
    let list = { name: this.refs.name.value }
    this.toggleEdit();
    this.props.updateList(this.props.id, list);
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  addCard(e) {
   e.preventDefault();
   let name = this.refs.name;
   let description = this.refs.description;
   $.ajax({
     url: "/cards",
     type: "POST",
     data: { list_id: this.props.id, card: { name: name.value, description: description.value }}
   }).success( card => {
     let cards = this.state.cards;
     cards.unshift(card);
     this.setState({ cards: cards });
   }).complete( () => {
     name.value = null;
     description.value = null;
   });
 }

 show() {
   let cards = this.state.cards.map( card => {
   return(
     <li key={`card-${card.id}`} className="collection-item">
       <div>{card.name}
         <div className="secondary-content">{card.description}</div>
       </div>
     </li>
     );
  });
 
  return(
    <div className="card col s12 m3">
      <form onSubmit={this.addCard}>
        <input placeholder="Card Name" ref="name" required={true} />
        <input placeholder="Card Description" ref="description" />
        <button className="btn" type="submit">Add Card</button>
     </form>
     <h5 className="center">{this.props.name}</h5>  
      <button onClick={this.toggleEdit} className="btn grey lighten-1">Edit List</button>
      <button onClick={this.deleteList} className="btn grey lighten-1">Delete List</button>
     <ul className="collection">
      { cards }
     </ul>
   </div>
  );
 }

 edit() {
  return(
    <div className="col s12 m4">
      <div className="card">
        <input placeholder={this.props.name}
                defaultValue={this.props.name}
                ref="name"
                required={true}
        />
        <div className="card-action">
          <button onClick={this.toggleEdit} className="btn blue">Cancel</button>
          <button onClick={this.updateList} className="btn">Save</button>
        </div>
      </div>
    </div>
  );
 }

 render() {
  if (this.state.edit)
    return this.edit();
  else
    return this.show();
 }
}