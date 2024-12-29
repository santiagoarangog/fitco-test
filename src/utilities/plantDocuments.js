export const getCountsByCategory = (docList) => {
  const countDocs = docList.reduce((acc, curr) => {
    if (curr.documents.length > 0) {
      const category = curr.code.slice(0, -2);
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {});
  return countDocs;
};
