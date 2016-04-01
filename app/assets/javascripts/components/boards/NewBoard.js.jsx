class NewBoard extends React.Component {
  constructor(props) {
    super(props);
    this.addBoard = this.addBoard.bind(this);
  }

  addBoard(e) {
    e.preventDefault();
    let name = this.refs.name;
    let description = this.refs.description;
    $.ajax({
      url: '/boards',
      type: 'POST',
      data: { board: {name: name.value, description: description.value } },
      dataType: 'JSON',
    }).success( board => {
      this.props.addBoard(board);
    }).error( errors => {
      alert(errors)
    }).complete( () => {
      name.value = null;
      description.value = null;
    });
  }

  render() {
    return(
      <div className="row">
        <div className="col s12 m4">
          <h4>Add Board</h4>
          <form onSubmit={this.addBoard} >
            <input placeholder="Name" ref="name" required={true} />
            <input placeholder="Description" ref="description" />
            <button className="btn">Add</button>
          </form>
        </div>
      </div>
    );
  }
}