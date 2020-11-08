import allProducts from './products.json';

export const products = async (event) => {
  console.log('Lambda invocation with event: ', event);
  return {
    statusCode: 200,
    body: JSON.stringify(allProducts)
  };
};