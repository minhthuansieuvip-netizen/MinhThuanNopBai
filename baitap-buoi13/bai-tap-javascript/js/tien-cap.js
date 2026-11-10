// ===== BÀI 4: TIỀN CÁP =====
function toggleConnections() {
  const isBiz = $("cableType").value === "biz";
  $("cableConn").disabled = !isBiz;
  if (!isBiz) $("cableConn").value = "";
}

function calcCable() {
  const id = $("cableId").value.trim();
  const type = $("cableType").value;
  const conn = num("cableConn");
  const channel = num("cableChannel");
  if (!id || !type) { showError("cableOut", "Hóa đơn cáp", "Vui lòng nhập mã khách hàng và chọn loại khách hàng."); return; }

  let rows, total;
  if (type === "home") {
    total = 4.5 + 20.5 + 7.5 * channel;
    rows = [["Mã khách hàng", id], ["Loại", "Nhà dân"], ["Phí xử lý hóa đơn", usd(4.5)], ["Phí dịch vụ cơ bản", usd(20.5)],
            ["Kênh cao cấp (" + channel + " × $7.50)", usd(7.5 * channel)]];
  } else {
    const extra = conn > 10 ? (conn - 10) * 5 : 0;
    total = 15 + 75 + extra + 50 * channel;
    rows = [["Mã khách hàng", id], ["Loại", "Doanh nghiệp"], ["Phí xử lý hóa đơn", usd(15)], ["Dịch vụ cơ bản (10 kết nối đầu)", usd(75)],
            ["Kết nối thêm (" + Math.max(conn - 10, 0) + " × $5)", usd(extra)], ["Kênh cao cấp (" + channel + " × $50)", usd(50 * channel)]];
  }
  showReceipt("cableOut", "Hóa đơn cáp", rows, "Tổng tiền", usd(total));
}
