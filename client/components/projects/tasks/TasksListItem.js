import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { prettyDate } from '../../../utils/date';

export default class TasksListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      tempDescription: this.props.description,
      tempResponsibility: this.props.responsibility
    }
  }

  componentDidMount() { 
    document.addEventListener('keyup', this.onKeyPress);
    document.addEventListener('mousedown', this.onMouseDown);
  }
  
  componentWillUnmount() { 
    document.removeEventListener('keyup', this.onKeyPress);
    document.removeEventListener('mousedown', this.onMouseDown);
  }
  
  componentDidUpdate() {
    this.descriptionInput && this.descriptionInput.focus();
  }

  onCheckboxChanged = (e) => {
    const { onTaskToggled } = this.props;
    onTaskToggled(e.target.checked);
  }
  
  onDescriptionChange = (e) => {
    this.setState({ tempDescription: e.target.value });
  }
  
  onResponsibilityChange = (e) => {
    this.setState({ tempResponsibility: e.target.value });
  }
  
  onEditClicked = () => {
    this.setState({ edit: true, tempDescription: this.props.description, tempResponsibility: this.props.responsibility });
  }

  onDeleteClicked = () => {
    this.props.onDeleteClicked();
  }

  onDescriptionClicked = (e) => {
    this.props.onDescriptionClicked();
  }
  onResponsibilityClicked = (e) => {
    this.props.onDescriptionCllicked();
  }

  onKeyPress = (e) => {
    if(this.state.edit) {
      switch(e.which) {
        case 13: 
          this.setState({ edit: false });
          this.props.onDescriptionChanged(this.state.tempDescription);
          break;
        case 27:
          this.setState({ 
            edit: false, 
            tempDescription: this.props.description ,
            tempResponsibility: this.props.responsibility
          });
          break;
      }
    }
  }

  onMouseDown = (e) => {
    if(this.descriptionInput && !this.descriptionInput.contains(e.target))
      this.setState({ edit: false, tempDescription: this.props.name, tempResponsibility: this.props.name });
  }

  render() {
    const { edit, tempDescription, tempResponsibility } = this.state;
    const { description,responsibility, priority, progress, completed, comments } = this.props;

    const checked = completed ? 'checked' : '';
    const lastComment = comments.sort((lhs, rhs) => lhs.updatedAt > rhs.updatedAt)[comments.length - 1];

    const descriptionComponent = edit ?
      <input style={{paddingRight: 25}}ref={(input) => {this.descriptionInput = input}} type="text" className="form-control" value={tempDescription} onChange={this.onDescriptionChange}/> :
      <div>
        <span style={{marginRight: 5}} className="tasks-list badge badge-primary" onClick={this.onDescriptionClicked}>{priority}</span>        
        <input style={{paddingRight: 25}} className="task-checkbox" type="checkbox" onChange={this.onCheckboxChanged} checked={checked}/>
        <span style={{paddingRight: 25}} className="tasks-list-item badge badge-warning" onClick={this.onDescriptionClicked}>{progress} %</span>
        <span style={{paddingRight: 25}} className="tasks-list-item-description" onClick={this.onDescriptionClicked}>{description}</span>
        <span style={{paddingRight: 25}} className="tasks-list-item badge badge-info" onClick={this.onDescriptionClicked}> <i className="fa fa-user" aria-hidden="true"> @ </i>{responsibility}</span>
        
        
        { comments.length > 0 &&
          <span className="badge badge-secondary"><i className="fa fa-comment-o" aria-hidden="true"></i> {comments.length} Comments - {prettyDate(new Date(lastComment.updatedAt))}</span>
        }
        <button className="btn btn-sm btn-danger pull-right" style={{marginLeft: 5}} onClick={this.onDeleteClicked}>Delete</button>
        <button className="btn btn-sm btn-light pull-right" onClick={this.onEditClicked}>Edit</button>
      </div>

    return (
      <div className="task-row">
        {descriptionComponent}
      </div>
    )
  }
}

TasksListItem.propTypes = {
  description: PropTypes.string.isRequired,
  responsibility: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired,
  onTaskToggled: PropTypes.func.isRequired,
  onDescriptionChanged: PropTypes.func.isRequired,
  onResponsibilityChanged: PropTypes.func.isRequired,
  onDescriptionClicked: PropTypes.func,
  onDeleteClicked: PropTypes.func.isRequired
};

TasksListItem.defaultProps = {
  description: 'Task description',
  responsibility: 'default',
  priority: 'LOW',
  completed: false,
  comments: []
};