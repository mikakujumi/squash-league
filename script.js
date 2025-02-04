document.getElementById('upload-excel').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
