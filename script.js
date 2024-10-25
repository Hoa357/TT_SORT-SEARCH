
      let sortedArr = [];
      const descriptions = {
        sort: {
          "Sắp xếp nổi bọt":
            "Sắp xếp nổi bọt (Bubble Sort) so sánh từng cặp phần tử và hoán đổi chúng nếu không theo thứ tự. Quá trình này lặp lại cho đến khi không còn hoán đổi nào nữa.",
          "Sắp xếp chọn":
            "Sắp xếp chọn (Selection Sort) tìm phần tử nhỏ nhất và đặt nó ở đầu mảng, sau đó tiếp tục tìm phần tử nhỏ nhất trong phần còn lại.",
          "Sắp xếp chèn":
            "Sắp xếp chèn (Insertion Sort) xây dựng mảng đã sắp xếp từng bước bằng cách chèn từng phần tử từ mảng chưa sắp xếp vào vị trí thích hợp.",
          "Sắp xếp trộn":
            "Sắp xếp trộn (Merge Sort) chia mảng thành hai nửa, sắp xếp chúng, và sau đó trộn lại thành mảng đã sắp xếp.",
        },
        search: {
          "Tìm kiếm tuần tự":
            "Tìm kiếm tuần tự (Linear Search) kiểm tra từng phần tử trong mảng cho đến khi tìm thấy giá trị cần tìm.",
          "Tìm kiếm nhị phân":
            "Tìm kiếm nhị phân (Binary Search) tìm kiếm trong mảng đã sắp xếp bằng cách chia đôi mảng và so sánh với giá trị giữa.",
          "Tìm kiếm gần đúng":
            "Tìm kiếm gần đúng tìm các giá trị gần nhất với giá trị cần tìm.",
          "Tìm kiếm theo hàm băm":
            "Tìm kiếm theo hàm băm (Hash Search) sử dụng một hàm băm để tìm kiếm giá trị trong bảng băm.",
          "Tìm kiếm trong danh sách liên kết":
            "Tìm kiếm trong danh sách liên kết kiểm tra từng phần tử trong danh sách cho đến khi tìm thấy giá trị cần tìm.",
        },
      };

      // Sorting algorithms
      function bubbleSort(arr) {
        const steps = [];
        const sorted = [...arr];
        for (let i = 0; i < sorted.length - 1; i++) {
          for (let j = 0; j < sorted.length - i - 1; j++) {
            steps.push({
              description: `So sánh ${sorted[j]} và ${sorted[j + 1]}`,
              array: [...sorted],
            });
            if (sorted[j] > sorted[j + 1]) {
              [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
              steps.push({
                description: `Hoán đổi ${sorted[j]} với ${sorted[j + 1]}`,
                array: [...sorted],
                index1: j,
                index2: j + 1,
              });
            }
          }
        }
        return { sorted, steps };
      }

      function selectionSort(arr) {
        const steps = [];
        const sorted = [...arr];
        for (let i = 0; i < sorted.length; i++) {
          let minIndex = i;
          for (let j = i + 1; j < sorted.length; j++) {
            steps.push({
              description: `So sánh ${sorted[j]} với ${sorted[minIndex]}`,
              array: [...sorted],
            });
            if (sorted[j] < sorted[minIndex]) {
              minIndex = j;
            }
          }
          if (minIndex !== i) {
            [sorted[i], sorted[minIndex]] = [sorted[minIndex], sorted[i]];
            steps.push({
              description: `Hoán đổi ${sorted[i]} với ${sorted[minIndex]}`,
              array: [...sorted],
            });
          }
        }
        return { sorted, steps };
      }

      function insertionSort(arr) {
        const steps = [];
        const sorted = [...arr];
        for (let i = 1; i < sorted.length; i++) {
          const key = sorted[i];
          let j = i - 1;
          while (j >= 0 && sorted[j] > key) {
            sorted[j + 1] = sorted[j];
            steps.push({
              description: `Di chuyển ${sorted[j]} lên vị trí ${j + 1}`,
              array: [...sorted],
            });
            j--;
          }
          sorted[j + 1] = key;
          steps.push({
            description: `Chèn ${key} vào vị trí ${j + 1}`,
            array: [...sorted],
          });
        }
        return { sorted, steps };
      }

      function mergeSort(arr) {
        const steps = [];

        const merge = (left, right) => {
          const result = [];
          while (left.length && right.length) {
            if (left[0] < right[0]) {
              result.push(left.shift());
            } else {
              result.push(right.shift());
            }
            steps.push({
              description: `Trộn ${left} và ${right} thành ${result}`,
              array: [...result, ...left, ...right], // Mảng hiện tại sau khi trộn
            });
          }
          return result.concat(left).concat(right);
        };

        const sort = (array) => {
          if (array.length <= 1) return array;

          const mid = Math.floor(array.length / 2);
          steps.push({
            description: `Chia mảng thành ${array.slice(
              0,
              mid
            )} và ${array.slice(mid)}`,
            array: [...array], // Mảng hiện tại khi chia
          });

          const left = sort(array.slice(0, mid));
          const right = sort(array.slice(mid));
          const merged = merge(left, right);

          steps.push({
            description: `Hợp nhất ${left} và ${right} thành ${merged}`,
            array: [...merged], // Mảng hiện tại sau khi hợp nhất
          });
          return merged;
        };

        const sorted = sort([...arr]);
        return { sorted, steps };
      }

      // Searching algorithms
      function linearSearch(arr, target) {
        const steps = [];
        const indices = [];
        arr.forEach((value, index) => {
          steps.push(
            `Kiểm tra giá trị ${value} tại chỉ số ${index} (${
              value === target ? "Trùng !" : "Không trùng => bỏ qua"
            })`
          );
          if (value === target) {
            indices.push(index);
          }
        });
        if (indices.length === 0) {
          steps.push(`Không tìm thấy số \`${target}\` trong danh sách.`);
        }
        return { indices, steps };
      }

      function binarySearch(arr, target) {
        const steps = [];
        let left = 0;
        let right = arr.length - 1;
        steps.push(`Danh sách đã sắp xếp là: ${arr.join(", ")}`);
        while (left <= right) {
          const mid = left + Math.floor((right - left) / 2);
          steps.push(`
             Vị trí Mid = ${mid}, giá trị là ${arr[mid]}`);

          if (arr[mid] < target) {
            steps.push(`
                → Giá trị ${arr[mid]} nhỏ hơn ${target}, tiếp tục tìm kiếm bên phải.
           `);
            left = mid + 1;
          } else if (arr[mid] > target) {
            steps.push(`
                → Giá trị ${arr[mid]} lớn hơn ${target}, tiếp tục tìm kiếm bên trái.
            `);
            right = mid - 1;
          } else {
            steps.push(`  - Tìm thấy số ${target} tại chỉ số ${mid}.`);
            return { index: mid, steps };
          }
        }
        steps.push(`  - Không tìm thấy số \${target}\ trong danh sách.`);
        return { index: -1, steps };
      }
      function hashSearch(hashTable, target) {
        const steps = [];
        const index = target % hashTable.length; // Simple hash function
        steps.push(`Tính chỉ số băm cho ${target}: ${index}`);
        if (hashTable[index] !== undefined) {
          steps.push(
            `Kiểm tra phần tử tại chỉ số ${index}: ${hashTable[index]}`
          );
          if (hashTable[index] === target) {
            steps.push(`  - Tìm thấy số ${target} tại chỉ số băm ${index}.`);
            return { index, steps };
          }
          steps.push(
            `  - Không tìm thấy số ${target} tại chỉ số băm ${index}.`
          );
        } else {
          steps.push(`  - Chỉ số băm ${index} không chứa giá trị nào.`);
        }
        return { index: -1, steps };
      }

      function linkedListSearch(linkedList, target) {
        const steps = [];
        let current = linkedList.head;
        let index = 0;

        while (current) {
          steps.push(
            `Kiểm tra giá trị tại chỉ số ${index}: ${current.value} (${
              current.value === target ? "Trùng !" : "Không trùng"
            })`
          );
          if (current.value === target) {
            steps.push(`  - Tìm thấy số ${target} tại chỉ số ${index}.`);
            return { index, steps };
          }
          current = current.next;
          index++;
        }
        steps.push(`  - Không tìm thấy số ${target} trong danh sách liên kết.`);
        return { index: -1, steps };
      }

      // Event handlers for sorting and searching
      document.getElementById("sortButton").onclick = function () {
        const inputData = document
          .getElementById("inputData")
          .value.split(",")
          .map((x) => parseInt(x.trim()));

        if (inputData.some(isNaN)) {
          alert("Vui lòng nhập dãy số hợp lệ.");
          return;
        }

        const algorithm = document.getElementById("algorithmSort").value;
        let result = "";
        let steps = [];

        try {
          if (algorithm === "Sắp xếp chọn") {
            const { sorted, steps: sortSteps } = selectionSort(inputData);
            result = `Dãy số ban đầu: ${inputData.join(
              ", "
            )}<br>Dãy số đã được sắp xếp: ${sorted.join(", ")}`;
            steps = sortSteps;
          } else if (algorithm === "Sắp xếp nổi bọt") {
            const { sorted, steps: sortSteps } = bubbleSort(inputData);
            result = `Dãy số ban đầu: ${inputData.join(
              ", "
            )}<br>Dãy số đã được sắp xếp: ${sorted.join(", ")}`;
            steps = sortSteps;
          } else if (algorithm === "Sắp xếp chèn") {
            const { sorted, steps: sortSteps } = insertionSort(inputData);
            result = `Dãy số ban đầu: ${inputData.join(
              ", "
            )}<br>Dãy số đã được sắp xếp: ${sorted.join(", ")}`;
            steps = sortSteps;
          } else if (algorithm === "Sắp xếp trộn") {
            const { sorted, steps: sortSteps } = mergeSort(inputData);
            result = `Dãy số ban đầu: ${inputData.join(
              ", "
            )}<br>Dãy số đã được sắp xếp: ${sorted.join(", ")}`;
            steps = sortSteps;
          }
        } catch (error) {
          console.error("Lỗi trong quá trình sắp xếp:", error);
          alert("Đã xảy ra lỗi. Vui lòng kiểm tra đầu vào.");
          return;
        }

        // Cập nhật mảng đã sắp xếp để tìm kiếm
        sortedArr = inputData;

        // Tạo bảng hiển thị các bước sắp xếp

        let stepsHtml = `<table><tr><th>Bước</th><th>Mảng mới</th><th>Mô tả</th></tr>`;
        steps.forEach((step, index) => {
          const stepNumber = index + 1;
          const newArray = step.array
            ? step.array.join(", ")
            : "Không có thay đổi";
          stepsHtml += `<tr><td>${stepNumber}</td><td>${newArray}</td><td>${
            step.description || "Không có mô tả"
          }</td></tr>`;
        });
        stepsHtml += `</table>`;

        // Thêm thẻ mô tả thuật toán
        const algorithmDescription = `
    <div style="display: flex; align-items: center; margin-top: 30px; margin-bottom: 30px; justify-content: center">
      <span style="margin-right: 10px;">${algorithm}</span>
      <span style="cursor: pointer; color: blue;" onclick="toggleDescription('sort', '${algorithm}')">[+]</span>
    </div>
    <div id="description" style="display: none; margin-top: 5px;">
      <p class="description">${descriptions.sort[algorithm]}</p>
    </div>
  `;

        document.getElementById("resultSort").innerHTML = `
    ${algorithmDescription}
    <strong>${result}</strong>
    <div class="result-content">${stepsHtml}</div>
  `;

        document.getElementById("resultSearch").style.display = "none"; // Ẩn kết quả tìm kiếm
        document.getElementById("resultSort").style.display = "block"; // Hiện kết quả sắp xếp
      };
      // Hàm để hiển thị hoặc ẩn mô tả
      function toggleDescription(type, algorithm) {
        const description = document.getElementById("description");
        const toggleButton = description.previousSibling.lastChild; // Lấy icon
        if (description.style.display === "none") {
          description.style.display = "block";
          toggleButton.innerText = "[-]"; // Đổi dấu cộng thành dấu trừ
        } else {
          description.style.display = "none";
          toggleButton.innerText = "[+]"; // Đổi dấu trừ thành dấu cộng
        }
      }

      // Hàm để hiển thị hoặc ẩn mô tả
      function toggleDescription() {
        const description = document.getElementById("description");
        const toggleButton = description.previousSibling;
        if (description.style.display === "none") {
          description.style.display = "inline";
          toggleButton.innerText = "[-]"; // Đổi dấu cộng thành dấu trừ
        } else {
          description.style.display = "none";
          toggleButton.innerText = "[+]"; // Đổi dấu trừ thành dấu cộng
        }
      }

      document.getElementById("Lookbutton").onclick = function () {
        const inputData = document
          .getElementById("inputData")
          .value.split(",")
          .map((x) => parseInt(x.trim()));
        const target = parseInt(document.getElementById("target").value);
        const algorithm = document.getElementById("algorithmSelect").value;

        const arr = sortedArr.length > 0 ? sortedArr : inputData;
        let result = "";
        let steps = [];

        // Create a simple hash table for demonstration
        const hashTable = Array(10).fill(undefined);
        inputData.forEach((num) => {
          const index = num % hashTable.length;
          hashTable[index] = num; // Simple hash assignment
        });

        // Create a linked list for demonstration
        const linkedList = {
          head: null,
          add(value) {
            const newNode = { value, next: this.head };
            this.head = newNode;
          },
        };
        inputData.forEach((num) => linkedList.add(num));

        if (algorithm === "Tìm kiếm tuần tự") {
          const { indices, steps: searchSteps } = linearSearch(arr, target);
          result =
            indices.length > 0
              ? `Tìm thấy số ${target} ở chỉ số: ${indices.join(", ")}`
              : `Không tìm thấy số ${target}.`;
          steps = searchSteps;
        } else if (algorithm === "Tìm kiếm nhị phân") {
          const { index, steps: searchSteps } = binarySearch(
            arr.sort((a, b) => a - b),
            target
          );
          steps = searchSteps;
          result =
            index !== -1
              ? `Tìm thấy số ${target} tại chỉ số: ${index}`
              : `Không tìm thấy số ${target}.`;
        } else if (algorithm === "Tìm kiếm theo hàm băm") {
          const { index, steps: searchSteps } = hashSearch(hashTable, target);
          steps = searchSteps;
          result =
            index !== -1
              ? `Tìm thấy số ${target} tại chỉ số băm: ${index}`
              : `Không tìm thấy số ${target}.`;
        } else if (algorithm === "Tìm kiếm trong danh sách liên kết") {
          const { index, steps: searchSteps } = linkedListSearch(
            linkedList,
            target
          );
          steps = searchSteps;
          result =
            index !== -1
              ? `Tìm thấy số ${target} tại chỉ số: ${index}`
              : `Không tìm thấy số ${target}.`;
        }

        // Tạo bảng hiển thị các bước tìm kiếm
        let stepsHtml = `<table><tr><th>Bước</th><th>Mô tả</th></tr>`;
        steps.forEach((step, index) => {
          const stepNumber = index + 1;
          stepsHtml += `<tr><td>${stepNumber}</td><td>${step}</td></tr>`;
        });
        stepsHtml += `</table>`;

        const algorithmDescription = `
    <div style="display: flex; align-items: center; margin-top: 30px; margin-bottom: 30px; justify-content: center">
      <span style="margin-right: 10px;">${algorithm}</span>
      <span style="cursor: pointer; color: blue;" onclick="toggleDescription('search', '${algorithm}')">[+]</span>
    </div>
    <div id="description" style="display: none; margin-top: 5px;">
      <p class="description">${descriptions.search[algorithm]}</p>
    </div>
  `;

        document.getElementById(
          "resultSearch"
        ).innerHTML = `<strong>${result}</strong> <div class="result-content">${stepsHtml}</div>`;
        document.getElementById("resultSort").style.display = "none"; // Hide sort results
        document.getElementById("resultSearch").style.display = "block"; // Show search results
      };

      document.getElementById("clearButton").onclick = function () {
        document.getElementById("inputData").value = "";
        document.getElementById("target").value = "";
        document.getElementById("resultSort").innerText = "";
        document.getElementById("resultSearch").innerText = "";
        sortedArr = [];
      };
