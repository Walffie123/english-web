import React from 'react';
import HangMan from './HangMan';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { words } = this.props;
    let len = words.length;
    let selectedWord = words[0].word;
    let question = words[0].question;
    this.state = {
      words,
      len,
      selectedWord,
      question,
      score: 0,
    };
  }
  handleScoreChange = (newScore) => {
    this.setState({ score: newScore });
  }
  handleNext = () => {
    const currentIndex = this.state.words.findIndex(obj => obj.word === this.state.selectedWord);
    const nextIndex = (currentIndex + 1);
    this.setState({ selectedWord: this.state.words[nextIndex].word });
    this.setState({ question: this.state.words[nextIndex].question });
    this.setState(prevState => ({
      len: prevState.len - 1
    }));
  };
  handleReset = () => {
    this.setState({ score: 0 });
    this.setState({ selectedWord: this.state.words[0].word });
    this.setState({ question: this.state.words[0].question });
    this.setState({ len: this.state.words.length})
  };
  render() {
    return <HangMan words={this.state.words} selectedWord={this.state.selectedWord} len={this.state.len}
      question={this.state.question} score={this.state.score} onScoreChange={this.handleScoreChange}
      onReset={this.handleReset} onNext={this.handleNext} data={this.state.data} />
  }
}

export default Home