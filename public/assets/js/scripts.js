// ===============================
// SCROLL TO COURSES
// ===============================
function scrollToCourses() {
  const section = document.getElementById("courses");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// ===============================
// STUDENT LOGIN
// ===============================
const studentForm = document.getElementById("studentLoginForm");

if (studentForm) {
  studentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("studentEmail").value;

    try {
      const res = await fetch("/api/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("Server Error");
    }
  });
}

// ===============================
// TUTOR LOGIN
// ===============================
const tutorForm = document.getElementById("tutorLoginForm");

if (tutorForm) {
  tutorForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("tutorEmail").value;

    try {
      const res = await fetch("/api/tutor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("Server Error");
    }
  });
}

// ===============================
// ADMIN LOGIN
// ===============================
const adminForm = document.getElementById("adminLoginForm");

if (adminForm) {
  adminForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        alert("Welcome Admin " + data.username);
        window.location.href = "/admin.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server Error");
    }
  });
}
