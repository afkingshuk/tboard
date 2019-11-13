import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Person extends Component {
  render() {
    const { image, primaryText, secondaryText } = this.props;

    return (
      <div className="card" onClick={this.props.onClick}>
        <div className="card">
          <img className="card-img" src={image}  style= {{width:50,height:50}} alt={image}/>   
          <h4 className="card-title">{primaryText}</h4>
          <h6 className="card-text">{secondaryText}</h6>

          {this.props.children}
        </div>
      </div>
    )
  }
}

Person.propTypes = {
  image: PropTypes.string,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  onClick: PropTypes.func
};