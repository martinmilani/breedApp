import React, { Component } from "react";

class DataGenerator extends Component {
  constructor() {
    super();
    this.state = {
      breedList: [],
      value: "",
      loading: false,
      error: null,
      imgUrl: "",
      urlLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  /*Call api to get the breed list */
  componentDidMount() {
    this.setState({ loading: true })
    fetch("https://dog.ceo/api/breeds/list")
      .then((res) => res.json())
      .then(
        (res) => {
          this.setState({
            loading: false,
            breedList: res.message
          });
        },
        (error) => {
          this.setState({
            loading: false,
            error
          });
        }
      );
  }

  /* Handle selected breed */
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  /* call api to get breed img url */
  componentDidUpdate(prevpProps, prevState) {
    let dir = `https://dog.ceo/api/breed/${this.state.value}/images/random`;
    if (prevState.value !== this.state.value) {
      this.setState({ urlLoading: true });
      fetch(dir)
        .then((res) => res.json())
        .then(
          (res) => {
            this.setState({
              urlLoading: false,
              imgUrl: res.message,

            });
          },
          (error) => {
            this.setState({
              urlLoadiing: false,
              error
            });

          }
        );
    }
  }

  render() {
    const { error, loading, imgUrl, urlLoading, value, breedList } = this.state;
    if (error) {
      return <div className="error">Error: {error.message}</div>;
    } else if (loading) {
      return <div className="loading">Loading...</div>;
    } else {
      let listItems = breedList.map((item, i) => (
        <option key={i} value={item}>
          {item}
        </option>
      ));
      return (
        <div>
          {/* Render a dropdown menu to choose a breed */}
          <div className="section__select">
            <select value={value} onChange={this.handleChange}>
              <option selected value="">Select a dog breed</option>
              {listItems}
            </select>
          </div>
          {/* Render the image of the selected breed */}
          <div className="section__img">
            {error ?
              <div className="error">Error: {error.message}</div> :
              urlLoading ?
                <div className="loading">Loading...</div> :
                value !== "" ?
                  <div><h2 className="section__img-title">{value}</h2><img className="section__img-img" src={imgUrl} alt="" /></div> :
                  null}
          </div>
        </div>
      );
    }
  }
}

export default DataGenerator;
