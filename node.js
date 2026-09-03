import { google } from 'googleapis';
import fs from 'fs';

const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/spreadsheets'],
});

const drive = google.drive({ version: 'v3', auth });
const sheets = google.sheets({ version: 'v4', auth });

// Upload file to Drive
async function uploadFile(filePath, fileName) {
    const res = await drive.files.create({
        requestBody: { name: fileName, parents: ['1R8j1LDIQfhI-Anr5HDoQP5g5fNWYOBAC'] },
        media: { mimeType: 'image/jpeg', body: fs.createReadStream(filePath) },
    });
    return res.data.id;
}

// Append metadata to Sheet
async function appendToSheet(name, title, description, fileId) {
    await sheets.spreadsheets.values.append({
        spreadsheetId: '1oVwuDlwg7g-13UAW6Ih6OcnW8YPSWjtDZzm3kFSNiB4',
        range: 'Sheet1!A:D',
        valueInputOption: 'RAW',
        requestBody: {
            values: [[name, title, description, `https://drive.google.com/uc?id=${fileId}`]],
        },
    });
}
