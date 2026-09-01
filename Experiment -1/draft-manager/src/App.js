import { useState } from "react";

function App() {
  const [platform, setPlatform] = useState("Twitter");
  const [post, setPost] = useState("");
  const [drafts, setDrafts] = useState([]);

  const limits = {
    Twitter: 280,
    LinkedIn: 3000,
    Instagram: 2200,
  };

  const limit = limits[platform];
  const isExceeded = post.length > limit;

  // Save Draft
  const saveDraft = () => {
    if (post.trim() === "") {
      alert("Please write something first!");
      return;
    }

    setDrafts([...drafts, post]);
    setPost("");
  };

  // Edit Draft
  const editDraft = (index) => {
    setPost(drafts[index]);

    const updatedDrafts = drafts.filter((_, i) => i !== index);
    setDrafts(updatedDrafts);
  };

  // Delete Draft
  const deleteDraft = (index) => {
    const updatedDrafts = drafts.filter((_, i) => i !== index);
    setDrafts(updatedDrafts);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Social Media Post Composer
      </h1>

      {/* Platform Selection */}
      <h3>Select Platform</h3>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <option value="Twitter">Twitter</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="Instagram">Instagram</option>
      </select>

      {/* Post Input */}
      <h3>Write Your Post</h3>

      <textarea
        rows="7"
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="Write your post here..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "2px solid #ccc",
          resize: "none",
        }}
      />

      {/* Character Counter */}
      <p style={{ marginTop: "10px" }}>
        Characters: <b>{post.length}</b> / <b>{limit}</b>
      </p>

      {/* Status */}
      {isExceeded ? (
        <p style={{ color: "red", fontWeight: "bold" }}>
          Character limit exceeded!
        </p>
      ) : (
        <p style={{ color: "green", fontWeight: "bold" }}>
          Ready to post
        </p>
      )}

      {/* Save Button */}
      <button
        onClick={saveDraft}
        disabled={isExceeded}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: isExceeded ? "not-allowed" : "pointer",
          fontSize: "16px",
        }}
      >
        Save Draft
      </button>

      <hr style={{ margin: "30px 0" }} />

      {/* Draft Section */}
      <h2>Saved Drafts</h2>

      {drafts.length === 0 ? (
        <p>No drafts available.</p>
      ) : (
        drafts.map((draft, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#ffffff",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
            }}
          >
            <p>{draft}</p>

            <button
              onClick={() => editDraft(index)}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              ✏ Edit
            </button>

            <button
              onClick={() => deleteDraft(index)}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;