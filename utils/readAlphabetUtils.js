import fs from 'fs/promises';
import path from 'path';

export default async function readAlphabetData(folderName) {
    try {
        const folderPath = path.join(process.cwd(), folderName);
        // Read the list of files in the folder
        const fileNames = await fs.readdir(folderPath);

        // Create an object to store data
        const alphabetData = {};

        // Iterate through each file
        for (const fileName of fileNames) {
            // Extract the letter from the file name
            const letter = path.parse(fileName).name.toLowerCase();

            // Read the content of the file
            const filePath = path.join(folderPath, fileName);
            const fileContent = await fs.readFile(filePath, 'utf8');

            // Parse the JSON content
            const jsonData = JSON.parse(fileContent);

            // Assign the data to the corresponding letter in the object
            alphabetData[letter] = jsonData;
        }

        // Return the final object
        return alphabetData;
    } catch (error) {
        console.error('Error reading alphabet data:', error);
        throw error;
    }
}