// GLOBAL VARIABLES
const resultDiv = document.getElementById("result");
const resultContainer = document.getElementById("result-container");

//CALCULATE FONT SIZE AND LINE HEIGHT FUNC
document
  .getElementById("input_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const maxContainerSize = document.getElementById("max-container").value;
    const minContainerSize = document.getElementById("min-container").value;

    // FONT SIZE INPUTS
    const maxFontSize = document.getElementById("max-font").value;
    const minFontSize = document.getElementById("min-font").value;
    const maxLineHeight = document.getElementById("max-line-height").value;
    const minLineHeight = document.getElementById("min-line-height").value;
    console.log("maxFontSize", maxContainerSize);
    console.log("maxFontSize", minContainerSize);
    console.log("maxFontSize", maxFontSize);

    console.log("minFontSize", minFontSize);
    console.log("maxLineHeight", maxLineHeight);
    console.log("maxFontSize", maxFontSize);
    console.log("minLineHeight", minLineHeight);
    const scalingFactor =
      (maxFontSize - minFontSize) / (maxContainerSize - minContainerSize);
    const lineHeightScalingFactor =
      (maxLineHeight - minLineHeight) / (maxContainerSize - minContainerSize);

    const fontSize = `font-size: clamp(${minFontSize}px, calc(${scalingFactor} * (100vw - ${minContainerSize}px) + ${minFontSize}px), ${maxFontSize}px);`;
    const lineHeight = `line-height: clamp(${minLineHeight}px, calc(${lineHeightScalingFactor} * (100vw - ${minContainerSize}px) + ${minLineHeight}px), ${maxLineHeight}px);`;

    const calculationResult = `<pre
    class=""
  ><code class="language-css">
      ${fontSize}
      ${lineHeight}
      
</code></pre>`;
    resultDiv.innerHTML = calculationResult;
    resultContainer.classList.add("show");
  });

// OPEN AND CLOSE CONTAINER SIDEBAR
document.addEventListener("DOMContentLoaded", function () {
  const savedContainerDisplay = document.querySelector(
    ".saved-container-display"
  );

  const openSidebarButton = document.querySelector(".left-open-arrow");
  const leftSidebar = document.getElementById("size-container-sidebar");
  openSidebarButton.addEventListener("click", function () {
    leftSidebar.classList.toggle("sidebar-open");
  });

  savedContainerDisplay.addEventListener("click", function () {
    leftSidebar.classList.toggle("sidebar-open");
  });
});


// FUNCTION TO DISPLAY SAVED CONTAINER SIZE
const displaySavedContainerSize = () => {
  //Get and set saved container size to inputs and display container
  const savedContainerDisplay = document.querySelector(
    ".saved-container-display"
  );

  const maxContainerSize = localStorage.getItem("maxContainer");
  const minContainerSize = localStorage.getItem("minContainer");
  if (maxContainerSize || minContainerSize) {
    savedContainerDisplay.innerHTML = `Max Container: ${
      maxContainerSize || "Not Found"
    } <br> Min Container: ${minContainerSize}`;
  } else {
    savedContainerDisplay.textContent = "No Saved Container Found";
  }
};

// SET LOCAL STORAGE VALUE TO MAX AND MIN CONTAINER INPUTS
const setInputValue = () => {
  const maxContainerSize = localStorage.getItem("maxContainer");
  const minContainerSize = localStorage.getItem("minContainer");

  if (maxContainerSize) {
    document.getElementById("max-container").value = parseInt(maxContainerSize);
    document.getElementById("max-container-padding").value = parseInt(maxContainerSize);
  }
  if (minContainerSize) {
    document.getElementById("min-container").value = parseInt(minContainerSize);
    document.getElementById("min-container-padding").value = parseInt(minContainerSize);
  }
};

//SAVE OR CHANGE CONTAINER SIZE
document.addEventListener("DOMContentLoaded", function () {
  const containerSizeContainer = document.querySelector(
    ".container-size-container"
  );

  const maxContainerButtons = containerSizeContainer.querySelectorAll(
    ".max-container-size"
  );
  const minContainerButtons = containerSizeContainer.querySelectorAll(
    ".min-container-size"
  );
  //save to local
  function saveContainerSizeToLocalStorage(containerName, containerSize) {
    localStorage.setItem(containerName, containerSize);
    displaySavedContainerSize();
    setInputValue();
  }

  //adding event listeners to all buttons
  minContainerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const containerSize = this.innerText.split(":")[1].trim();
      saveContainerSizeToLocalStorage("minContainer", containerSize);
    });
  });
  //adding event listeners to all buttons
  maxContainerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const containerSize = this.innerText.split(":")[1].trim();
      saveContainerSizeToLocalStorage("maxContainer", containerSize);
    });
  });
});

//HANDLE COPY TO CLIPBOARD
document.getElementById("copyButton").addEventListener("click", function () {
  const resultText = document.querySelector("#result code").innerText;
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = resultText;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  alert("Result copied to clipboard!");
});





// HANDLE RADIO BUTTON CHANGE
document.addEventListener("DOMContentLoaded", function () {
  const handleRadioButtonChange = () => {
    const allSameRadioButton = document.getElementById("all_same");
    const differentXYRadioButton = document.getElementById("different_x_y");
    const allSameInputGroup = document.querySelector(".input-groups-all-same");
    const differentXYInputGroup = document.querySelector(
      ".input-groups-different-xy"
    );

    if (allSameRadioButton.checked) {
      allSameInputGroup.style.display = "flex";
      differentXYInputGroup.style.display = "none";
      resultContainer.classList.remove("show");
    } else if (differentXYRadioButton.checked) {
      allSameInputGroup.style.display = "none";
      differentXYInputGroup.style.display = "flex";
      resultContainer.classList.remove("show");

    }
  };

  document
    .getElementById("all_same")
    .addEventListener("change", handleRadioButtonChange);
  document
    .getElementById("different_x_y")
    .addEventListener("change", handleRadioButtonChange);

  document.querySelector(".input-groups-different-xy").style.display = "none";
});


// DEFAULT CALL
displaySavedContainerSize();
setInputValue();



// Function to calculate padding for "All Same" scenario
function calculatePaddingForAllSame(maxPadding, minPadding, maxContainerSize, minContainerSize) {
  const scalingFactor = (maxPadding - minPadding) / (maxContainerSize - minContainerSize);
  return `padding: clamp(${minPadding}px, calc(${scalingFactor} * (100vw - ${minContainerSize}px) + ${minPadding}px), ${maxPadding}px);`;
}

// Function to calculate padding for "Different X and Y" scenario
function calculatePaddingForDifferentXY(maxPaddingX, minPaddingX, maxPaddingY, minPaddingY, maxContainerSize, minContainerSize) {
  const scalingFactorX = (maxPaddingX - minPaddingX) / (maxContainerSize - minContainerSize);
  const scalingFactorY = (maxPaddingY - minPaddingY) / (maxContainerSize - minContainerSize);
  return `padding: clamp(${minPaddingY}px, calc(${scalingFactorY} * (100vw - ${minContainerSize}px) + ${minPaddingY}px), ${maxPaddingY}px) clamp(${minPaddingY}px, calc(${scalingFactorX} * (100vw - ${minContainerSize}px) + ${minPaddingX}px), ${maxPaddingX}px);`;
}







//GET PADDING CALCULATION
document.addEventListener("DOMContentLoaded", function () {

  const getPaddingBtn = document.getElementById("get-padding-button")

  getPaddingBtn.addEventListener("click", function() {
    const allSameRadioButton = document.getElementById("all_same");

        if (allSameRadioButton.checked) {
      const maxPadding = parseInt(document.getElementById("max-padding").value);
      const minPadding = parseInt(document.getElementById("min-padding").value);
      const maxContainerSize = parseInt(document.getElementById("max-container").value);
      const minContainerSize = parseInt(document.getElementById("min-container").value);
  
      const paddingForAllSame = calculatePaddingForAllSame(maxPadding, minPadding, maxContainerSize, minContainerSize);
  
      const calculationResult = `<pre class="!bg-black !text-white !rounded !m-0 !mt-2 !p-0"><code class="language-css">${paddingForAllSame}</code></pre>`;
      resultDiv.innerHTML = calculationResult;
      resultContainer.classList.add("show");
    } else {
      const maxPaddingX = parseInt(document.getElementById("max-padding-x").value);
      const minPaddingX = parseInt(document.getElementById("min-padding-x").value);
      const maxPaddingY = parseInt(document.getElementById("max-padding-y").value);
      const minPaddingY = parseInt(document.getElementById("min-padding-y").value);
      const maxContainerSize = parseInt(document.getElementById("max-container-padding").value);
      const minContainerSize = parseInt(document.getElementById("min-container-padding").value);
  
      const paddingForDifferentXY = calculatePaddingForDifferentXY(maxPaddingX, minPaddingX, maxPaddingY, minPaddingY, maxContainerSize, minContainerSize);
  
      const calculationResult = `<pre class="!bg-black !text-white !rounded !m-0 !mt-2 !p-0"><code class="language-css">${paddingForDifferentXY}</code></pre>`;
      resultDiv.innerHTML = calculationResult;
      resultContainer.classList.add("show");
    }
  })
  
});
