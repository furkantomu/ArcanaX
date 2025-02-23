export const DUMMY = [
  {
    imageSource: require('../../assets/card/back.webp'),
    cardTitle: 'Sihirli Kartlar',
    cardDescription:
      'Kartlar, senin sorularına ve içindeki belirsizliklere ışık tutacak; tek yapman gereken, onları açmak ve onların sana anlatmak istediklerine kulak vermek.',
    cardButtonText: 'Tarot Okuma',
    navigation: 'TarotScreen',
  },
  {
    imageSource: require('../../assets/background/numerology.webp'),
    cardTitle: 'Rakamlar, yolunuzu aydınlatsın.',
    cardDescription:
      'Sayılar, kaderin anahtarlarını saklar. Numeroloji sayesinde bu anahtarları bulabilir, hayatının tüm yönlerinde dengeyi ve uyumu yakalayabilirsin.',
    cardButtonText: 'Numeroloji',
    navigation: 'NumerologyScreen',
  },
  // {
  //   imageSource: require('../../assets/background/coffee.webp'),
  //   cardTitle: 'Bir Fincan, Bin Sır.',
  //   cardDescription:
  //     'Kahve falı, bilinçaltının derinliklerine bir pencere açar; her şekil, her iz, sana yolunu gösteren bir işarettir.',
  //   cardButtonText: 'Kahve Falı',
  //   navigation: 'CoffeeScreen',
  // },
  {
    imageSource: require('../../assets/background/ruya_tabiri.webp'),
    cardTitle: 'Rüyalar, bilinçaltının mesajıdır.',
    cardDescription:
      'Rüyalar, bilinçaltının mesajlarıdır. Her sembol, hayatındaki değişimlere ışık tutar. Rüya yorumlarıyla içsel rehberini keşfet, yolunu aydınlat.',
    cardButtonText: 'Rüya Tabiri',
    navigation: 'DreamScreen',
  },
];

export const FAQ = [
  {
    title: '1. Uygulama Nasıl Çalışır?',
    content:
      'Uygulamamız, tarot okuma, numeroloji ve burç yorumları sunan bir platformdur. Kullanıcılar jeton satın alarak çeşitli okumalardan faydalanabilir.',
  },
  {
    title: '2. Üyelik Ücretli mi?',
    content:
      'Hayır, uygulamaya kaydolmak tamamen ücretsizdir. Ancak, bazı premium özelliklere erişmek için jeton satın almanız gerekebilir.',
  },
  {
    title: '3. Tarot Okuması Nasıl Çalışır?',
    content: `
      Uygulamamızda tarot okuması yapmak oldukça basittir:
      
      **Okuma Yöntemini Seçin:**
       Kullanıcı, farklı tarot açılım yöntemlerinden birini seçerek okumaya başlar.
      
      **Sorunuzu Belirleyin:**
      Kullanıcı, aklındaki soruyu yazarak tarot okumasını kişiselleştirebilir. Eğer bir soru yazılmazsa, genel bir açılım yapılır.
      
      **Kartları Çekin:**
      Seçilen yönteme göre belirli sayıda kart çekilir.
      
      **Analiz Başlatılır:**
      Seçilen kartlar yorumlanarak detaylı bir analiz sunulur. Kullanıcı, açılımın anlamını inceleyebilir ve yorumları okuyabilir.
      
      **Analiz Sırasında Soru Sorma:**  
      Analiz sırasında kullanıcı soru sorabilir, ancak bu sorular açılım sorusuna uygun olmalıdır. Başka konularla ilgili sorular cevaplanmaz ve soru hakkı iade edilmez.
      `,
  },
  {
    title: '4. Numeroloji Analizi Nasıl Çalışır?',
    content: `
      **Tam İsim ve Doğum Tarihini Girin:**
      Numeroloji analizi için tam adınızı ve doğum tarihinizi girmeniz gerekir. Doğru analiz için bilgilerinizi eksiksiz ve hatasız girmeniz önemlidir. Yanlış girilen bilgilerle yapılan analizler için jeton iadesi yapılmaz.
      
      **Analiz Sunulur:**
      Elde edilen sonuçlar doğrultusunda kişiliğiniz, güçlü yönleriniz ve hayat yolunuz hakkında detaylı bir analiz sunulur.
      `,
  },
  {
    title: '5. Rüya Tabiri Nasıl Çalışır?',
    content: `
      **Rüyanızı Detaylı Bir Şekilde Yazın:**
      Rüyanızın doğru şekilde yorumlanabilmesi için detaylı ve açık bir şekilde yazmanız gerekir. Ancak, yalnızca rüyanızla bağlantılı sorular sorabilirsiniz. Rüya tabiri dışında başka konularla ilgili sorular yanıtlanmaz ve jeton iadesi yapılmaz.
      
      **Analiz Sunulur:**
      Rüyanızın taşıdığı olası mesajlar ve bilinçaltınızla ilgili anlamlar detaylı bir şekilde açıklanır.
      `,
  },
  {
    title: '6. Yaptığım işlemleri kaydedebilir miyim?',
    content: `
    Evet! Yaptığınız tarot açılımlarını, numeroloji analizlerini ve rüya tabirlerini kaydedebilirsiniz. Kaydetme işlemi sırasında isteğe bağlı olarak bir kayıt ismi girebilirsiniz. Eğer kayıt ismi girilmezse, işlem analiz tarihi ile kaydedilir. Kayıtlı işlemlerinize **Profilim** menüsündeki **Kayıtlı İşlemler** bölümünden ulaşabilirsiniz.`,
  },
  {
    title: '7. Kişisel verilerim güvende mi?',
    content: `
    Evet, girdiğiniz tüm bilgiler gizli tutulur ve yalnızca analizlerinizi gerçekleştirmek için kullanılır. Kişisel verileriniz hiçbir üçüncü tarafla paylaşılmaz.`,
  },
  {
    title: '8. Jetonları Nasıl Satın Alabilirim?',
    content: `
    Jetonları uygulama içinden satın alabilirsiniz. Ödeme seçenekleri arasında:
    **✅ Apple In-App Purchase (Uygulama İçi Satın Alma)**
    **✅ Google Play Billing (Google Play Faturalandırma Sistemi)**

    Satın alma işlemi tamamlandıktan sonra jetonlar hesabınıza otomatik olarak yüklenir. Farklı yöntemlerle jeton satışı yoktur.
    `,
  },
  {
    title: '9. Hesabımı Nasıl Silebilirim?',
    content: `
    **Hesabınızı aşağıdaki yöntemlerle silebilirsiniz:**

    **Uygulama Ayarları:** Profil sekmesinden “Hesabı Sil” butonuna tıklayarak.
    **Destek Ekibi:** Eğer işlemde sorun yaşarsanız, destek ekibi ile iletişime geçerek hesabınızı sildirebilirsiniz.
    `,
  },
];
