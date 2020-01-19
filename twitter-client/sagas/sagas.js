import { put, takeEvery, all, call } from "redux-saga/effects";
import axios from "axios";
import faker from "faker";

const fetchTweets = function* fetchTweets() {
  console.log("into fetch tweets saga");
  yield put({ type: "FETCH_TWEETS_STARTED" });
  try {
    const tweets = yield call(fetchTweetsData);
    console.log(tweets);
    yield put({ type: "FETCH_TWEETS_FULFILLED", payload: tweets });
  } catch (error) {
    console.log(error);
    yield put({ type: "FETCH_TWEETS_REJECTED", payload: error });
  }
};

const watchFetchTweets = function* watchFetchTweets() {
  yield takeEvery("FETCH_TWEETS", fetchTweets);
};

const fetchUserTweets = function* fetchUserTweets() {
  //temporary implementation. Take username/userID and fetch tweets accordingly
  yield put({ type: "FETCH_USER_TWEETS_STARTED" });
  try {
    const tweets = yield call(fetchUserTweetsData);
    yield put({ type: "FETCH_USER_TWEETS_FULFILLED", payload: tweets });
  } catch (error) {
    yield put({ type: "FETCH_USER_TWEETS_REJECTED", payload: error });
  }
};

const watchFetchUserTweets = function* watchFetchUserTweets() {
  yield takeEvery("FETCH_USER_TWEETS", fetchUserTweets);
};

const setUsername = function* setUsername(action) {
  yield put({ type: "SET_USERNAME_STARTED", payload: action.payload });
};

const watchSetUsername = function* watchSetUsername() {
  yield takeEvery("SET_USERNAME", setUsername);
};

const setPassword = function* setPassword(action) {
  yield put({ type: "SET_PASSWORD_STARTED", payload: action.payload });
};

const watchSetPassword = function* watchSetPassword() {
  yield takeEvery("SET_PASSWORD", setPassword);
};

const watchLogin = function* watchLogin() {

  yield takeEvery("DO_LOGIN", function*(action) {
    yield put({ type: "DO_LOGIN_STARTED" });
    console.log("inside watch login");
    try {
      const loginData = yield call(attemptLogin);
      console.log(loginData);
      if (
        loginData.username === action.payload.username &&
        loginData.password === action.payload.password
      )
        yield put({ type: "DO_LOGIN_SUCCESS", payload: loginData });
      else yield put({ type: "DO_LOGIN_FAILED" });
    } catch (error) {
      console.log("somehow failed login");
      yield put({ type: "DO_LOGIN_FAILED" });
    }
  });
};

const watchPostTweet = function* watchPostTweet() {
  yield takeEvery("POST_TWEET", function*(action) {
    if (action.payload.tweetContent) {
      yield put({ type: "POST_TWEET_STARTED" });
      try {
        yield call(postTweet.bind(this, action.payload));
        yield put({ type: "POST_TWEET_SUCCESS" });
        yield put({ type: "FETCH_TWEETS" });
      } catch (error) {
        yield put({ type: "POST_TWEET_FAILED" });
      }
    } else {
      yield put({ type: "POST_TWEET_FAILED" });
    }
  });
};

const watchFetchTweetReplies = function* watchFetchTweetReplies() {
  yield takeEvery("FETCH_TWEET_REPLIES", fetchTweetReplies);
};

const fetchTweetReplies = function* fetchTweetReplies() {
  yield put({ type: "FETCH_TWEET_REPLIES_STARTED" });
  try {
    const tweetReplies = yield call(fetchTweetRepliesData);
    yield put({ type: "FETCH_TWEET_REPLIES_FULFILLED", payload: tweetReplies });
  } catch (error) {
    yield put({ type: "FETCH_TWEET_REPLIES_REJECTED", payload: error });
  }
};

const rootSaga = function* rootSaga() {
  console.log("into root saga");
  yield all([
    watchFetchTweets(),
    watchFetchUserTweets(),
    watchSetUsername(),
    watchSetPassword(),
    watchLogin(),
    watchPostTweet(),
    watchFetchTweetReplies()
  ]);
};

export default rootSaga;

const fetchTweetsData = () => {
  return axios.get("http://cc70e131.ngrok.io/tweets").then(response => {
    console.log(response);
    return response.data;
  });
};

const fetchTweetRepliesData = () => {
  return axios.get("http://cc70e131.ngrok.io/tweetReplies").then(response => {
    console.log(response);
    return response.data;
  });
};

const fetchUserTweetsData = () => {
  return axios.get("http://cc70e131.ngrok.io/userTweets").then(response => {
    console.log(response);
    return response.data;
  });
};

const attemptLogin = () => {
  return axios.get("http://cc70e131.ngrok.io/login").then(response => {
    return response.data;user
  });
};

const postTweet = payload => {
  console.log(payload)
  axios.post("https://pysoul.pagekite.me/complaint",{
    user_info : payload.user,
    bully_text : payload.tweetContent,
    time : new Date().toISOString(),
  }, {
    type : 'application/json'
  }).then(res=>{
    return axios.post("http://cc70e131.ngrok.io/tweets", {
      id: faker.random.number(100000),
      time: new Date().toISOString(),
      user: payload.user,
      tweetContent: payload.tweetContent,
      likes: 0,
      retweets: 0,
      replies: 0
    });
  }).catch(e=>{
    return e;
  })
};

// const helloSaga = function* helloSaga() {
//   console.log("Hello Sagas!");
// };

// export default helloSaga;
