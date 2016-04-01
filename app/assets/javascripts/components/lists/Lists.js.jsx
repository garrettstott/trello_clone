class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.addList = this.addList.bind(this);
    this.baseUrl = `/boards/${this.props.id}/lists`;
    this.state = { lists: this.props.lists };
    this.deleteList = this.deleteList.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  updateList(id, list) {
    $.ajax({
      url: `/boards/${this.props.id}/lists/${id}`,
      type: 'PUT',
      data: { list: {...list}},
      dataType: 'JSON'
    }).success( list => {
      let lists = this.state.lists;
      let editedList = lists.find( l => l.id === list.id)
      editedList.name = list.name;
      this.setState({ lists: lists});
    });
  }

  deleteList(id) {
    $.ajax({
      url: `/boards/${this.props.id}/lists/${id}`,
      type: 'DELETE'
    }).success( list => {
      let lists = this.state.lists;
      let index = lists.findIndex( l => l.id === list.id);
      lists.splice(index, 1)
      this.setState({ lists: lists });
    });
  }

  addList(list) {
    this.setState({ lists: [list, ...this.state.lists] });
  }

  render() {
    let lists = this.state.lists.map( list => {
      return(<List key={`list-${list.id}`} {...list} updateList={this.updateList} deleteList={this.deleteList} />);
    });

      return(
        <div className="row">
          <NewList id={this.props.id} addList={this.addList} />
          <h2 className="center">Lists</h2>
          {lists}
        </div>
      );
  }
}