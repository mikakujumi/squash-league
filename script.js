// Funkcja do pobrania i wczytania pliku Excel
async function loadExcelFile() {
    try {
        // Pobierz plik results.xlsx z serwera
        const response = await fetch('results.xlsx');
        if (!response.ok) throw new Error('Fehler beim Laden der Datei.');

        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // Pobierz pierwszy arkusz Excela
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Konwersja arkusza na JSON
        const results = XLSX.utils.sheet_to_json(sheet);

        // Pobierz element tabeli i wyczyść go
        const tableBody = document.querySelector('#results-table tbody');
        tableBody.innerHTML = '';

        // Dodaj dane do tabeli
        results.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.Platz}</td><td>${row.Vorname}</td><td>${row.Nachname}</td><td>${row.Punkte}</td>`;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Fehler beim Laden der Ergebnisse:', error);
        document.querySelector('#results-table').insertAdjacentHTML(
            'afterend',
            '<p style="color: red;">Die Ergebnisse konnten nicht geladen werden. Bitte versuchen Sie es später erneut.</p>'
        );
    }
}

// Załaduj plik Excel automatycznie po załadowaniu strony
document.addEventListener('DOMContentLoaded', loadExcelFile);
