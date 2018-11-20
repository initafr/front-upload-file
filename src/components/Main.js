import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileURL: ''
    };
  }

  handleUploadFile = e => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data
    }).then(response => {
      response.json().then(body => {
        this.setState({ fileURL: `http://localhost:8000/${body.file}` });
      });
    });
  };

  render() {
    return (
      <form onSubmit={this.handleUploadFile}>
        <div>
          <input
            ref={ref => {
              this.uploadInput = ref;
            }}
            type="file"
          />
        </div>
        <div>
          <input
            ref={ref => {
              this.fileName = ref;
            }}
            type="text"
            placeholder="Enter name of file"
          />
        </div>
        <div>
          <button>Upload</button>
        </div>
        <img src={this.state.fileURL} alt="file uploated" />
      </form>
    );
  }
}

export default Main;
