// ===============================
// CLASS CLICK
// ===============================
function openClass(className) {
  localStorage.setItem("selectedClass", className);
  window.location.href = "board.html";
}

// ===============================
// BOARD CLICK
// ===============================
function selectBoard(board) {
  localStorage.setItem("selectedBoard", board);
  window.location.href = "subject.html";
}

// ===============================
// SUBJECT CLICK
// ===============================
function openSubject(subject) {
  localStorage.setItem("selectedSubject", subject);
  window.location.href = "resources.html";
}

// ===============================
// CHECK PAID ACCESS
// ===============================
async function checkAccess() {
  const email = localStorage.getItem("studentEmail");

  if (!email) {
    alert("Please Login First");
    window.location.href = "index.html";
    return;
  }

  const res = await fetch("/api/student/checkAccess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  if (!data.access) {
    alert("Access Denied. Please Complete Payment.");
    window.location.href = "payment.html";
  }
}
