import React from 'react';
import PropTypes from 'prop-types';
import './sound-form.scss';

const fileToBase64String = (file) => {
  // because FileReader reads contents asynchronously, we wrap it in a promise to handle the data flow
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('File Required'));
    }

    // The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    // instantiate a new filereader
    const fileReader = new FileReader();

    // The FileReader.onload property contains an event handler executed when the load event is fired, when content read with readAsArrayBuffer, readAsBinaryString, readAsDataURL or readAsText is available.
    fileReader.addEventListener('load', () => resolve(fileReader.result)); // .result is the file's base 64 representation 
    fileReader.addEventListener('error', reject);
    // The readAsDataURL method is used to read the contents of the specified Blob or File. When the read operation is finished, the readyState becomes DONE, and the loadend is triggered. At that time, the result attribute contains  the data as a data: URL representing the file's data as a base64 encoded string.
    fileReader.readAsDataURL(file);
    return undefined;
  });
};

const stopEvents = (event) => {
  // this isn't really that necessary because our dragging events are on the top level window, but still good to know
  event.stopPropagation();
  // event.preventDefault is needed to stop the browser from traveling to the file itself
  event.preventDefault();
};

export default class SoundForm extends React.Component {
  constructor(props) {
    super(props);

    // anything with "this" inside the constructor is generally available to other methods in the rest of our class (assuming arrow methods or methods that were explicitly bound)
    this.emptyState = {
      preview: null, // base64 representation of the asset we'll upload
      sound: '',
      fileType: '',
      dragOverClass: '',
      title: '',
    };

    this.overLayClassName = 'overlay';
    this.state = this.emptyState;
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onDragLeave);
    window.addEventListener('dragenter', this.onDragEnter);
    window.addEventListener('dragover', this.onDragOver);
    document.getElementById('drop-zone').addEventListener('dragleave', this.onDragLeave);
    window.addEventListener('drop', this.onDrop);
  }

  onDragEnter = (event) => {
    stopEvents(event);
  }

  onDragOver = (event) => {
    stopEvents(event);
    this.setState({ dragOverClass: this.overLayClassName });
  }

  onDragLeave = (event) => {
    stopEvents(event);
    this.setState({ dragOverClass: '' });
  }

  onDrop = (event) => {
    event.preventDefault();
    // event.dataTransfer.files is an array-like object with metadata about the files you uploaded
    const { files } = event.dataTransfer;
    const [file] = files;
    fileToBase64String(file)
      .then((preview) => {
        this.setState({
          fileType: file.type,
          dragOverClass: '',
          title: file.name,
          sound: file,
          preview,
        });
      })
      .catch(console.error);
  }

  handleChange = (event) => {
    const { type, value, files } = event.target; // notice how we now have a "files" property on event.target IF the input type is "file"

    // if the input's type is file
    if (type === 'file') {
      const [file] = files;
      fileToBase64String(file)
        .then((preview) => {
          this.setState({
            fileType: file.type,
            dragOverClass: '',
            title: file.name,
            sound: file,
            preview,
          });
        })
        .catch(console.error);
    } else {
      this.setState({ title: value });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onComplete(this.state)
      .then(() => {
        this.setState(this.emptyState);
      })
      .catch(console.error);
  }

  renderFile = (fileType) => {
    if (fileType.toLowerCase().includes('audio')) {
      return <audio src={this.state.preview} controls></audio>;
    }
    return <img src={ this.state.preview } />;
  }

  clearFile = (event) => {
    stopEvents(event);
    this.setState(this.emptyState);
  }

  render() {
    return (
      <form
        onSubmit={ this.handleSubmit }
        className="sound-form"
      >
        { this.renderFile(this.state.fileType) }
        <div className={this.state.dragOverClass} id="drop-zone">
          <label htmlFor="sound">Upload a File or Drag and Drop One Here</label>
          <input 
            type="file"
            name="sound"
            onChange={ this.handleChange }
          />
          <button onClick={ this.clearFile }>Clear File</button>
        </div>
        <label htmlFor="title">Title</label>
        <input 
            type="text"
            name="title"
            onChange={ this.handleChange }
          />
        <button type="submit">Upload a File!</button>
      </form>
    );
  }
}

SoundForm.propTypes = {
  onComplete: PropTypes.func,
};
