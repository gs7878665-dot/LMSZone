const items = document.querySelectorAll(".item");
const pages = document.querySelectorAll(".page");

// Main Page Navigation
items.forEach((item, index) => {
  item.addEventListener("click", () => {
    items.forEach((i) => {
      i.classList.remove("active");
    });

    pages.forEach((p) => {
      p.style.display = "none";
    });

    item.classList.add("active");
    pages[index].style.display = "block";

    // If navigating back to My Account page, reset to view mode
    if (pages[index].classList.contains("account")) {
      document.getElementById("viewAccountSection").style.display = "block";
      document.getElementById("editAccountSection").style.display = "none";
    }
  });
});

// --- LOCAL STORAGE STATE MANAGEMENT ---
const STORAGE_KEYS = {
  fullName: "lms_profile_fullname",
  email: "lms_profile_email",
  phone: "lms_profile_phone",
  dept: "lms_profile_dept",
  year: "lms_profile_year",
  bio: "lms_profile_bio",
  avatar: "lms_profile_avatar",
  tasks: "lms_profile_tasks_data" // to save checked states
};

// Initialize profile values from localStorage or EJS server defaults
function initProfile() {
  const savedFullName = localStorage.getItem(STORAGE_KEYS.fullName);
  const savedEmail = localStorage.getItem(STORAGE_KEYS.email);
  const savedPhone = localStorage.getItem(STORAGE_KEYS.phone);
  const savedDept = localStorage.getItem(STORAGE_KEYS.dept);
  const savedYear = localStorage.getItem(STORAGE_KEYS.year);
  const savedBio = localStorage.getItem(STORAGE_KEYS.bio);
  const savedAvatar = localStorage.getItem(STORAGE_KEYS.avatar);

  if (savedFullName) {
    updateNameDisplays(savedFullName);
    document.getElementById("inputFullName").value = savedFullName;
  }
  if (savedEmail) {
    document.getElementById("lblEmail").innerText = savedEmail;
    document.getElementById("inputEmail").value = savedEmail;
  }
  if (savedPhone) {
    document.getElementById("lblPhone").innerText = savedPhone;
    document.getElementById("inputPhone").value = savedPhone;
  }
  if (savedDept) {
    document.getElementById("lblDept").innerText = savedDept;
    document.getElementById("inputDept").value = savedDept;
  }
  if (savedYear) {
    document.getElementById("lblYear").innerText = savedYear;
    document.getElementById("inputYear").value = savedYear;
  }
  if (savedBio) {
    document.getElementById("inputBio").value = savedBio;
  }

  // Update dynamic subtitle under profile card
  const dept = savedDept || "Computer Science";
  const year = savedYear || "2nd Year";
  document.getElementById("viewDeptAndYear").innerText = `${dept} - ${year}`;

  // Load avatar if exists
  if (savedAvatar) {
    applyAvatarImage(savedAvatar);
  }
}

function updateNameDisplays(name) {
  document.getElementById("lblFullName").innerText = name;
  document.getElementById("viewName").innerText = name;
  
  // Update username
  const username = "@" + name.toLowerCase().replace(/\s+/g, '') + "123";
  document.getElementById("lblUsername").innerText = username;

  // Update header greetings
  document.querySelectorAll(".user-greeting-name").forEach(el => {
    if (el.tagName === "SPAN") {
      el.innerText = name;
    } else {
      el.innerText = name + " Profile";
    }
  });
}

function applyAvatarImage(base64Data) {
  const viewImg = document.getElementById("viewAvatarImg");
  const editImg = document.getElementById("editAvatarImg");
  
  viewImg.src = base64Data;
  viewImg.style.display = "block";
  
  editImg.src = base64Data;
  editImg.style.display = "block";

  // Hide the initial letter overlays
  document.querySelectorAll(".avatar-letter").forEach(el => {
    el.style.display = "none";
  });
}

// --- PROFILE EDIT INTERACTION ---
const toEditBtn = document.getElementById("toEditBtn");
const viewAccountSection = document.getElementById("viewAccountSection");
const editAccountSection = document.getElementById("editAccountSection");
const editProfileForm = document.getElementById("editProfileForm");

if (toEditBtn) {
  toEditBtn.addEventListener("click", () => {
    viewAccountSection.style.display = "none";
    editAccountSection.style.display = "block";
  });
}

if (editProfileForm) {
  editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const newFullName = document.getElementById("inputFullName").value;
    const newEmail = document.getElementById("inputEmail").value;
    const newPhone = document.getElementById("inputPhone").value;
    const newDept = document.getElementById("inputDept").value;
    const newYear = document.getElementById("inputYear").value;
    const newBio = document.getElementById("inputBio").value;

    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.fullName, newFullName);
    localStorage.setItem(STORAGE_KEYS.email, newEmail);
    localStorage.setItem(STORAGE_KEYS.phone, newPhone);
    localStorage.setItem(STORAGE_KEYS.dept, newDept);
    localStorage.setItem(STORAGE_KEYS.year, newYear);
    localStorage.setItem(STORAGE_KEYS.bio, newBio);

    // Update displays
    updateNameDisplays(newFullName);
    document.getElementById("lblEmail").innerText = newEmail;
    document.getElementById("lblPhone").innerText = newPhone;
    document.getElementById("lblDept").innerText = newDept;
    document.getElementById("lblYear").innerText = newYear;
    document.getElementById("viewDeptAndYear").innerText = `${newDept} - ${newYear}`;

    // Return to view mode
    editAccountSection.style.display = "none";
    viewAccountSection.style.display = "block";
  });
}

// --- ASSIGNMENTS FILTER SYSTEM ---
const assignmentTabContainer = document.getElementById("assignmentTabs");
if (assignmentTabContainer) {
  const tabs = assignmentTabContainer.querySelectorAll(".filter-tab");
  const cards = document.querySelectorAll(".assignment-card");
  const countEl = document.getElementById("assignmentsCount");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active-tab"));
      tab.classList.add("active-tab");

      const filterVal = tab.innerText.trim();
      let visibleCount = 0;
      let totalCount = cards.length;

      cards.forEach(card => {
        const cardStatus = card.getAttribute("data-status");
        if (filterVal === "All" || cardStatus === filterVal) {
          card.style.display = "flex";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      if (countEl) {
        countEl.innerText = `Showing ${visibleCount > 0 ? 1 : 0} to ${visibleCount} of ${totalCount} assignments`;
      }
    });
  });
}

// --- PHOTO UPLOAD MODAL INTERACTIONS ---
const uploadModal = document.getElementById("uploadModal");
const openUploadBtn = document.getElementById("openUploadBtn");
const closeUploadBtn = document.getElementById("closeUploadBtn");
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");

if (openUploadBtn && uploadModal) {
  openUploadBtn.addEventListener("click", () => {
    uploadModal.style.display = "flex";
  });
}

if (closeUploadBtn && uploadModal) {
  closeUploadBtn.addEventListener("click", () => {
    uploadModal.style.display = "none";
  });
}

// Close modal if clicked outside content box
if (uploadModal) {
  uploadModal.addEventListener("click", (e) => {
    if (e.target === uploadModal) {
      uploadModal.style.display = "none";
    }
  });
}

// Drag and drop zone interactions
if (dropzone && fileInput) {
  dropzone.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    handleFile(file);
  });

  // Drag over/leave highlighting
  ["dragenter", "dragover"].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "#2563eb";
      dropzone.style.backgroundColor = "rgba(59, 130, 246, 0.04)";
    }, false);
  });

  ["dragleave", "drop"].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "#334155";
      dropzone.style.backgroundColor = "rgba(255, 255, 255, 0.01)";
    }, false);
  });

  dropzone.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    handleFile(file);
  });
}

const taskFormModal = document.getElementById("taskFormModal");
const addTaskButton = document.getElementById("addTaskButton");
const closeTaskForm = document.getElementById("closeTaskForm");

if (addTaskButton && taskFormModal) {
  addTaskButton.addEventListener("click", () => {
    taskFormModal.style.display = "flex";
  });
}

if (closeTaskForm && taskFormModal) {
  closeTaskForm.addEventListener("click", () => {
    taskFormModal.style.display = "none";
  });
}

if (taskFormModal) {
  taskFormModal.addEventListener("click", (e) => {
    if (e.target === taskFormModal) {
      taskFormModal.style.display = "none";
    }
  });
}

function handleFile(file) {
  if (!file) return;

  // Validate type
  if (!file.type.match("image/png") && !file.type.match("image/jpeg")) {
    alert("Please select a PNG or JPG file.");
    return;
  }

  // Validate size (2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert("File is too large. Max size is 2MB.");
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const base64Data = reader.result;
    applyAvatarImage(base64Data);
    localStorage.setItem(STORAGE_KEYS.avatar, base64Data);
    uploadModal.style.display = "none";
  };
}

// Run startup initialization
document.addEventListener("DOMContentLoaded", () => {
  initProfile();
  
  // Re-trigger current active tab filters to set initial visibility lists correctly
  if (assignmentTabContainer) {
    const activeTab = assignmentTabContainer.querySelector(".filter-tab.active-tab");
    if (activeTab) activeTab.click();
  }
});

