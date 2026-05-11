function formatTanggal(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni',
                 'Juli','Agustus','September','Oktober','November','Desember'];
  const hari  = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const tgl   = new Date(y, m - 1, d);
  return `${hari[tgl.getDay()]}, ${d} ${bulan[m - 1]} ${y}`;
}

function hitungUsia(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  const lahir = new Date(y, m - 1, d);
  const today = new Date();
  let usia = today.getFullYear() - lahir.getFullYear();
  const bulanSelisih = today.getMonth() - lahir.getMonth();
  if (bulanSelisih < 0 || (bulanSelisih === 0 && today.getDate() < lahir.getDate())) {
    usia--;
  }
  return usia;
}

function tampilkanData() {
  const nama      = document.getElementById('nama').value.trim();
  const nim       = document.getElementById('nim').value.trim();
  const prodi     = document.getElementById('prodi').value;
  const semester  = document.getElementById('semester').value;
  const kelas     = document.getElementById('kelas').value;
  const tglLahir  = document.getElementById('tgl-lahir').value;
  const tglDaftar = document.getElementById('tgl-daftar').value;

  if (!prodi || !semester || !kelas || !tglLahir || !tglDaftar) {
    alert('Harap lengkapi seluruh data formulir terlebih dahulu!');
    return;
  }

  document.getElementById('out-nama').innerHTML  = nama || '<span style="color:#7070a0">|</span>';
  document.getElementById('out-nim').innerHTML   = nim  || '<span style="color:#7070a0">|</span>';
  document.getElementById('out-prodi').innerHTML    = `<span class="tag purple">${prodi}</span>`;
  document.getElementById('out-semester').innerHTML = `<span class="tag pink">${semester}</span>`;
  document.getElementById('out-kelas').innerHTML    = `<span class="tag teal">${kelas}</span>`;

  const tglLahirFmt  = formatTanggal(tglLahir);
  const tglDaftarFmt = formatTanggal(tglDaftar);
  const usia = hitungUsia(tglLahir);

  document.getElementById('out-tgl-lahir').innerHTML  = `<span class="tag pink">${tglLahirFmt}</span>`;
  document.getElementById('out-tgl-daftar').innerHTML = `<span class="tag teal">${tglDaftarFmt}</span>`;
  document.getElementById('out-usia').innerHTML       = `<span class="tag purple">${usia} Tahun</span>`;

  const flipInner = document.getElementById('flip-inner');
  const flipWrapper = document.getElementById('flip-wrapper');
  
  const backSide = document.querySelector('.flip-back');
  flipWrapper.style.height = backSide.offsetHeight + 'px';
  
  flipInner.classList.add('is-flipped');

  animasiPoin();
}

function kembaliKeForm() {
  const flipInner = document.getElementById('flip-inner');
  const flipWrapper = document.getElementById('flip-wrapper');
  
  const frontSide = document.querySelector('.flip-front');
  flipWrapper.style.height = frontSide.offsetHeight + 'px';
  
  flipInner.classList.remove('is-flipped');
}

function animasiPoin() {
  const total = document.getElementById('pts-total');
  let val = 0;
  const interval = setInterval(() => {
    val += 4;
    if (val >= 100) { val = 100; clearInterval(interval); }
    total.textContent = val;
  }, 20);
}

function resetForm() {
  ['nama','nim','prodi','semester','kelas','tgl-lahir','tgl-daftar'].forEach(id => {
    const el = document.getElementById(id);
    if (el.tagName === 'SELECT') el.selectedIndex = 0;
    else el.value = '';
  });
  document.getElementById('pts-total').textContent = '0';
  kembaliKeForm();
}

window.addEventListener('load', () => {
  const flipWrapper = document.getElementById('flip-wrapper');
  const frontSide = document.querySelector('.flip-front');
  flipWrapper.style.height = frontSide.offsetHeight + 'px';
});
