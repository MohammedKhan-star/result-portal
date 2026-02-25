import axios from "axios";
import { useState } from "react";

function Admin() {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/upload", formData);
    alert("Upload Successful");
  };

  return (
    <div>
      <h2>Admin Upload</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}

export default Admin;