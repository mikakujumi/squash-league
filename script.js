document.getElementById('upload-excel').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Pobierz pierwszy arkusz
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Konwersja na tablicę obiektów
        const results = XLSX.utils.sheet_to_json(sheet);

        // Wyczyść tabelę przed aktualizacją
        const tableBody = document.querySelector('#results-table tbody');
        tableBody.innerHTML = '';

        // Dodaj dane do tabeli
        results.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.Platz}</td><td>${row.Vorname}</td><td>${row.Nachname}</td><td>${row.Punkte}</td>`;
            tableBody.appendChild(tr);
        });
    };

    reader.onerror = function(error) {
        console.error('Fehler beim Laden der Datei:', error);
    };
});
