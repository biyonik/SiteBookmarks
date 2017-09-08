// Formun gönderilip gönderilmediği dinleniyor
document.getElementById("myForm").addEventListener('submit',saveBookmark);

// Kısayolu kaydeder
function saveBookmark(e){
    // Form değerleri alınıyor
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;
    
    if(!validateForm(siteName,siteUrl)) {
        return false;
    }
    // Form değerleri bir obje öğeleri olarak bookmark objesinde ilgili anahtarlara değer dizisi olarak atanıyor
    var bookmark = {
        name:siteName,
        url:siteUrl
    }
    
    // LocalStorage  test
    //localStorage.setItem('test','Merhaba Dünya');
    
    // Eğer bookmark anahtarında bir localStorage öğesi yok ise
    if(localStorage.getItem('bookmarks') === null) {
        // bookmarks dizisine ilgili elemanları bas
        var bookmarks = [];
        // bookmark objesindeki öğeler bookmarks dizisine basılıyor
        bookmarks.push(bookmark);
        // bookmarks anahtarında elemanları bookmarks dizisindeki elemanlar olan bir localStorage öğesi oluşturuluyor
        // JSON.stringify ile dizideki veriler JSON formatına dönüştürülüyor
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        
    } else {
        // Eğer böyle bir localstorage öğesi var ise yapılacak işlemler
        // JSON.parse ile JSON formatında gelen veriler okunuyor
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Bookmark bir diziye ekleniyor
        bookmarks.push(bookmark);
        // Veriler yeniden set ediliyor
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        
    }
    // Form temizleniyor
    document.getElementById('myForm').reset();
    // Sayfa yenileniyor
    window.location.reload();
    // preventDefault fonksiyonu çağrılınca bu elemente ait varsayılan olay çalışmayacaktır
    //console.log("Çalışıyor!");
    e.preventDefault();
}
// Kayıt silen fonksiyon
function deleteBoomark(url) {
    // localStorage içinden bookmark verileri alınıyor
    // JSON.parse ile JSON formatında gelen veriler okunuyor
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var j = 0; j < bookmarks.length; j++) {
        if(bookmarks[j].url == url) {
            bookmarks.splice(j,1);
        }
    }
    // Veriler yeniden set ediliyor
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    // Değişiklikleri görmek için sayfa yenileniyor
    window.location.reload();
}
// Bookmarks verileri alınıyor
function fetchBookmarks() {
    // JSON.parse ile JSON formatında gelen veriler okunuyor
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    var bookmarksResult = document.getElementById('bookmarksResult');
    bookmarksResult.innerHTML = '';
    for(var i = 0; i < bookmarks.length;i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarksResult.innerHTML += '<div class="well" style="height:60px;">'+
                                '<div class="col-lg-4"><span style="font-size:2em; font-weight:bolder;">'+name+'</span></div>'+
                                '<div class="col-lg-3"><a class="btn btn-info" target="_blank" href="'+url+'">Ziyaret Et</a></div>'+
                                '<div class="col-lg-3"><a onclick="deleteBoomark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a></div>'+
                                '</div>'
        //console.log(bookmarks[i].name);
        //console.log(bookmarks[i].url);
    }
    
}

// Doğrulama fonksiyonu
function validateForm(siteName,siteUrl) {
    // Eğer formdan gelen bir veri yok ise
    if(!siteName || !siteUrl) {
        alert("Lütfen tüm alanları doldurunuz");
        return false;
    }
    
    // URL adresinin formatı kontrol ediliyor
    // Eğer format doğru değil ise işlem sonlanır
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)) {
        alert("Girmiş olduğunuz URL adresi formatı geçerli bir format değil");
        return false;
    }
    return true;
}