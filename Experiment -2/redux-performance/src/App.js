import React, { memo } from "react";
import "./App.css";

import {
  Provider,
  useSelector,
  useDispatch
} from "react-redux";

import {
  configureStore,
  createSlice
} from "@reduxjs/toolkit";

import { createSelector } from "reselect";

import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaRedditAlien,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const platformData = {

  LinkedIn: {
    icon: <FaLinkedin />,
    color: "#0A66C2",
    limit: 3000,
  },

  "X (Twitter)": {
    icon: <FaXTwitter />,
    color: "#000000",
    limit: 280,
  },

  Instagram: {
    icon: <FaInstagram />,
    color: "#E1306C",
    limit: 2200,
  },

  Facebook: {
    icon: <FaFacebook />,
    color: "#1877F2",
    limit: 63206,
  },

  YouTube: {
    icon: <FaYoutube />,
    color: "#FF0000",
    limit: 5000,
  },

  Reddit: {
    icon: <FaRedditAlien />,
    color: "#FF4500",
    limit: 40000,
  },

  Telegram: {
    icon: <FaTelegramPlane />,
    color: "#0088CC",
    limit: 4096,
  },

  WhatsApp: {
    icon: <FaWhatsapp />,
    color: "#25D366",
    limit: 700,
  },

};

const postSlice = createSlice({

  name: "post",

  initialState: {

  platform: "LinkedIn",

  post: "",

  savedPosts: [],

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

  if (state.post.trim() !== "") {

    state.savedPosts.push({

      platform: state.platform,

      content: state.post,

      likes: 0,

      date: new Date().toLocaleString(),

    });

    state.post = "";

  }

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

const selectPostState = (state) => state.post;

const selectPlatform = createSelector(

  [selectPostState],

  (state) => state.platform

);

const selectPost = createSelector(

  [selectPostState],

  (state) => state.post

);

const selectSavedPosts = createSelector(

  [selectPostState],

  (state) => state.savedPosts

);

const selectLikes = createSelector(

  [selectPostState],

  (state) => state.likes

);

const Preview = memo(({ post }) => {

  return (

    <div className="previewCard">

      <h3>Live Preview</h3>

      <p>

        {post || "Start typing to preview your post..."}

      </p>

    </div>

  );

});


function PostComposer() {

  const dispatch = useDispatch();

  const platform = useSelector(selectPlatform);
  const post = useSelector(selectPost);
  const savedPosts = useSelector(selectSavedPosts);
  const likes = useSelector(selectLikes);

  const limit = platformData[platform].limit;

  const isExceeded = post.length > limit;

  return (

    <div className="container">

      <div className="card">

        <h1
          style={{
            color: platformData[platform].color,
          }}
        >
          {platformData[platform].icon}

          <br />

          {platform} Post Composer
        </h1>

        <label>

          <b>Select Platform</b>

        </label>

        <br />

        <br />

        <select

          value={platform}

          onChange={(e) =>
            dispatch(setPlatform(e.target.value))
          }

        >

          {Object.keys(platformData).map((item) => (

            <option
              key={item}
              value={item}
            >

              {item}

            </option>

          ))}

        </select>

        <br />

        <br />

        <div
          className="logoBox"
          style={{
            color: platformData[platform].color,
          }}
        >

          <div className="logo">

            {platformData[platform].icon}

          </div>

          <h2>

            {platform}

          </h2>

        </div>

        <label>

          <b>Write Your Post</b>

        </label>

        <br />

        <br />

        <textarea

          rows="7"

          value={post}

          placeholder="Write something amazing..."

          onChange={(e) =>
            dispatch(setPost(e.target.value))
          }

        />

        <p
          style={{
            color: isExceeded ? "red" : "green",
            fontWeight: "bold",
          }}
        >

          Characters :

          {post.length}

          /

          {limit}

        </p>

        {

          isExceeded ?

            (

              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >

                Character Limit Exceeded

              </p>

            )

            :

            (

              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                }}
              >

                Ready to Post

              </p>

            )

        }

        <div className="buttonGroup">

          <button

            className="save"

            onClick={() =>
              dispatch(savePost())
            }

          >

            💾 Save Post

          </button>

          <button

            className="clear"

            onClick={() =>
              dispatch(clearPost())
            }

          >

            🗑 Clear

          </button>

          <button

            className="like"

            onClick={() =>
              dispatch(likePost())
            }

          >

            ❤️ Like

          </button>

        </div>

        <div className="likes">

          ❤️ Total Likes :

          {likes}

        </div>

        <Preview

          post={post}

        />

        <div className="savedPost">

  <h2>Saved Posts</h2>

  {

    savedPosts.length === 0 ?

    (

      <p>No posts saved yet.</p>

    )

    :

    (

      savedPosts.map((item, index) => (

        <div
          key={index}
          className="postCard"
        >

          <h3>{item.platform}</h3>

          <p>{item.content}</p>

          <small>{item.date}</small>

          <hr />

        </div>

      ))

    )

  }

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