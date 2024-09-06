
        let numbers = [];

        function updateNumbers() {
            const input = document.getElementById("numberList").value;
            numbers = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        }

        function linearSearch(numberToFind) {
            for (let i = 0; i < numbers.length; i++) {
                if (numbers[i] === numberToFind) {
                    return true;
                }
            }
            return false;
        }

        function binarySearch(numberToFind) {
            let left = 0;
            let right = numbers.length - 1;

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (numbers[mid] === numberToFind) {
                    return true;
                } else if (numbers[mid] < numberToFind) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            return false;
        }

        function search() {
            updateNumbers();
            const input = document.getElementById("searchNumber").value;
            const searchMethod = document.getElementById("searchMethod").value;
            const resultMessage = document.getElementById("resultMessage");
            const numberToFind = parseInt(input);

            let found = false;
            if (searchMethod === "linear") {
                found = linearSearch(numberToFind);
            } else if (searchMethod === "binary") {
                numbers.sort((a, b) => a - b); // Đảm bảo danh sách được sắp xếp
                found = binarySearch(numberToFind);
            }

            resultMessage.innerHTML = found ? `Số ${numberToFind} có trong danh sách!` : `Số ${numberToFind} không có trong danh sách.`;
        }

        function sortNumbers() {
            updateNumbers();
            numbers.sort((a, b) => a - b);
            document.getElementById("resultMessage").innerHTML += `<br> Danh sách đã được sắp xếp: ${numbers.join(', ')}`;
        }

        function clearInputs() {
            document.getElementById("numberList").value = '';
            document.getElementById("searchNumber").value = '';
            document.getElementById("resultMessage").innerHTML = '';
            numbers = [];
        }
