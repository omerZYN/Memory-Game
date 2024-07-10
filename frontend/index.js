


let myArray = ["P1", "P2", "P3", "P4", "P5", "P6"];

let doubledArray = myArray.concat(myArray);     // Diziyi iki kere tekrar et






// Diziyi karıştırma fonksiyonu
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/*

Modern JavaScript ve Array.sort() Yöntemi:
Bu yöntem genellikle önerilmez çünkü Math.random() kullanımı deterministik(gelecekteki durumlarının gelişmesinde rastgelelik bulunmaması) olmayan sonuçlar verebilir. Ancak basit bir karıştırma için kullanılabilir.

function sortShuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

*/

/*

Lodash Kütüphanesi ile Karıştırma:
Lodash gibi yardımcı kütüphaneler, karıştırma işlemi için hazır yöntemler sağlar.

const _ = require('lodash');
let array = [1, 2, 3, 4, 5];
_.shuffle(array);

!!!! Fisher-Yates karıştırma algoritmasını temel alır(direkt aynısı)

*/

/*

ES6 ile Karıştırma (Spread Operator):
ES6 spread operatörü ve map fonksiyonunu kullanarak karıştırma yapabilirsiniz.

function es6Shuffle(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

Avantajları:
Basit ve anlaşılır: Kod birkaç satırda ve kolayca anlaşılabilir.
Modern ES6 özelliklerini kullanır: map ve sort gibi fonksiyonları kullanarak yazılır, bu da kodun modern ve temiz görünmesini sağlar.
Dezavantajları:
Performans: Bu yöntem, Fisher-Yates karıştırma algoritmasına kıyasla daha az verimli olabilir. map ve sort işlemleri ekstra bellek ve zaman gerektirir.
Matematiksel doğruluk: Rastgele sayıların dağılımı tamamen rastgele olmadığından, bazı durumlarda mükemmel bir rastgelelik sağlamayabilir.
Sonuç olarak, bu karıştırma algoritması, modern JavaScript özelliklerini kullanarak basit ve etkili bir çözüm sunar, ancak çok büyük diziler için daha verimli algoritmalar (örneğin Fisher-Yates) tercih edilebilir.

!!! 2. bir değer veriyorsun o değer 0 ve 1 arasında daha sonra 2. değere göre sıralayıp 2. değeri yok ediyorsun.



*/

/*

Randomize Index Karıştırma:
Bu yöntem, her elemanın rastgele bir indeksle değiştirilmesi üzerine kuruludur.

function randomizeIndexShuffle(array) {
    for (let i = 0; i < array.length; i++) {
        let randomIndex = Math.floor(Math.random() * array.length);
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
}

!!!!! Çok da bi olayı yok(boşver)

*/





// Diziyi karıştır
shuffleArray(doubledArray);

// Tıklanan elemanları takip etmek için değişkenler
let revealedElements = [];
let foundCount = 0;
let timer;
let startTime;

// Bulunan sayısını güncelleme 
function updateFoundCounter() {
    document.getElementById('foundCounter').textContent = "Bulunan = " + foundCount;
}

// Zamanlayıcıyı güncelleme fonksiyonu
function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    document.getElementById('timer').textContent = "Süre: " + elapsedTime + " saniye";          // yadırıyor
}

// Zamanlayıcıyı başlatma fonksiyonu
function startTimer() {
    startTime = new Date().getTime();
    timer = setInterval(updateTimer, 1000);         //setİnterval her saniye updaateTimer fonksiyonunu çağırıyor
}

// Zamanlayıcıyı durdurma fonksiyonu
function stopTimer() {
    clearInterval(timer);       //clearİnterval, setİntervalı durdurur
}

// Tüm elemanlar kadar div oluştur ve içlerine rastgele elemanları yazdır

// const container = document.getElementById('boxContainer');  !!!! SATIR:163 Değişkene atmak yerine..

doubledArray.forEach((element) => {
    let div = document.createElement('div');
    div.className = 'box';
    div.textContent = '?';
    div.dataset.value = element; // Gerçek değeri data attribute olarak sakla
    div.addEventListener('click', () => {
        // Eğer eleman zaten görünüyorsa bir şey yapma
        if (div.textContent !== '?' || revealedElements.length === 2) return; // (|| veya)
        // ------------------

        // İlk tıklamada zamanlayıcıyı başlat
        if (!timer) {
            startTimer();
        }

        // Tıklanan elemanı göster
        div.textContent = div.dataset.value;
        revealedElements.push(div);

        // Açıkta 2 eleman varsa kontrol et
        if (revealedElements.length === 2) {
            const [first, second] = revealedElements;

            if (first.dataset.value === second.dataset.value) {
                // Eğer 2 eleman aynı değeri gösteriyorsa açık bırak
                revealedElements = [];
                foundCount++;
                updateFoundCounter();
                if (foundCount === 6) {
                    stopTimer();
                }
            } else {
                // Eğer aynı değeri göstermiyorsa kısa bir süre sonra gizle
                setTimeout(() => {
                    first.textContent = '?';
                    second.textContent = '?';
                    revealedElements = [];
                }, 1000); // 1 saniye bekleme süresi
            }
        }
    });
    document.getElementById('boxContainer').appendChild(div);
});