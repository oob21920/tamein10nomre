document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const openBtn = document.getElementById("openBtn");
  const resultH1 = document.getElementById("result");

  openBtn.addEventListener("click", () => {
    openBtn.disabled = true;
    resultH1.textContent = "";

    const formCard = document.createElement("div");
    formCard.id = "formCard";

    const title = document.createElement("h3");
    title.textContent = "فرم اطلاعات کارمند";
    formCard.appendChild(title);

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "نام";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "نام را وارد کنید";

    const familyLabel = document.createElement("label");
    familyLabel.textContent = "نام خانوادگی";
    const familyInput = document.createElement("input");
    familyInput.type = "text";
    familyInput.placeholder = "نام خانوادگی را وارد کنید";

    const degreeLabel = document.createElement("label");
    degreeLabel.textContent = "مدرک تحصیلی";
    const degreeSelect = document.createElement("select");
    const degrees = ["دیپلم", "کاردانی", "کارشناسی", "کارشناسی ارشد", "دکتری"];
    degrees.forEach((d) => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      degreeSelect.appendChild(opt);
    });

    const hoursLabel = document.createElement("label");
    hoursLabel.textContent = "تعداد ساعت کاری در ماه";
    const hoursInput = document.createElement("input");
    hoursInput.type = "number";
    hoursInput.min = "0";
    hoursInput.placeholder = "مثلاً 160";

    const taxLabel = document.createElement("label");
    taxLabel.textContent = "درصد مالیات (٪)";
    const taxInput = document.createElement("input");
    taxInput.type = "number";
    taxInput.min = "0";
    taxInput.max = "100";
    taxInput.placeholder = "مثلاً 10";

    const controlsDiv = document.createElement("div");
    controlsDiv.className = "controls";

    const calcBtn = document.createElement("button");
    calcBtn.type = "button";
    calcBtn.textContent = "محاسبه حقوق";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "بستن فرم";
    closeBtn.style.background = "#e54b4b";
    closeBtn.style.color = "#fff";

    controlsDiv.appendChild(calcBtn);
    controlsDiv.appendChild(closeBtn);

    formCard.appendChild(nameLabel);
    formCard.appendChild(nameInput);
    formCard.appendChild(familyLabel);
    formCard.appendChild(familyInput);
    formCard.appendChild(degreeLabel);
    formCard.appendChild(degreeSelect);
    formCard.appendChild(hoursLabel);
    formCard.appendChild(hoursInput);
    formCard.appendChild(taxLabel);
    formCard.appendChild(taxInput);
    formCard.appendChild(controlsDiv);

    root.appendChild(formCard);

    calcBtn.addEventListener("click", () => {
      const name = nameInput.value.trim();
      const family = familyInput.value.trim();
      const degree = degreeSelect.value;
      const hours = parseFloat(hoursInput.value);
      const tax = parseFloat(taxInput.value);

      if (!name || !family || isNaN(hours) || isNaN(tax)) {
        alert("لطفاً همه فیلدها را به درستی پر کنید.");
        return;
      }

      let rate = 0;
      switch (degree) {
        case "دیپلم":
          rate = 100000;
          break;
        case "کاردانی":
          rate = 120000;
          break;
        case "کارشناسی":
          rate = 150000;
          break;
        case "کارشناسی ارشد":
          rate = 180000;
          break;
        case "دکتری":
          rate = 220000;
          break;
        default:
          rate = 100000;
      }

      const gross = rate * hours;
      const net = gross * (1 - tax / 100);

      resultH1.textContent = `حقوق ${name} ${family} برابر است با ${Math.round(
        net
      ).toLocaleString()} تومان`;
    });

    closeBtn.addEventListener("click", () => {
      formCard.remove();
      resultH1.textContent = "";
      openBtn.disabled = false;
    });
  });
});
