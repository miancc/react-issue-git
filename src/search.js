import React, { Component, Fragment } from 'react';
import List from './list';
import Card from './card';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      value: '',
      issue: {},
    };
  }
  /**
   * Funcion para evento change de input
   */
  onChange = (e) => {
    let { value } = e.target;
    return this.searchIssues(value);
  };

  /**
   * Funcion para evento change de input
   */
  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      let { value } = e.target;
      this.searchIssues(value);
    }
    return;
  };

  /**
   * Funcion que busca los issues
   */
  searchIssues = (value) => {
    value = value.toLowerCase();
    if (!value) return this.setState({ result: [], value: value, issue: {} });
    const parameters = {
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(
      `https://api.github.com/search/issues?q=repo:facebook/react+${value}&page=1&per_page=10&sort=created&order=desc`,
      parameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let result =
          data && data.total_count > 0 && data.items ? data.items : [];

        this.setState({ result: result, value: value });
      });
  };

  /**
   * Funcion para evento click de lista
   */
  onClick = (issue) => {
    this.setState({ result: [], value: '', issue: issue }, () => {
      if (this.refInput && issue) this.refInput.value = issue.title;
    });
  };

  render() {
    const { result, value, issue } = this.state;
    return (
      <Fragment>
        <div className="row">
          <div className="col-12">
            <h3 className="text-center">Search</h3>
            <div className="row my-2">
              <div class="col-12">
                <input
                  ref={(ref) => (this.refInput = ref)}
                  type="search"
                  className="form-control"
                  placeholder="search"
                  autoComplete="off"
                  id="search"
                  onChange={this.onChange}
                  onKeyPress={this.onKeyPress}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div class="col-12">
              <List data={result} value={value} onClick={this.onClick} />
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div class="col-12">
            <Card data={issue} />
          </div>
        </div>
      </Fragment>
    );
  }
}
