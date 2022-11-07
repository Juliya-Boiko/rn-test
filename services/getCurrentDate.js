export const getCurrentDate = () => {
  const date = new Date();
  const data = date.toLocaleString('en-US', {
    month: 'long',
  });

  return `${new Date().getDate()} ${data} ${new Date().getFullYear()}`;
}; 