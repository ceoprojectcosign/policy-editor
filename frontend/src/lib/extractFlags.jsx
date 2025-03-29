export const extractFlags = (text) => {
    const terms = ['gender', 'bathroom', 'CRT'];
    return terms.reduce((acc, term) => {
      acc[term] = text.toLowerCase().includes(term);
      return acc;
    }, {});
  };