document.getElementById('toggleTwoProducts').addEventListener('click', function(event) {
    event.preventDefault();
    // Masukkan fungsi yang ingin dijalankan di sini
    console.log('Button was clicked!');
});


document.addEventListener('DOMContentLoaded', function() {
// Menyembunyikan elemen secara default
toggleVisibility('.hide-2-product', true);
toggleVisibility('.hide-3-product', true);

function toggleVisibility(selector, hide) {
    document.querySelectorAll(selector).forEach(function(element) {
        element.style.display = hide ? 'none' : 'block';
    });
}

// Toggle product function
function toggleProducts(target, shouldShow) {
    document.querySelectorAll(target).forEach(function(element) {
        element.style.display = shouldShow ? 'block' : 'none';
    });
}

// Event listeners for buttons
const btnTwoProducts = document.getElementById('toggleTwoProducts');
const btnThreeProducts = document.getElementById('toggleThreeProducts');

btnTwoProducts.addEventListener('click', function(event) {
    event.preventDefault();
    const isHidden = document.querySelector('.hide-2-product').style.display === 'none';
    toggleProducts('.hide-2-product', isHidden);

    if (isHidden) { // Show 2 Product
        btnTwoProducts.textContent = "Batalkan 2 Product";
        btnTwoProducts.classList.add('cancel');
    } else { // Hide 2 Product
        btnTwoProducts.textContent = "2 Product";
        btnTwoProducts.classList.remove('cancel');
        toggleProducts('.hide-3-product', false); // Also hide 3 Product
        btnThreeProducts.textContent = "3 Product";
        btnThreeProducts.classList.remove('cancel');
    }
});

btnThreeProducts.addEventListener('click', function(event) {
    event.preventDefault();
    const isHidden = document.querySelector('.hide-3-product').style.display === 'none';
    toggleProducts('.hide-3-product', isHidden);

    if (isHidden) { // Show 3 Product
        btnThreeProducts.textContent = "Batalkan 3 Product";
        btnThreeProducts.classList.add('cancel');
        toggleProducts('.hide-2-product', true); // Ensure 2 Product is shown
        btnTwoProducts.textContent = "Batalkan 2 Product";
        btnTwoProducts.classList.add('cancel');
    } else { // Hide 3 Product
        btnThreeProducts.textContent = "3 Product";
        btnThreeProducts.classList.remove('cancel');
    }
});
});










document.addEventListener('DOMContentLoaded', function() {
const form = document.querySelector('form');
form.onsubmit = function(event) {
event.preventDefault(); // Menghentikan form dari submit biasa

// Membuat FormData object dari form
const formData = new FormData(form);
const searchParams = new URLSearchParams();

for (const pair of formData) {
  searchParams.append(pair[0], pair[1]);
}

// Melakukan request POST
fetch(form.action, {
  method: 'POST',
  body: searchParams,
})
.then(response => response.json())
.then(data => {
  // Menampilkan popup notifikasi dengan ID baru dan fitur copy
  if (data.result === 'success') {
    const id = data.id;
    const popup = document.createElement('div');
    popup.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; border: 1px solid #ccc; padding: 20px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); z-index: 1000;">
        <p>Data Berhasil Di Submit!</p>
        <p>ID: <strong id="popup-id">${id}</strong></p>
        <button id="copy-id-button" style="background-color: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 16px; margin-right: 10px; margin-bottom: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: background-color 0.3s ease;">
        Copy ID
      </button>
      <br />
      <button id="close-popup" style="background-color: #f44336; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: background-color 0.3s ease;">
        Close
      </button>
      </div>
      
    `;

    document.body.appendChild(popup);

    // Event listener untuk copy ID
    document.getElementById('copy-id-button').onclick = function() {
      const idElement = document.getElementById('popup-id');
      const range = document.createRange();
      range.selectNode(idElement);
      window.getSelection().removeAllRanges(); // Clear current selection
      window.getSelection().addRange(range); // Select the text
      try {
        document.execCommand('copy'); // Copy selected text to clipboard
        alert('ID berhasil disalin ke clipboard!');
      } catch (err) {
        alert('Gagal menyalin ID');
      }
      window.getSelection().removeAllRanges(); // Deselect the text
    };

    // Event listener untuk close popup
    document.getElementById('close-popup').onclick = function() {
      document.body.removeChild(popup);
    };
  } else {
    alert('Error: ' + data.error);
  }

  // Reset form atau update UI sesuai kebutuhan
  form.reset();
})
.catch(error => {
  console.error('Error:', error);
  alert('Submission failed!');
});
};
});







    document.addEventListener('DOMContentLoaded', function() {
      const form = document.querySelector('form'); // Mengganti 'form' dengan ID atau class spesifik jika perlu
      const submitButton = document.querySelector('button[type="submit"]');

      form.addEventListener('submit', function(event) {
        submitButton.disabled = true; // Menonaktifkan tombol submit
        submitButton.textContent = 'Sending...'; // Mengubah teks tombol untuk memberi tahu pengguna bahwa proses sedang berlangsung

        // Jika ingin menambahkan validasi atau logika lain sebelum menonaktifkan tombol, letakkan di sini
      });
    });
    document.addEventListener('DOMContentLoaded', function() {
      fetch('https://script.google.com/macros/s/AKfycbyVj9Ieor594Pkwjw-f3Rfw36AR5-aTCPHg2BfvWkidhUsR73L-QOzlCHLuAHDrl7v8/exec')
        .then(response => response.json())
        .then(data => {

          // Populate the 'product' dropdown with data from column E (product)
          var productSelect = document.getElementById('product');
          data.product.forEach(function(product) {
            // Check if product is not empty or whitespace
            if (product.trim() !== '') {
              var option = document.createElement('option');
              option.value = product;
              option.textContent = product;
              productSelect.appendChild(option);
            }
          });

          // Populate the 'product' dropdown with data from column E (product2)
          var product2Select = document.getElementById('product2');
          data.product2.forEach(function(product2) {
            // Check if product is not empty or whitespace
            if (product2.trim() !== '') {
              var option = document.createElement('option');
              option.value = product2;
              option.textContent = product2;
              product2Select.appendChild(option);
            }
          });

          // Populate the 'product' dropdown with data from column E (product3)
          var product3Select = document.getElementById('product3');
          data.product3.forEach(function(product3) {
            // Check if product is not empty or whitespace
            if (product3.trim() !== '') {
              var option = document.createElement('option');
              option.value = product3;
              option.textContent = product3;
              product3Select.appendChild(option);
            }
          });


          // Populate the 'gift' dropdown with data from column G (gift)
          var giftSelect = document.getElementById('gift');
          data.gift.forEach(function(gift) {
            // Check if gift is not empty or whitespace
            if (gift.trim() !== '') {
              var option = document.createElement('option');
              option.value = gift;
              option.textContent = gift;
              giftSelect.appendChild(option);
            }
          });
          
          // Populate the 'nama_cs' dropdown with data from column A (nama_cs)
          var nama_csSelect = document.getElementById('nama_cs');
          data.nama_cs.forEach(function(nama_cs) {
            // Check if nama_cs is not empty or whitespace
            if (nama_cs.trim() !== '') {
              var option = document.createElement('option');
              option.value = nama_cs;
              option.textContent = nama_cs;
              nama_csSelect.appendChild(option);
            }
          });

          // Populate the 'nama_adv' dropdown with data from column C (nama_adv)
          var nama_advSelect = document.getElementById('nama_adv');
          data.nama_adv.forEach(function(nama_adv) {
            // Check if nama_adv is not empty or whitespace
            if (nama_adv.trim() !== '') {
              var option = document.createElement('option');
              option.value = nama_adv;
              option.textContent = nama_adv;
              nama_advSelect.appendChild(option);
            }
          });
    
          // Populate the 'kabupaten_kota' dropdown with data from column C (kabupaten_kota)
          var kabupatenKotaSelect = document.getElementById('kabupaten_kota');
          data.kabupaten_kota.forEach(function(kabupatenKota) {
            var option = document.createElement('option');
            option.value = kabupatenKota;
            option.textContent = kabupatenKota;
            kabupatenKotaSelect.appendChild(option);
          });

          // Populate the 'nama_adv' dropdown with data from column C (kabupaten_kota)
          var kabupatenKotaSelect = document.getElementById('kabupaten_kota');
          data.kabupaten_kota.forEach(function(kabupatenKota) {
            var option = document.createElement('option');
            option.value = kabupatenKota;
            option.textContent = kabupatenKota;
            kabupatenKotaSelect.appendChild(option);
          });
        })
        .catch(error => console.error('Error:', error));
    });



    function formatPhoneNumber(input) {
        let value = input.value;
      
        // Cek jika pengguna sedang menghapus karakter (backspace)
        if (event.inputType === "deleteContentBackward") {
          if (value === "62") {
            // Biarkan input kosong jika pengguna menghapus sampai hanya tersisa "62"
            input.value = "";
          }
          return;
        }
      
        // Menghapus semua karakter yang bukan angka
        value = value.replace(/\D/g, '');
      
        // Jika input dimulai dengan '0', hilangkan '0' tersebut
        if (value.startsWith('0')) {
          value = value.substring(1);
        }
      
        // Tambahkan '62' di awal nomor jika belum ada
        if (!value.startsWith('62')) {
          value = '62' + value;
        }
      
        // Perbarui nilai input dengan format yang benar
        input.value = value;
      }

      let warned = false;
      
      function formatRupiah(input) {
        let value = input.value;
      
        // Menghapus semua karakter yang bukan angka
        value = value.replace(/[^,\d]/g, '');
      
        // Menambahkan titik ribuan
        const rupiah = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value.replace(/[^,\d]/g, ''));
      
        // Memperbarui nilai input dengan format Rupiah
        input.value = rupiah.replace("Rp", "Rp ");
      }
      
      function updateTotal() {
        const harga1 = getNumericValue('harga_product'); // Mendapatkan nilai numerik dari harga produk pertama
        const harga2 = getNumericValue('harga_product2'); // Mendapatkan nilai numerik dari harga produk kedua
        const harga3 = getNumericValue('harga_product3'); // Mendapatkan nilai numerik dari harga produk kedua
        const ongkir = getNumericValue('biaya_ongkir');
        const penanganan = getNumericValue('biaya_penanganan');
        const diskon = getNumericValue('diskon_ongkir');
        const total = harga1 + harga2 + harga3 + ongkir + penanganan - diskon; // Menambahkan harga produk kedua ke total
        document.getElementById('total_cod').value = formatRupiahAmount(total); // Memperbarui nilai total COD dengan format Rupiah
      }

      function getNumericValue(elementId) {
        const value = document.getElementById(elementId).value;
        const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0; // Menghapus semua karakter non-numerik dan mengubahnya menjadi integer, atau 0 jika tidak ada angka
        return numericValue;
      }

      function formatRupiahAmount(amount) {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(amount).replace("Rp", "Rp "); // Format angka menjadi format mata uang Indonesia
      }

      
      function showWarning(input) {
        if (!warned) {
          if (confirm('Anda ingin mengedit Total COD? Perubahan akan mengabaikan perhitungan otomatis.')) {
            warned = true;
            input.readOnly = false; // Membiarkan pengguna mengedit
          } else {
            input.blur(); // Menghilangkan fokus dari input jika pengguna membatalkan
          }
        }
      }