import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
  name: "post",

  initialState: {
    platform: "LinkedIn",
    post: "",
    savedPost: "",
    likes: 0,
  },

  reducers: {
    setPlatform: (state, action) => {
      state.platform = action.payload;
    },

    setPost: (state, action) => {
      state.post = action.payload;
    },

    savePost: (state) => {
      state.savedPost = state.post;
    },

    clearPost: (state) => {
      state.post = "";
    },

    likePost: (state) => {
      state.likes += 1;
    },
  },
});

const {
  setPlatform,
  setPost,
  savePost,
  clearPost,
  likePost,
} = postSlice.actions;
const store = configureStore({
  reducer: {
    post: postSlice.reducer,
  },
});

function PostComposer() {
  const dispatch = useDispatch();

  const { platform, post, savedPost, likes } = useSelector(
    (state) => state.post
  );

  const limits = {
    Twitter: 280,
    LinkedIn: 3000,
    Instagram: 2200,
  };

  const limit = limits[platform];

  const isExceeded = post.length > limit;

  return (
    <div
      style={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "700px",
          margin: "auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#0A66C2",
            marginBottom: "30px",
          }}
        >
          Redux Toolkit Post Composer
        </h1>

        <label>
          <b>Select Platform</b>
        </label>

        <br />
        <br />

        <select
          value={platform}
          onChange={(e) => dispatch(setPlatform(e.target.value))}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        >
          <option>Twitter</option>
          <option>LinkedIn</option>
          <option>Instagram</option>
        </select>

        <br />
        <br />

        <label>
          <b>Write Your Post</b>
        </label>

        <br />
        <br />

        <textarea
          rows="6"
          placeholder="Type your post here..."
          value={post}
          onChange={(e) => dispatch(setPost(e.target.value))}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "2px solid #ccc",
            fontSize: "16px",
            resize: "none",
          }}
        ></textarea>

        <br />
        <br />

        <p
          style={{
            fontWeight: "bold",
            color: isExceeded ? "red" : "#2c3e50",
          }}
        >
          Characters: {post.length} / {limit}
        </p>

        {isExceeded ? (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            Character Limit Exceeded!
          </p>
        ) : (
          <p
            style={{
              color: "green",
              fontWeight: "bold",
            }}
          >
            Ready to Post
          </p>
        )}

        <button
          onClick={() => dispatch(savePost())}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Save Post
        </button>

        <button
          onClick={() => dispatch(clearPost())}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Clear
        </button>

        <button
          onClick={() => dispatch(likePost())}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
           Like
        </button>

        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#0A66C2",
            marginTop: "20px",
          }}
        >
           Total Likes: {likes}
        </p>

        <hr />

        <h2
          style={{
            color: "#0A66C2",
          }}
        >
          Saved Post
        </h2>

        <div
          style={{
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            border: "1px solid #ccc",
            minHeight: "40px",
            fontSize: "16px",
          }}
        >
          {savedPost || "No Post Saved"}
        </div>
      </div>
    </div>
  );
}
function App() {
  return (
    <Provider store={store}>
      <PostComposer />
    </Provider>
  );
}

export default App;