class NewList extends React.Component {
  constructor(props) {
    super(props);
    this.addList = this.addList.bind(this);
  }

  addList(e) {
    let name = this.refs.name;
    e.preventDefault();
    $.ajax({
      url: `/boards/${this.props.id}/lists`,
      type: 'POST',
      data: { list: { name: name.value }},
      dataType: 'JSON'
    }).success( list => {
      this.props.addList(list);
    }).error( errors => {
      alert(errors);
    }).complete( () => {
      name.value = null;
    });
  }

  render() {
    return(
      <div className="row">
      <div className="col s12 m4">
        <h4>Add List</h4>
        <form onSubmit={this.addList}>
          <input placeholder="List Name" ref="name" required={true} />
          <button className="btn">Add</button>
        </form>
      </div>
      </div>
    )
  }
}