import allProducts from './products.json';

export const productById = async (event) => {
  console.log('Lambda invocation with event: ', event);
  var productId = event.pathParameters.productId;
  console.log('productId=', productId);

  var picked = allProducts.find(o => o.id === productId);
  console.log('picked=', picked);

  if (picked) {
    var statusToReturn = 200;
    var bodyToReturn = picked;
  } else {
    var statusToReturn = 404;
    var errMessage = `Product with id '${productId}' is not found`;
    var bodyToReturn = {"message": errMessage};
  }

  return {
    statusCode: statusToReturn,
    body: JSON.stringify(bodyToReturn)
  };


};

