// ===== BÀI 3: THUẾ THU NHẬP CÁ NHÂN =====
function calcTax() {
  const name = $("taxName").value.trim();
  const income = num("taxIncome") / 1e6;   // triệu
  const dep = num("taxDep");
  if (!name || income <= 0) { showError("taxOut", "Thông báo thuế", "Vui lòng nhập họ tên và tổng thu nhập lớn hơn 0."); return; }

  const taxable = income - 4 - dep * 1.6;
  const brackets = [[60, 5], [120, 10], [210, 15], [384, 20], [624, 25], [960, 30], [Infinity, 35]];
  const rows = [["Họ tên", name], ["Tổng thu nhập năm", vnd(income * 1e6)], ["Giảm trừ bản thân", "4.000.000 đ"],
                ["Giảm trừ " + dep + " người phụ thuộc", vnd(dep * 1.6e6)], ["Thu nhập chịu thuế", vnd(Math.max(taxable, 0) * 1e6)]];
  let tax = 0, prev = 0;
  if (taxable > 0) {
    for (const [top, rate] of brackets) {
      if (taxable > prev) {
        const part = (Math.min(taxable, top) - prev) * rate / 100;
        tax += part;
        rows.push(["Bậc " + rate + "%", vnd(part * 1e6)]);
      }
      prev = top;
    }
  }
  showReceipt("taxOut", "Thông báo thuế", rows, "Thuế phải nộp", vnd(tax * 1e6),
    taxable <= 0 ? '<p class="note">Thu nhập chịu thuế không dương nên không phải nộp thuế.</p>' : "");
}
