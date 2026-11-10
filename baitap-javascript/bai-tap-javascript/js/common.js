// ===== Hàm dùng chung (dùng cho cả 4 bài) =====
const $ = (id) => document.getElementById(id);                        // arrow function
const num = function (id) { return parseFloat($(id).value) || 0; };   // function expression
function fmt(n) { return n.toLocaleString("vi-VN"); }                 // function declaration
function vnd(n) { return fmt(Math.round(n)) + " đ"; }
function usd(n) { return "$" + n.toFixed(2); }

function showTab(i) {
  document.querySelectorAll("section.page").forEach((p, k) => p.classList.toggle("active", k === i));
  document.querySelectorAll("#tabs button").forEach((b, k) => b.classList.toggle("active", k === i));
}

// Vẽ phiếu kết quả: rows = [[nhãn, giá trị], ...]
function showReceipt(id, title, rows, totalLabel, totalValue, extra) {
  let html = "<h3>" + title + "</h3>";
  rows.forEach((r) => { html += '<div class="line"><span>' + r[0] + "</span><b>" + r[1] + "</b></div>"; });
  if (totalLabel) html += '<div class="total"><span>' + totalLabel + "</span><strong>" + totalValue + "</strong></div>";
  $(id).innerHTML = html + (extra || "");
}
function showError(id, title, msg) { $(id).innerHTML = "<h3>" + title + '</h3><p class="err">' + msg + "</p>"; }
