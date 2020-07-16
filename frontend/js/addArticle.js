document.addEventListener('DOMContentLoaded', function () {
  const saveBtn = document.getElementById('saveBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  saveBtn.addEventListener('click', function () {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const article = {
      title: title,
      content: content
    };

    console.log(article);

    // TODO ajax calling

  });

  cancelBtn.addEventListener('click', function () {
    window.history.back();
  });
});