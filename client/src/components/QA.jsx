import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      searchText: ''
    };
  }

  componentDidMount() {
    $.ajax({
      url: '/qa/questions',
      method: 'GET',
      success: (data) => {
        console.log('Server GET Success ', data);
      }
    })
  }

  render() {
    return (
      <div>
        Put your components here
      </div>
    )
  }
}

export default QA;
