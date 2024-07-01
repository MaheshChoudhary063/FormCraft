import React from "react";
import uploadService from "../../Routes/uploadRoute";

function ImageUplaodModel(props) {
  const [image, setImage] = React.useState(undefined);
  const [imageWarning, setImageWarning] = React.useState("");

  const uploadImage = () => {
    if (image.size > 3110670) {
      setImageWarning("File Size is too big");
    } else {
      const formData = new FormData();
      formData.append("myfile", image);
      uploadService
        .uploadImage(formData)
        .then((data) => {
          var imageLink = data.host + "/" + data.image;
          props.handleImagePopClose();
          props.updateImageLink(imageLink, props.contextData);
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setImageWarning(resMessage);
        });
    }
  };

  return (
    <div>
      {props.handleImagePopOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Upload Image Here</h2>
              <button className="close-btn" onClick={props.handleImagePopClose}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                Hey, Creating a Community is fun and easy, just fill these easy
                fields and get your personlized gang ready within seconds.
              </p>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {imageWarning !== "" && <p>{imageWarning}</p>}
            </div>
            <div className="modal-footer">
              <button
                className="btn cancel-btn"
                onClick={props.handleImagePopClose}
              >
                Cancel
              </button>
              <button className="btn upload-btn" onClick={uploadImage}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUplaodModel;
