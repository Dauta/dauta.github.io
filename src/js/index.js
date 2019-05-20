const downloadUrl = 'https://docs.google.com/viewer?url=https://docs.google.com/document/d/1em5v-nLuPFSExcal91TA8FjQbM9ci4_myZnejeFIxSk/export?format=pdf';

document.addEventListener('DOMContentLoaded', () => {
  // config download button
  const downloadButton = document.querySelector('.menu-item__download');
  downloadButton.addEventListener('click', () => {
    window.open(downloadUrl, 'blank');
  });
});