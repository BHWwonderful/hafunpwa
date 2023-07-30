const underlineAnswer = (question) => {
  const pattern = /_{2,}/g;
  const replacedString = question.replace(pattern, (match) => `<span>${match}</span>`);
  return replacedString;
}

export default underlineAnswer;