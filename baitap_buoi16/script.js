  // ===== Khối 1: Dữ liệu đầu vào =====
  var arr = [];

  function $(id){ return document.getElementById(id); }

  function hienMang(){
    $("mang").innerText = "[ " + arr.join(", ") + " ]";
  }

  function xuat(msg, loi){
    var k = $("ketqua");
    k.innerText = msg;
    k.className = loi ? "err" : "";
  }

  // Tách chuỗi thành mảng số, trả về null nếu có giá trị không hợp lệ
  function tachSo(chuoi, chiNguyen){
    var parts = chuoi.split(/[\s,;]+/);
    var kq = [];
    for (var i = 0; i < parts.length; i++){
      if (parts[i] === "") continue;
      var n = Number(parts[i]);
      if (isNaN(n) || (chiNguyen && !Number.isInteger(n))) return null;
      kq.push(n);
    }
    return kq;
  }

  function themSo(){
    var ds = tachSo($("soNhap").value, true);
    if (ds === null || ds.length === 0){
      xuat("Vui lòng nhập số nguyên hợp lệ.", true);
      return;
    }
    for (var i = 0; i < ds.length; i++) arr.push(ds[i]);
    $("soNhap").value = "";
    hienMang();
    xuat("Đã thêm " + ds.length + " số vào mảng.");
  }

  // ===== Khối 2: Xử lý =====
  function tongDuong(a){
    var s = 0;
    for (var i = 0; i < a.length; i++) if (a[i] > 0) s += a[i];
    return s;
  }
  function demDuong(a){
    var d = 0;
    for (var i = 0; i < a.length; i++) if (a[i] > 0) d++;
    return d;
  }
  function demAm(a){
    var d = 0;
    for (var i = 0; i < a.length; i++) if (a[i] < 0) d++;
    return d;
  }
  function nhoNhat(a){
    var m = a[0];
    for (var i = 1; i < a.length; i++) if (a[i] < m) m = a[i];
    return m;
  }
  function duongNhoNhat(a){
    var m = null;
    for (var i = 0; i < a.length; i++){
      if (a[i] > 0 && (m === null || a[i] < m)) m = a[i];
    }
    return m;
  }
  function chanCuoi(a){
    for (var i = a.length - 1; i >= 0; i--) if (a[i] % 2 === 0) return a[i];
    return -1;
  }
  function laNguyenTo(n){
    if (n < 2) return false;
    for (var i = 2; i * i <= n; i++) if (n % i === 0) return false;
    return true;
  }
  function nguyenToDau(a){
    for (var i = 0; i < a.length; i++) if (laNguyenTo(a[i])) return a[i];
    return -1;
  }
  function sapTang(a){
    // Sắp xếp chọn (selection sort) bằng vòng lặp
    for (var i = 0; i < a.length - 1; i++){
      var min = i;
      for (var j = i + 1; j < a.length; j++) if (a[j] < a[min]) min = j;
      var t = a[i]; a[i] = a[min]; a[min] = t;
    }
  }

  // ===== Khối 3: Hiển thị kết quả =====
  function chayChucNang(f){
    $("boxDoi").classList.toggle("hide", f !== 6);
    $("boxThuc").classList.toggle("hide", f !== 9);

    if (f === 9){ xuat("Hãy nhập mảng số thực ở khung bên trên."); return; }
    if (arr.length === 0){ xuat("Mảng đang rỗng, hãy nhập số trước.", true); return; }

    switch (f){
      case 1: xuat("Tổng các số dương: " + tongDuong(arr)); break;
      case 2: xuat("Số lượng số dương: " + demDuong(arr)); break;
      case 3: xuat("Số nhỏ nhất: " + nhoNhat(arr)); break;
      case 4:
        var m = duongNhoNhat(arr);
        xuat(m === null ? "Mảng không có số dương." : "Số dương nhỏ nhất: " + m);
        break;
      case 5: xuat("Số chẵn cuối cùng: " + chanCuoi(arr)); break;
      case 6: xuat("Nhập 2 vị trí cần đổi chỗ ở khung bên trên."); break;
      case 7:
        sapTang(arr);
        hienMang();
        xuat("Mảng sau khi sắp xếp tăng dần: " + arr.join(", "));
        break;
      case 8: xuat("Số nguyên tố đầu tiên: " + nguyenToDau(arr)); break;
      case 10:
        var d = demDuong(arr), am = demAm(arr);
        if (d > am) xuat("Số dương (" + d + ") nhiều hơn số âm (" + am + ").");
        else if (d < am) xuat("Số âm (" + am + ") nhiều hơn số dương (" + d + ").");
        else xuat("Số dương và số âm bằng nhau (" + d + ").");
        break;
    }
  }

  function doiCho(){
    var v1 = $("viTri1").value, v2 = $("viTri2").value;
    if (v1 === "" || v2 === ""){ xuat("Vui lòng nhập đủ 2 vị trí.", true); return; }
    var i = Number(v1), j = Number(v2);
    var hopLe = function(x){ return Number.isInteger(x) && x >= 0 && x < arr.length; };
    if (!hopLe(i) || !hopLe(j)){
      xuat("Vị trí phải là số nguyên từ 0 đến " + (arr.length - 1) + ".", true);
      return;
    }
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    hienMang();
    xuat("Đã đổi chỗ vị trí " + i + " và " + j + ": " + arr.join(", "));
  }

  function demNguyenTrongThuc(){
    var ds = tachSo($("soThuc").value, false);
    if (ds === null || ds.length === 0){
      xuat("Vui lòng nhập mảng số thực hợp lệ.", true);
      return;
    }
    var d = 0;
    for (var i = 0; i < ds.length; i++) if (Number.isInteger(ds[i])) d++;
    xuat("Mảng thực [" + ds.join(", ") + "] có " + d + " số nguyên.");
  }

  // ===== Gắn sự kiện =====
  $("btnThem").onclick = themSo;
  $("soNhap").onkeydown = function(e){ if (e.key === "Enter") themSo(); };
  $("btnXoa").onclick = function(){ arr = []; hienMang(); xuat("Đã xóa mảng."); };
  $("btnDoi").onclick = doiCho;
  $("btnDem").onclick = demNguyenTrongThuc;
  var nut = document.querySelectorAll(".grid button");
  for (var k = 0; k < nut.length; k++){
    nut[k].onclick = function(){ chayChucNang(Number(this.getAttribute("data-f"))); };
  }
