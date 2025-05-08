function havaDurumuCek() {
  const yer = document.getElementById('yerGir').value.trim();
  const spinner = document.getElementById('yukleniyorSpinner'); // Api sonucu beklerken yükleniyor gözükmesi için
  
  if (!yer) { // Yer girilmediyse
    alert('Lütfen bir yer adı girin.');
    return;
  }
  
  const apiUrl = `https://wttr.in/${yer}?format=j1`; // Hava durumu apisi json formatında
  
  // Spinnerı göster sonucu gizle
  spinner.style.display = 'block';
  document.getElementById('havaDurumuSonuc').style.display = 'none';
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
    // Örnek Api Resp için = https://wttr.in/Ankara?format=j1
    const alan = data.nearest_area[0].areaName[0].value;
    const bolge = data.nearest_area[0].region[0].value;
    const ulke = data.nearest_area[0].country[0].value;
    const suan = data.current_condition[0];
    const havaDurumu = suan.lang_tr[0].value; // Türkçe havadurumu bilgisi lang_tr json yeri ingilizce jsonda weatherDesc olarak geçiyo
    const sicaklikC = suan.temp_C;
    const hissedilenC = suan.FeelsLikeC;
    const nem = suan.humidity;
    const ruzgarKmph = suan.windspeedKmph;
    const ruzgarYonu = suan.winddir16Point;

    document.getElementById('lokasyon').textContent = `📍 ${alan}, ${bolge}, ${ulke}`;
    document.getElementById('aciklama').textContent = `🌤️ Durum: ${havaDurumu}`;
    document.getElementById('sicaklik').textContent = `🌡️ Sıcaklık: ${sicaklikC}°C`;
    document.getElementById('hissedilenP').textContent = `🤔 Hissedilen: ${hissedilenC}°C`;
    document.getElementById('nemP').textContent = `💧 Nem: ${nem}%`;
    document.getElementById('ruzgarP').textContent = `💨 Rüzgar: ${ruzgarKmph} km/h ${ruzgarYonu}`;

    document.getElementById('havaDurumuSonuc').style.display = 'block';
  })
  .catch(error => {
    // api error verirse
    console.error('Hata:', error);
    alert('Hava durumu alınamadı. Lütfen tekrar deneyin.');
  })
  .finally(() => {
    spinner.style.display = 'none'; // Spinnerı her durumda gizle
  });
}