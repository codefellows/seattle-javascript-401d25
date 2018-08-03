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
    // here we load the file
    const fileReader = new FileReader();

    // The FileReader.onload property contains an event handler executed when the load event is fired, when content read with readAsArrayBuffer, readAsBinaryString, readAsDataURL or readAsText is available.

    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () => resolve(fileReader.result)); // .result is the file's base 64 reprsentation
    fileReader.addEventListener('error', reject);
    console.log(file, 'what is file')
    // The readAsDataURL method is used to read the contents of the specified Blob or File. When the read operation is finished, the readyState becomes DONE, and the loadend is triggered. At that time, the result attribute contains  the data as a data: URL representing the file's data as a base64 encoded string.
  });
};

const stopEvents = (event) => {
  // event.stopPropagation();
  // event.preventDefault is needed to stop the browser from travling to the file itself
  event.preventDefault();
};

export default class SoundForm extends React.Component {
  constructor(props) {
    super(props);

    // anything with "this" inside the constructor is generally available to other methods in the rest of our class (assuming arrow methods or methods that were explicitly bound)
    this.emptyState = {
      preview: null, // base64 representation of the sound we'll upload
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
    document.getElementsByClassName('drop-zone')[0].addEventListener('dragleave', this.onDragLeave);
    window.addEventListener('drop', this.onDrop);
  }

  // we stopPropagation and preventDefault to keep events from bubbling up and to prevent the default action. this safety is probably not needed because we are adding the event listeners on the window object and just just targeting this current DOM element, but it is still good to include
  onDragEnter = (event) => {
    stopEvents(event);
    return false;
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
    const { files } = event.dataTransfer;
    const [file] = files;
    fileToBase64String(file)
      .then((preview) => {
        // TODO: This was really annoying to capture with React state. Find a better way to clear out the input value
        this.setState({
          fileType: file.type,
          dragOverClass: '',
          title: file.name,
          sound: file,
          preview,
        });
      });
  }

  handleChange = (event) => {
    const { type, value, files } = event.target; // notice how we now have a "files" property on event.target
    // if the input is a file input
    if (type === 'file') {
      const [file] = files;
      fileToBase64String(file)
        .then((preview) => {
          this.setState({ 
            sound: file,
            fileType: file.type,
            title: file.name,
            preview,
          });
        });
    } else { // if I am here, I am focused on the regular text field that wants a user to type a description
      this.setState({ description: value });
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
    if (fileType.includes('audio'.toLowerCase())) {
      return <audio src={this.state.preview} controls></audio>;
    } 
    return <img src={ this.state.preview } />;
  }

  // needed to preventDefault because the button click would just submit the form automatically reuslting in bad request to the server
  clearFile = (event) => {
    stopEvents(event);
    this.setState(this.emptyState);
  }

  render() {
    console.log(this.state)
    return (
      <form
        onSubmit={ this.handleSubmit }
        className="sound-form"
      >
        { this.renderFile(this.state.fileType) }

        <div className={ `drop-zone ${this.state.dragOverClass}`}>
          <label htmlFor="sound">Upload a File Or Drag and Drop One Here</label>
          <input 
            type="file"
            name="sound"
            onChange={ this.handleChange }
          />
          <button onClick={this.clearFile}>Clear File</button>
        </div>

        <label htmlFor="description">Description</label>
        <input 
          type="text"
          name="description"
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
