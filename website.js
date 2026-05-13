// === REGISTER ===
if (document.getElementById('tampilkanBTN')) {
  document.getElementById('tampilkanBTN').onclick = function () {
    var nama = document.getElementById('nama').value.trim();
    if (nama === "") {
      nama = "(Nama Harus Di isi)";
    }
    var gender = "";
    var radios = document.getElementsByName('gender');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        gender = radios[i].value;
        break;
      }
    }
    if (gender === "") {
      gender = "(Mohon Masukkan Jenis Kelamin)";
    }
    var email = document.getElementById('email').value.trim();
    if (email === "") {
      email = "(Email Harus Di isi)";
    }
    var password = document.getElementById('password').value.trim();
    if (password === "") {
      password = "(Password Harus Di isi)";
    }
    var setuju = document.getElementById('setuju').checked ? "ya" : "tidak";
    var hasilText = "Nama: " + nama +
      "\nJenis Kelamin: " + gender +
      "\nEmail: " + email +
      "\nPassword: " + password +
      "\nSetuju: " + setuju;
    document.getElementById('hasil').innerText = hasilText;
  };
}

// === KERANJANG ===
var keranjang = [];

function tambahKeranjang(nama, harga, img) {
  var sudahAda = false;
  for (var i = 0; i < keranjang.length; i++) {
    if (keranjang[i].nama === nama) {
      keranjang[i].qty = keranjang[i].qty + 1;
      sudahAda = true;
      break;
    }
  }
  if (sudahAda === false) {
    keranjang.push({
      nama: nama,
      harga: harga,
      img: img,
      qty: 1
    });
  }
  updateAngka();
  tampilPesan(nama + " masuk keranjang!");
}

function updateAngka() {
  var total = 0;
  for (var i = 0; i < keranjang.length; i++) {
    total = total + keranjang[i].qty;
  }
  var badges = document.getElementsByClassName('cart-angka');
  for (var j = 0; j < badges.length; j++) {
    badges[j].innerText = total;
  }
}

function hapusDariKeranjang(index) {
  keranjang.splice(index, 1);
  updateAngka();
  bukaKeranjang();
}

function bukaKeranjang() {
  var popup = document.getElementById('popup-keranjang');
  var daftar = document.getElementById('daftar-keranjang');
  var footer = document.getElementById('footer-keranjang');

  if (keranjang.length === 0) {
    daftar.innerHTML = '<p style="text-align:center;color:#aaa;padding:30px 0;">Keranjang masih kosong</p>';
    footer.style.display = 'none';
  } else {
    var html = '';
    var totalHarga = 0;
    for (var i = 0; i < keranjang.length; i++) {
      var item = keranjang[i];
      var sub = item.harga * item.qty;
      totalHarga = totalHarga + sub;
      html = html +
        '<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #eee;">' +
          '<img src="' + item.img + '" style="width:50px;height:50px;border-radius:8px;object-fit:cover;">' +
          '<div style="flex:1;">' +
            '<div style="font-size:13px;font-weight:bold;color:#222;">' + item.nama + '</div>' +
            '<div style="font-size:12px;color:#999;">x' + item.qty + '</div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:14px;font-weight:bold;color:#D32F2F;">Rp ' + item.harga + '</div>' +
            '<div style="font-size:11px;color:#999;">Sub: Rp ' + sub + '</div>' +
          '</div>' +
          '<button onclick="hapusDariKeranjang(' + i + ')" style="background:none;border:none;color:red;cursor:pointer;font-size:18px;padding:5px;">' +
            '<i class="fas fa-trash"></i>' +
          '</button>' +
        '</div>';
    }
    daftar.innerHTML = html;
    document.getElementById('total-harga').innerText = 'Rp ' + totalHarga;
    footer.style.display = 'block';
  }

  popup.style.display = 'flex';
}

function tutupKeranjang() {
  document.getElementById('popup-keranjang').style.display = 'none';
}

function checkout() {
  var totalHarga = 0;
  for (var i = 0; i < keranjang.length; i++) {
    totalHarga = totalHarga + (keranjang[i].harga * keranjang[i].qty);
  }
  keranjang = [];
  updateAngka();
  tutupKeranjang();
  tampilPesan("Checkout berhasil! Total Rp " + totalHarga);
}

// === TOAST ===
function tampilPesan(text) {
  var toast = document.getElementById('toast');
  toast.innerText = text;
  toast.style.display = "block";
  setTimeout(function () {
    toast.style.display = "none";
  }, 2000);
}