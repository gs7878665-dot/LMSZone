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

// --- PROFILE INITIALIZATION & DISPLAY ---
function initProfile() {
  // Profile values are pre-rendered from the database by EJS on the server side.
}

function applyAvatarImage(base64Data) {
  const viewImg = document.getElementById("viewAvatarImg");
  const editImg = document.getElementById("editAvatarImg");
  
  if (viewImg) {
    viewImg.src = base64Data;
    viewImg.style.display = "block";
  }
  if (editImg) {
    editImg.src = base64Data;
    editImg.style.display = "block";
  }

  // Hide the initial letter overlays
  document.querySelectorAll(".avatar-letter").forEach(el => {
    el.style.display = "none";
  });
}

// --- PROFILE EDIT INTERACTION ---
const toEditBtn = document.getElementById("toEditBtn");
const viewAccountSection = document.getElementById("viewAccountSection");
const editAccountSection = document.getElementById("editAccountSection");

if (toEditBtn) {
  toEditBtn.addEventListener("click", () => {
    viewAccountSection.style.display = "none";
    editAccountSection.style.display = "block";
  });
}

// --- ASSIGNMENTS CRUD MODAL INTERACTIONS ---
const addAssignmentButton = document.getElementById("addAssignmentButton");
const assignmentFormModal = document.getElementById("assignmentFormModal");
const closeAssignmentForm = document.getElementById("closeAssignmentForm");

if (addAssignmentButton && assignmentFormModal) {
  addAssignmentButton.addEventListener("click", () => {
    assignmentFormModal.style.display = "flex";
  });
}

if (closeAssignmentForm && assignmentFormModal) {
  closeAssignmentForm.addEventListener("click", () => {
    assignmentFormModal.style.display = "none";
  });
}

// Edit Assignment Modal
const editAssignmentFormModal = document.getElementById("editAssignmentFormModal");
const closeEditAssignmentForm = document.getElementById("closeEditAssignmentForm");

if (closeEditAssignmentForm && editAssignmentFormModal) {
  closeEditAssignmentForm.addEventListener("click", () => {
    editAssignmentFormModal.style.display = "none";
  });
}

// Event Delegation for Edit Assignment Buttons
document.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-assignment-btn");
  if (editBtn) {
    e.preventDefault();
    const id = editBtn.getAttribute("data-id");
    const title = editBtn.getAttribute("data-title");
    const description = editBtn.getAttribute("data-description");
    const courseId = editBtn.getAttribute("data-course");
    const deadline = editBtn.getAttribute("data-deadline");
    const status = editBtn.getAttribute("data-status");

    const formIdInput = document.getElementById("editAssignmentId");
    const formTitleInput = document.getElementById("editAssignmentTitle");
    const formDescInput = document.getElementById("editAssignmentDesc");
    const formCourseSelect = document.getElementById("editAssignmentCourse");
    const formDeadlineInput = document.getElementById("editAssignmentDeadline");
    const formStatusSelect = document.getElementById("editAssignmentStatus");

    if (formIdInput) formIdInput.value = id || "";
    if (formTitleInput) formTitleInput.value = title || "";
    if (formDescInput) formDescInput.value = description || "";
    if (formCourseSelect) formCourseSelect.value = courseId || "";
    if (formDeadlineInput) formDeadlineInput.value = deadline || "";
    if (formStatusSelect) formStatusSelect.value = status || "Pending";

    if (editAssignmentFormModal) {
      editAssignmentFormModal.style.display = "flex";
    }
  }
});

// Close modals when clicking overlay backgrounds
window.addEventListener("click", (e) => {
  if (e.target === assignmentFormModal) {
    assignmentFormModal.style.display = "none";
  }
  if (e.target === editAssignmentFormModal) {
    editAssignmentFormModal.style.display = "none";
  }
});

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
    const inputAvatar = document.getElementById("inputAvatar");
    if (inputAvatar) {
      inputAvatar.value = base64Data;
    }
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

