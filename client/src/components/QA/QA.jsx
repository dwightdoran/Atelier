import React from 'react';
import $ from 'jquery';

import SearchQuestion from './components/SearchQuestion.jsx';
import Questions from './components/Questions.jsx';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      searchText: ''
    };
  }

  searchHandler (e) {
    e.preventDefault();

    // update state with search text
    let text = e.target.value;
    this.setState({
      questions: this.state.questions,
      //questions to be changed, should update on text change
      searchText: text
    })
  }

  componentDidMount() {
    $.ajax({
      url: '/qa/questions/'.concat(this.props.itemid),
      method: 'GET',
      success: (data) => {
        // console.log('Server GET Success ', data);
        this.setState({
          questions: data.results,
          searchText: this.state.searchText
        })
      }
    })
  }

  render() {
    return (
      <div>
        <h4>Questions and Answers</h4>
        <SearchQuestion searchHandler={this.searchHandler.bind(this)}/>
        <Questions questions={this.state.questions} />
      </div>
    )
  }
}

export default QA;