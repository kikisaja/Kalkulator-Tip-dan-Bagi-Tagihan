document.addEventListener("DOMContentLoaded", function () {
    // 1. Ambil Elemen Input
    const billInput = document.getElementById("billInput");
    const tipSlider = document.getElementById("tipSlider");
    const tipVal = document.getElementById("tipVal");
    const tipButtons = document.querySelectorAll(".btn-tip");
    const peopleInput = document.getElementById("peopleInput");
    const btnDecrement = document.getElementById("btnDecrement");
    const btnIncrement = document.getElementById("btnIncrement");

    // 2. Ambil Elemen Hasil Output
    const tipPerPerson = document.getElementById("tipPerPerson");
    const totalPerPerson = document.getElementById("totalPerPerson");
    const totalTip = document.getElementById("totalTip");
    const grandTotal = document.getElementById("grandTotal");
    const btnReset = document.getElementById("btnReset");

    // Format angka ke format mata uang Rupiah
    function formatRupiah(amount) {
        return "Rp " + Math.round(amount).toLocaleString("id-ID");
    }

    // 3. Fungsi Utama Kalkulasi
    function calculateSplit() {
        const bill = parseFloat(billInput.value) || 0;
        const tipPercent = parseFloat(tipSlider.value) || 0;
        const people = parseInt(peopleInput.value) || 1;

        // Hitung total tip dan total keseluruhan
        const tipAmount = bill * (tipPercent / 100);
        const totalAmount = bill + tipAmount;

        // Hitung pembagian per orang
        const tipPerPersonVal = tipAmount / people;
        const totalPerPersonVal = totalAmount / people;

        // Tampilkan hasil ke DOM
        tipVal.textContent = `${tipPercent}%`;
        tipPerPerson.textContent = formatRupiah(tipPerPersonVal);
        totalPerPerson.textContent = formatRupiah(totalPerPersonVal);
        totalTip.textContent = formatRupiah(tipAmount);
        grandTotal.textContent = formatRupiah(totalAmount);
    }

    // 4. Event Listener untuk Input Bill & Slider
    billInput.addEventListener("input", calculateSplit);
    
    tipSlider.addEventListener("input", function () {
        // Hapus kelas aktif tombol jika slider digeser manual
        tipButtons.forEach(btn => btn.classList.remove("active"));
        calculateSplit();
    });

    // 5. Event Listener untuk Tombol Preset Tip
    tipButtons.forEach(button => {
        button.addEventListener("click", function () {
            tipButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const selectedTip = this.getAttribute("data-tip");
            tipSlider.value = selectedTip;
            calculateSplit();
        });
    });

    // 6. Kontrol Tambah/Kurang Jumlah Orang
    btnIncrement.addEventListener("click", function () {
        peopleInput.value = parseInt(peopleInput.value) + 1;
        calculateSplit();
    });

    btnDecrement.addEventListener("click", function () {
        if (parseInt(peopleInput.value) > 1) {
            peopleInput.value = parseInt(peopleInput.value) - 1;
            calculateSplit();
        }
    });

    // 7. Fitur Reset
    btnReset.addEventListener("click", function () {
        billInput.value = "100000";
        tipSlider.value = "10";
        peopleInput.value = "2";

        tipButtons.forEach(btn => btn.classList.remove("active"));
        tipButtons[1].classList.add("active"); // Set default ke 10%

        calculateSplit();
    });

    // Jalankan kalkulasi pertama kali
    calculateSplit();
});
