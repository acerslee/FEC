const axios = require('axios').default;

// Handles all GET requests, requires a route and a params
function handleGetRequests(route, params) {
  let options;
  if (params) {
    options = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
      headers: {
        Authorization: process.env.TOKEN
      },
      params: params
    }
  } else {
    options = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
      headers: {
        Authorization:  process.env.TOKEN
      }
    }
  }
  return axios(options)
}

function getAllProducts() {
  return handleGetRequests('products')
}

function getProduct(product_id) {
  return handleGetRequests(`products/${product_id}`)
}

function getProductStyles(product_id) {
  return handleGetRequests(`products/${product_id}/styles`)
}

function getRelatedProductIds(product_id) {
  return handleGetRequests(`products/${product_id}/related`)
}

function getReviewCards(params) {
  return handleGetRequests('reviews', params)
}

function getMetadata(params) {
  return handleGetRequests('reviews/meta', params)
}

function getQuestions(params) {
  return handleGetRequests('qa/questions', params)
}

function getAnswers(question_id, params) {
  return handleGetRequests(`qa/questions/${question_id}/answers`, params)
}

// Handles all POST requests, requires a route, params, and data object
function handlePostRequests(route, params = {}, data = {}) {
  let options = {
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.TOKEN
    },
    params: params,
    data: data
  };
  return axios(options)
}

function postReview(json) {
  return handlePostRequests('reviews', {}, json)
}

function postQuestion(data) {
  return handlePostRequests('qa/questions', null, data)
}

function postAnswer(data) {
  return handlePostRequests(`qa/questions/${data.question_id}/answers`, null, data)
}

// Handles all PUT requests, requires a route and params object
function handlePutRequests(route, params) {
  let options = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
    headers: {
      Authorization: process.env.TOKEN
    },
    params: params
  };
  return axios(options)
}

function updateHelpful(review_id, params) {
  return handlePutRequests(`reviews/${review_id}/helpful`, params);
}

function updateReport(review_id, params) {
  return handlePutRequests(`reviews/${review_id}/report`, params);
}

function markQuestionHelpful(question_id) {
  return handlePutRequests(`qa/questions/${question_id}/helpful`);
}

function markAnswerHelpful(answer_id) {
  return handlePutRequests(`qa/answers/${answer_id}/helpful`);
}

function reportAnswer(answer_id) {
  return handlePutRequests(`qa/answers/${answer_id}/report`);
}

function uploadImages(imageURL) {
  let options = {
    method: 'post',
    url: '/upload_images',
    data: {
      image: imageURL
    }
  };

  return axios(options);
}

export default{
  getAllProducts,
  getProduct,
  getProductStyles,
  getRelatedProductIds,
  getReviewCards,
  getMetadata,
  getQuestions,
  getAnswers,
  postReview,
  postQuestion,
  postAnswer,
  updateHelpful,
  updateReport,
  markQuestionHelpful,
  markAnswerHelpful,
  reportAnswer,
  uploadImages
}
