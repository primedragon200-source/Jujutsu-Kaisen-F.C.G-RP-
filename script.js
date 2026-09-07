const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".panel");

// Переключение вкладок
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    sections.forEach((section) => section.classList.add("hidden"));

    tab.classList.add("active");

    const section = document.getElementById(tab.dataset.section);
    if (section) {
      section.classList.remove("hidden");
    }
  });
});


// =========================
// ГЕНЕРАТОР АНКЕТЫ
// =========================

const generateProfile = document.getElementById("generateProfile");
const profileLoading = document.getElementById("profileLoading");
const profileResult = document.getElementById("profileResult");
const profileText = document.getElementById("profileText");
const copyProfile = document.getElementById("copyProfile");

generateProfile.addEventListener("click", async () => {
  const rank = document.getElementById("rank").value;
  const wish = document.getElementById("characterWish").value.trim();

  profileLoading.classList.remove("hidden");
  profileResult.classList.add("hidden");
  generateProfile.disabled = true;

  try {
    const response = await fetch(`${WORKER_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rank: rank,
        wish: wish
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Ошибка сервера");
    }

    profileText.textContent = data.text || "AI не вернул анкету.";
    profileResult.classList.remove("hidden");

  } catch (error) {
    profileText.textContent =
      "Ошибка: " + (error.message || "Не удалось подключиться к AI.");

    profileResult.classList.remove("hidden");

  } finally {
    profileLoading.classList.add("hidden");
    generateProfile.disabled = false;
  }
});


// Копирование анкеты
copyProfile.addEventListener("click", async () => {
  const text = profileText.textContent;

  try {
    await navigator.clipboard.writeText(text);

    const oldText = copyProfile.textContent;
    copyProfile.textContent = "Скопировано!";

    setTimeout(() => {
      copyProfile.textContent = oldText;
    }, 1500);

  } catch {
    alert("Не удалось скопировать текст.");
  }
});


// =========================
// ПРЕВЬЮ РЕФЕРЕНСА
// =========================

const referenceImage = document.getElementById("referenceImage");
const imagePreview = document.getElementById("imagePreview");

let referenceImageData = null;

referenceImage.addEventListener("change", () => {
  const file = referenceImage.files[0];

  if (!file) {
    referenceImageData = null;
    imagePreview.classList.add("hidden");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    referenceImageData = reader.result;

    imagePreview.src = referenceImageData;
    imagePreview.classList.remove("hidden");
  };

  reader.readAsDataURL(file);
});


// =========================
// ГЕНЕРАТОР ВНЕШНОСТИ
// =========================

const generateAppearance =
  document.getElementById("generateAppearance");

const appearanceLoading =
  document.getElementById("appearanceLoading");

const imageResult =
  document.getElementById("imageResult");

const generatedImage =
  document.getElementById("generatedImage");

const saveImage =
  document.getElementById("saveImage");

generateAppearance.addEventListener("click", async () => {
  const wish =
    document.getElementById("appearanceWish").value.trim();

  appearanceLoading.classList.remove("hidden");
  imageResult.classList.add("hidden");
  generateAppearance.disabled = true;

  try {
    const response = await fetch(`${WORKER_URL}/appearance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        wish: wish,
        referenceImage: referenceImageData
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Ошибка генерации изображения");
    }

    if (!data.image) {
      throw new Error("AI не вернул изображение.");
    }

    generatedImage.src = data.image;
    saveImage.href = data.image;

    imageResult.classList.remove("hidden");

  } catch (error) {
    alert(
      "Ошибка: " +
      (error.message || "Не удалось сгенерировать изображение.")
    );

  } finally {
    appearanceLoading.classList.add("hidden");
    generateAppearance.disabled = false;
  }
});
