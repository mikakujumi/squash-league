async function loadExcelFile() {
    try {
        const response = await fetch('results.xlsx');
        if (!response.ok) throw new Error('Fehler beim Laden der Datei.');

        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const results = XLSX.utils.sheet_to_json(sheet);

        const tableBody = document.querySelector('#results-table tbody');
        tableBody.innerHTML = '';

        results.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.Platz || ''}</td>
                <td>${row.Nachname || ''}</td>
                <td>${row.Vorname || ''}</td>
                <td>${row.Spiele || ''}</td>
                <td>${row.Punkte || ''}</td>
                <td>${row.Sätze || ''}</td>
                <td>${row.Diff || ''}</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Fehler beim Laden der Ergebnisse:', error);
        document.querySelector('#results-table').insertAdjacentHTML(
            'afterend',
            '<p style="color: red;">Die Ergebnisse konnten nicht geladen werden.</p>'
        );
    }
}

document.addEventListener('DOMContentLoaded', loadExcelFile);
