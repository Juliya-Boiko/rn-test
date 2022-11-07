export const commentsAmount = (obj) => {
  if (obj.comments) {
    return obj.comments.length;
  }
  return 0;
};