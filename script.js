// Function to generate an array of random numbers
function generateArray() {
    const arrayContainer = document.getElementById('arrayContainer');
    arrayContainer.innerHTML = '';
    const arraySize = 50; // total bars
    for (let i = 0; i < arraySize; i++) {
        const value = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`; // Adjust height of bars
        arrayContainer.appendChild(bar);
    }
}

// Function to enable or disable buttons
function toggleButtons(disable) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = disable;
    });
}

// Function to visualize sorting algorithm
//bubble sort
async function sortArray() {
    toggleButtons(true);
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red'; // Highlight the bars being compared
            bars[j + 1].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, 30)); // speed of visualization
            const height1 = parseInt(bars[j].style.height);
            const height2 = parseInt(bars[j + 1].style.height);
            if (height1 > height2) {
                // Swap heights
                bars[j].style.height = `${height2}px`;
                bars[j + 1].style.height = `${height1}px`;
            }
            bars[j].style.backgroundColor = 'dodgerblue'; // change color again to og color
            bars[j + 1].style.backgroundColor = 'dodgerblue';
        }
    }
    toggleButtons(false);
}

// Function to visualize (insertion sort)
async function insertionSort() {
    toggleButtons(true);
    const bars = document.querySelectorAll('.bar');
    for (let i = 1; i < bars.length; i++) {
        let j = i - 1;
        const keyHeight = parseInt(bars[i].style.height);
        bars[i].style.backgroundColor = 'red'; // Highlight the bar being inserted
        await new Promise(resolve => setTimeout(resolve, 30)); // Delay for visualization
        while (j >= 0 && parseInt(bars[j].style.height) > keyHeight) {
            bars[j].style.backgroundColor = 'red'; // Highlight bars being compared
            bars[j + 1].style.height = bars[j].style.height; // Shift bars to the right
            await new Promise(resolve => setTimeout(resolve, 100)); // Delay for visualization
            bars[j].style.backgroundColor = 'dodgerblue'; // Reset color after comparison
            j--;
        }
        bars[j + 1].style.height = `${keyHeight}px`; // Insert the bar in the correct position
        bars[i].style.backgroundColor = 'dodgerblue'; // Reset color after insertion
    }
    toggleButtons(false);
}

// Function to visualize sorting algorithm (selection sort)
async function selectionSort() {
    toggleButtons(true);
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = 'red'; // current minimum element
        await new Promise(resolve => setTimeout(resolve, 30)); // Delay for visualization
        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = 'yellow'; //  the elements being compared
            await new Promise(resolve => setTimeout(resolve, 30)); // Delay for visualization
            const height1 = parseInt(bars[j].style.height);
            const minHeight = parseInt(bars[minIndex].style.height);
            if (height1 < minHeight) {
                bars[minIndex].style.backgroundColor = 'dodgerblue'; // Reset the color of the previous minimum element
                minIndex = j;
                bars[j].style.backgroundColor = 'red'; //  the new minimum element
            } else {
                bars[j].style.backgroundColor = 'dodgerblue'; // Reset the color of the elements being compared
            }
        }
        if (minIndex !== i) {
            // Swap heights
            const tempHeight = bars[i].style.height;
            bars[i].style.height = bars[minIndex].style.height;
            bars[minIndex].style.height = tempHeight;
        }
        bars[minIndex].style.backgroundColor = 'dodgerblue'; // Reset the color of the minimum element
        bars[i].style.backgroundColor = 'green'; // Mark the sorted element
    }
    // Change the color of the last bar to green
    bars[n - 1].style.backgroundColor = 'green';
    toggleButtons(false);
}

// Function to visualize sorting algorithm (quick sort)
async function quickSort(bars, low, high) {
    if (low < high) {
        const pi = await partition(bars, low, high);
        await quickSort(bars, low, pi);
        await quickSort(bars, pi + 1, high);
    }
}

// Function to partition the array and return the pivot index
async function partition(bars, low, high) {
    const pivotHeight = parseInt(bars[low].style.height); // Use first element as pivot
    let i = low - 1;
    let j = high + 1;
    while (true) {
        do {
            i++;
            bars[i].style.backgroundColor = 'red'; // Highlight bar being compared
            await new Promise(resolve => setTimeout(resolve, 30)); // Delay for visualization
            bars[i].style.backgroundColor = 'dodgerblue'; // Reset color
        } while (parseInt(bars[i].style.height) < pivotHeight);

        do {
            j--;
            bars[j].style.backgroundColor = 'red'; // Highlight bar being compared
            await new Promise(resolve => setTimeout(resolve, 30)); // Delay for visualization
            bars[j].style.backgroundColor = 'dodgerblue'; // Reset color
        } while (parseInt(bars[j].style.height) > pivotHeight);

        if (i >= j) {
            return j;
        }
        await swap(bars, i, j);
    }
}

// Function to swap the heights of two bars
async function swap(bars, idx1, idx2) {
    const tempHeight = bars[idx1].style.height;
    bars[idx1].style.height = bars[idx2].style.height;
    bars[idx2].style.height = tempHeight;
    await new Promise(resolve => setTimeout(resolve, 30)); // Delay for visualization
}

// Function to start the quick sort algorithm with the first element as pivot
async function startQuickSort() {
    toggleButtons(true);
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;
    await quickSort(bars, 0, n - 1);
    for (let i = 0; i < n; i++) {
        bars[i].style.backgroundColor = 'green'; // Mark all bars as sorted
    }
    toggleButtons(false);
}

// Function to visualize sorting algorithm (merge sort)
async function mergeSort(bars, l, r) {
    if (l < r) {
        const m = Math.floor((l + r) / 2);
        await mergeSort(bars, l, m);
        await mergeSort(bars, m + 1, r);
        await merge(bars, l, m, r);
    }
}

// Function to merge two subarrays
async function merge(bars, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;

    // Create temporary arrays
    const L = new Array(n1);
    const R = new Array(n2);

    // Copy data to temporary arrays L[] and R[]
    for (let i = 0; i < n1; ++i) {
        L[i] = bars[l + i].style.height;
    }
    for (let j = 0; j < n2; ++j) {
        R[j] = bars[m + 1 + j].style.height;
    }

    // Merge the temporary arrays back into bars[l..r]
    let i = 0,
        j = 0;
    let k = l;
    while (i < n1 && j < n2) {
        if (parseInt(L[i]) <= parseInt(R[j])) {
            bars[k].style.height = L[i];
            bars[k].style.backgroundColor = 'red'; // Highlight merging
            i++;
        } else {
            bars[k].style.height = R[j];
            bars[k].style.backgroundColor = 'red'; // Highlight merging
            j++;
        }
        k++;
        await new Promise(resolve => setTimeout(resolve, 30)); // Delay for visualization
    }

    while (i < n1) {
        bars[k].style.height = L[i];
        bars[k].style.backgroundColor = 'red'; // Highlight merging
        i++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 30)); // Delay for visualization
    }

    while (j < n2) {
        bars[k].style.height = R[j];
        bars[k].style.backgroundColor = 'red'; // Highlight merging
        j++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 30)); // Delay for visualization
    }

    // Reset color of merged bars
    for (let idx = l; idx <= r; idx++) {
        bars[idx].style.backgroundColor = 'dodgerblue';
    }
}

// Function to start the merge sort algorithm
async function startMergeSort() {
    toggleButtons(true);
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;
    await mergeSort(bars, 0, n - 1);
    for (let i = 0; i < n; i++) {
        bars[i].style.backgroundColor = 'green'; // Mark all bars as sorted
    }
    toggleButtons(false);
}

// Generate initial array when the page loads
window.onload = generateArray;
