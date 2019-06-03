import React, { Component } from "react";
import axios from "axios";

class FileUpload extends Component {
  submitFile = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    axios
      .post(`/test-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        this.props.updateImg(response.data.Location);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return <input label="upload file" type="file" onChange={this.submitFile} />;
  }
}

export default FileUpload;
