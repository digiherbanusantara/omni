document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const submitButton = document.querySelector('button[type="submit"]');
  let isSubmitting = false; // Variabel untuk melacak status submit

  // Sembunyikan elemen secara default
  toggleVisibility('.hide-2-product', true);
  toggleVisibility('.hide-3-product', true);

  // Event listener untuk tombol toggle
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

  // Event listener untuk submit form
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Menghentikan form dari submit biasa

    if (isSubmitting) return; // Jika sudah dalam proses submit, hentikan

    isSubmitting = true; // Tandai bahwa submit sedang berlangsung
    submitButton.disabled = true; // Menonaktifkan tombol submit
    submitButton.textContent = 'Sending...'; // Mengubah teks tombol untuk memberi tahu pengguna bahwa proses sedang berlangsung

    // Lakukan submit data
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        // Tampilkan modal sukses
        showSuccessModal(data.id);
      } else {
        alert('Error: ' + data.error);
        resetSubmitButton();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Submission failed!');
      resetSubmitButton();
    });
  });

  // Fungsi untuk menampilkan modal sukses
  function showSuccessModal(id) {
    const modalHTML = `
      <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Submit Success</h5>
              <span aria-hidden="true" data-dismiss="modal" style="cursor: pointer;">&times;</span>
            </div>
            <div class="modal-body">
              <p>Data has been successfully submitted!</p>
              <p>ID: <strong id="popup-id">${id}</strong></p>
            </div>
            <div class="modal-footer">
              <button id="copy-id-button" class="btn btn-success">Copy ID</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Menampilkan modal
    $('#successModal').modal('show');

    // Event listener untuk copy ID
    document.getElementById('copy-id-button').onclick = function() {
      const idElement = document.getElementById('popup-id');
      const range = document.createRange();
      range.selectNode(idElement);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      try {
        document.execCommand('copy');
        alert('ID berhasil disalin ke clipboard!');
      } catch (err) {
        alert('Gagal menyalin ID');
      }
      window.getSelection().removeAllRanges();
    };

    // Event listener untuk close modal
    $('#successModal').on('hidden.bs.modal', function () {
      $('#successModal').remove(); // Menghapus modal dari DOM setelah ditutup
      resetSubmitButton(); // Mengaktifkan kembali tombol submit setelah modal ditutup
    });

    form.reset(); // Reset form jika perlu
  }

  // Fungsi untuk mengaktifkan kembali tombol submit dan mereset teksnya
  function resetSubmitButton() {
    submitButton.disabled = false;
    submitButton.textContent = 'Submit';
    isSubmitting = false; // Reset status submit
  }

  // Fungsi untuk toggle visibility
  function toggleVisibility(selector, hide) {
    document.querySelectorAll(selector).forEach(function(element) {
      element.style.display = hide ? 'none' : 'block';
    });
  }

  // Fungsi untuk toggle produk
  function toggleProducts(target, shouldShow) {
    document.querySelectorAll(target).forEach(function(element) {
      element.style.display = shouldShow ? 'block' : 'none';
    });
  }

  // Populate dropdowns (asynchronous request)
  fetch('https://script.google.com/macros/s/AKfycbyVj9Ieor594Pkwjw-f3Rfw36AR5-aTCPHg2BfvWkidhUsR73L-QOzlCHLuAHDrl7v8/exec')
    .then(response => response.json())
    .then(data => {
      populateDropdown('product', data.product);
      populateDropdown('product2', data.product2);
      populateDropdown('product3', data.product3);
      populateDropdown('gift', data.gift);
      populateDropdown('nama_cs', data.nama_cs);
      populateDropdown('nama_adv', data.nama_adv);
      populateDropdown('kabupaten_kota', data.kabupaten_kota);
    })
    .catch(error => console.error('Error:', error));

  // Fungsi untuk populate dropdown
  function populateDropdown(elementId, items) {
    const selectElement = document.getElementById(elementId);
    items.forEach(function(item) {
      if (item.trim() !== '') {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        selectElement.appendChild(option);
      }
    });
  }
});

// Fungsi untuk memformat nomor telepon
function formatPhoneNumber(input) {
  let value = input.value;

  if (event.inputType === "deleteContentBackward") {
    if (value === "62") {
      input.value = "";
    }
    return;
  }

  value = value.replace(/\D/g, '');

  if (value.startsWith('0')) {
    value = value.substring(1);
  }

  if (!value.startsWith('62')) {
    value = '62' + value;
  }

  input.value = value;
}

// Fungsi untuk memformat angka menjadi Rupiah
function formatRupiah(input) {
  let value = input.value;
  value = value.replace(/[^,\d]/g, '');

  const rupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value.replace(/[^,\d]/g, ''));

  input.value = rupiah.replace("Rp", "Rp ");
}

// Fungsi untuk memperbarui total
function updateTotal() {
  const harga1 = getNumericValue('harga_product');
  const harga2 = getNumericValue('harga_product2');
  const harga3 = getNumericValue('harga_product3');
  const ongkir = getNumericValue('biaya_ongkir');
  const penanganan = getNumericValue('biaya_penanganan');
  const diskon = getNumericValue('diskon_ongkir');
  const total = harga1 + harga2 + harga3 + ongkir + penanganan - diskon;
  document.getElementById('total_cod').value = formatRupiahAmount(total);
}

// Fungsi untuk mendapatkan nilai numerik dari elemen
function getNumericValue(elementId) {
  const value = document.getElementById(elementId).value;
  return parseInt(value.replace(/[^0-9]/g, '')) || 0;
}

// Fungsi untuk memformat angka dalam format Rupiah
function formatRupiahAmount(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace("Rp", "Rp ");
}

// Fungsi untuk menampilkan peringatan saat mengedit total COD
let warned = false;

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
