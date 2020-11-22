export const catalogBatchProcess = async (event) => {
  console.log('Lambda catalogBatchProcess invocation with event: ', event);
  const products = event.Records.map(({ body })=> body);
  console.log(products);
};

