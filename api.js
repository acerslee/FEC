import { TOKEN } from './token.js';
const axios = require('axios').default;


// Handles all GET requests, requires a route and a params
function handleGetRequests(route, params) {
  let options;
  if (params) {
    options = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
      headers: {
        Authorization: TOKEN
      },
      params: params
    }
  } else {
    options = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
      headers: {
        Authorization: TOKEN
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

function getReviewCards(params) {
  return handleGetRequests('reviews', params)
}

function getMetadata(params) {
  return handleGetRequests('reviews/meta', params)
}

function getQuestions(params) {
  return handleGetRequests('qa/questions/', params)
}

function getAnswers(question_id, params) {
  return handleGetRequests(`qa/questions/${question_id}/answers`, params)
}

// Handles all POST requests, requires a route and params object
function handlePostRequests(route, params) {
  let options = {
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
    headers: {
      Authorization: TOKEN
    },
    params: params
  };
  return axios(options)
}

function postReview(params) {
  return handlePostRequests('reviews', params)
}

// Handles all PUT requests, requires a route and params object
function handlePutRequests(route, params) {
  let options = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
    headers: {
      Authorization: TOKEN
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

export default {
  getAllProducts,
  getProduct,
  getReviewCards,
  getMetadata,
  getQuestions,
  getAnswers,
  postReview,
  updateHelpful,
  updateReport
}
