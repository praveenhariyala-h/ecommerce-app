import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_ADMIN_KEY
);

const index = client.initIndex('products');

export const indexProducts = async (products) => {
  try {
    await index.saveObjects(products, { autoGenerateObjectIDIfNotExist: true });
  } catch (error) {
    console.error('Error indexing products:', error);
  }
};

export const searchProducts = async (query) => {
  try {
    const { hits } = await index.search(query);
    return hits;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};
