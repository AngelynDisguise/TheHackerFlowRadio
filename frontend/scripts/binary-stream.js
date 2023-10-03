function generateRandomBinary() {
    return Math.random() < 0.5 ? '0' : '1';
}

const binaryColumnElements = document.querySelectorAll('.binary-stream');
const columnLength = 50; // Adjust the number of digits in the column as needed

function updateBinaryColumn(binaryElement) {
    let newColumn = '';
    for (let i = 0; i < columnLength; i++) {
        newColumn += generateRandomBinary() + '<br>';
    }
    binaryElement.innerHTML = newColumn;
}

// Update all binary columns periodically (e.g., every 1 second)
binaryColumnElements.forEach((element) => {
    setInterval(() => updateBinaryColumn(element), 500);
});
