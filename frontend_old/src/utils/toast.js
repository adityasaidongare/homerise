export const showToast = (msg, type = 'success') => {
  // Simple toast using alert, replace with a better UI lib if needed
  if (type === 'success') {
    alert(msg);
  } else {
    alert('Error: ' + msg);
  }
};
