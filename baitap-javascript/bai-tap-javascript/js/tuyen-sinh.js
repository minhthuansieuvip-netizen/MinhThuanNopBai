// ===== BÀI 1: TUYỂN SINH =====
function calcAdmission() {
  // Khối 1: nhập
  const std = num("stdScore");
  const scores = [num("s1"), num("s2"), num("s3")];
  const areaPoint = { A: 2, B: 1, C: 0.5, X: 0 }[$("area").value];
  const objPoint = { 0: 0, 1: 2.5, 2: 1.5, 3: 1 }[$("object").value];
  // Khối 2: xử lý
  const sum3 = scores[0] + scores[1] + scores[2];
  const total = sum3 + areaPoint + objPoint;
  const hasZero = scores.some((s) => s === 0);
  const pass = total >= std && !hasZero;
  // Khối 3: xuất
  const reason = hasZero ? "Có môn bị điểm 0." : (pass ? "Tổng điểm đạt điểm chuẩn." : "Tổng điểm thấp hơn điểm chuẩn.");
  showReceipt("admOut", "Kết quả xét tuyển", [
    ["Tổng điểm 3 môn", sum3], ["Điểm ưu tiên khu vực", areaPoint], ["Điểm ưu tiên đối tượng", objPoint], ["Điểm chuẩn", std]
  ], "Tổng điểm", total,
  '<div class="stamp ' + (pass ? "ok" : "bad") + '">' + (pass ? "ĐẬU" : "RỚT") + '</div><p class="note">' + reason + "</p>");
}
