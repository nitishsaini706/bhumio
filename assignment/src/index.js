const t = require('tesseract.js');

const extractText = async (imagePath) => {
    try {
        const worker = await t.createWorker('eng');
        const ret = await worker.recognize("./images/2.jpg");
        console.log(ret.data.text);
        const pattern = /(\d+)\.\s+(.*?)\s+\[(.*?)\]/g;

        // Initialize an array to store the extracted data
        const extractedData = [];

        // Execute the regular expression pattern on the text
        let match;
        while ((match = pattern.exec(ret.data.text)) !== null) {
            // Extracted data format: { number, question, option }
            const [, number, question, option] = match;
            extractedData.push({ number, question, option });
        }
        console.log('answers', extractedData)
        await worker.terminate();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Replace these paths with the actual paths to your image files.
const images = ["./images/2.jpg", "./images/1.jpg", "./images/3.jpg"];

// Process each image individually
images.forEach((imagePath) => {
    extractText(imagePath);
});