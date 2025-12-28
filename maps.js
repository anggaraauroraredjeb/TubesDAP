document.addEventListener('DOMContentLoaded', function() {
    
    const btnRoute = document.getElementById('btnGetRoute');
    const statusText = document.getElementById('location-status');

    // Koordinat Museum Kota Bandung (Tujuan)
    const museumLat = -6.910230; 
    const museumLng = 107.607690;

    btnRoute.addEventListener('click', function() {
        
        // Cek apakah browser mendukung Geolocation
        if (!navigator.geolocation) {
            statusText.textContent = "Browser Anda tidak mendukung deteksi lokasi.";
            return;
        }

        statusText.textContent = "Sedang mendeteksi lokasi Anda...";
        btnRoute.disabled = true; // Matikan tombol sementara

        navigator.geolocation.getCurrentPosition(
            // SUKSES: Jika lokasi ditemukan
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                statusText.textContent = "Lokasi ditemukan! Membuka peta...";

                // Membuka Google Maps dengan parameter rute:
                // saddr = Source Address (Lokasi User)
                // daddr = Destination Address (Museum)
                const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${museumLat},${museumLng}&travelmode=driving`;
                
                // Buka di tab baru
                window.open(url, '_blank');

                // Reset tombol
                btnRoute.disabled = false;
                statusText.textContent = "";
            },
            // ERROR: Jika user menolak atau gagal
            (error) => {
                btnRoute.disabled = false;
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        statusText.textContent = "Izin lokasi ditolak. Silakan buka Google Maps manual.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        statusText.textContent = "Informasi lokasi tidak tersedia.";
                        break;
                    case error.TIMEOUT:
                        statusText.textContent = "Waktu permintaan habis.";
                        break;
                    default:
                        statusText.textContent = "Terjadi kesalahan yang tidak diketahui.";
                        break;
                }
                
                // Fallback: Jika gagal, buka Google Maps biasa ke lokasi museum
                setTimeout(() => {
                    window.open(`https://www.google.com/maps/search/?api=1&query=${museumLat},${museumLng}`, '_blank');
                }, 2000);
            }
        );
    });
});