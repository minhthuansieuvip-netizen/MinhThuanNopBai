// ===== BÀI 2: TIỀN ĐIỆN =====
function calcElectric() {
  const name = $("elecName").value.trim();
  const kw = num("elecKw");
  if (!name || kw <= 0) { showError("elecOut", "Hóa đơn tiền điện", "Vui lòng nhập họ tên và số kW lớn hơn 0."); return; }

  const tiers = [["50 kW đầu", 50, 500], ["50 kW kế", 50, 650], ["100 kW kế", 100, 850], ["150 kW kế", 150, 1100], ["Phần còn lại", Infinity, 1300]];
  let left = kw, total = 0;
  const rows = [["Khách hàng", name], ["Tổng tiêu thụ", kw + " kW"]];
  for (const [label, limit, price] of tiers) {
    if (left <= 0) break;
    const used = Math.min(left, limit);
    total += used * price;
    left -= used;
    rows.push([label + " (" + used + " × " + fmt(price) + ")", vnd(used * price)]);
  }
  showReceipt("elecOut", "Hóa đơn tiền điện", rows, "Tiền phải trả", vnd(total));
}
