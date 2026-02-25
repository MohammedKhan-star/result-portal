import axios from "axios";
import { useState, useEffect } from "react";

function Admin() {
  const [file, setFile] = useState(null);
  const [filesList, setFilesList] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // Use env variable or fallback
  // Fetch uploaded files from server
  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/files`); // Your backend endpoint to get file list
      setFilesList(res.data); // Assuming res.data is an array of filenames
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Upload a file
  const uploadFile = async () => {
    if (!file) return alert("Please select a file first");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_URL}/upload`, formData);
      alert("Upload Successful");
      setFile(null);
      fetchFiles(); // Refresh file list
    } catch (err) {
      console.error(err);
      alert("Upload Failed");
    }
  };

  // Delete a file
  const deleteFile = async (filename) => {
    try {
      await axios.delete(`${API_URL}/delete/${filename}`);
      alert("File Deleted");
      fetchFiles(); // Refresh file list
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };

  return (
    <div>
      <h2>Admin Upload</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>

      <h3>Uploaded Files</h3>
      {filesList.length === 0 && <p>No files uploaded yet.</p>}
      <ul>
        {filesList.map((f, index) => (
          <li key={index}>
            {f}{" "}
            <button onClick={() => deleteFile(f)} style={{ color: "red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;