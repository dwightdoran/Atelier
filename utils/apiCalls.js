const axios = require('axios');

// ========== Shared ========== //

// ========== Overview ========== //

const getProductDataByItem = (product_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${product_id}`;
  return axios.get(endpoint, {
    headers : {
      // "Authorization" : // put API key from .env here
    }
  })
  .then((results) => {
    callback(results.data);
  })
  .catch((err) => {
    callback(err);
  })
}

const getProductStylesByItem = (product_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${product_id}/styles`;
  axios.get(endpoint, {
    headers : {
      // "Authorization" : // put API key from .env here
    }
  })
  .then((results) => {
    callback(results.data);
  })
  .catch((err) => {
    callback(err);
  })
}

const addProductToCart = (sku_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart`;
  axios.post(endpoint, {
    headers : {
      // "Authorization" : // put API key from .env here
    },
    'sku_id' : sku_id
  })
  .then((results) => {
    callback();
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.getProductDataByItem = getProductDataByItem;
module.exports.getProductStylesByItem = getProductStylesByItem;
module.exports.addProductToCart = addProductToCart;

// ========== Related Products ========== //

// ========== Questions & Answers ========== //

//const QA_API_KEY = require('../env/config.js').API_KEY;

const getProductQuestionData = (product_id, callback) => {
  let endpoint = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id='.concat(product_id);

  return axios.get(endpoint, {
    headers: {
      "Authorization": process.env.API_KEY
    }
  })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err);
    });
}

module.exports.getProductQuestionData = getProductQuestionData;

// ========== Ratings & Reviews ========== //

const getReviewsByItem = (product_id, callback) => {
  console.log('get reviews by item fired: ', product_id);
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${product_id}`;
  axios.get(endpoint, {
    headers : {
      //Authorization : process.env.API_KEY,
      //count: 20,
      //I'll need to take this in as a param in the future
      //sort: 'newest'
    }
  })
  .then((response) => {
    console.log('api call reports data back');
    callback(null, response);
  })
  .catch((error) => {
    console.log('Error fetching the ratings data: ', error)
    callback(error);
  })
}

const getReviewsMetaByItem = (product_id) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${product_id}`;
  return axios.get(endpoint, {
    headers : {
      "Authorization" : process.env.API_KEY
    }
  })
  .catch((err) => {
    console.log('Error fetching the ratings metadata: ', err)
  })
}

module.exports.getReviewsByItem = getReviewsByItem;
module.exports.getReviewsMetaByItem = getReviewsMetaByItem;