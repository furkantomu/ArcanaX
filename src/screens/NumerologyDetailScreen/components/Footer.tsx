import {IconButton} from '@/components';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {getStyles} from '../styles';

type NumerologyDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'NumerologyDetailScreen'
>;

const lifePathDetail = {
  1: "Yaşam yolu 1, bağımsızlık, liderlik ve yenilikçi ruh ile şekillenen bir yoldur. 1'ler, kendi yolunu çizen, cesur ve kararlı bireylerdir. Hep bir adım önde olmak, yenilikler yaratmak ve kendi özgürlüklerini kazanmak isterler. Ancak bu güçlü karakter, bazen yalnızlık ve zorlayıcı sorumluluklarla gelir. 1'ler, içsel güçleriyle zorlukların üstesinden gelirken, kendi yolunu açan öncüler olarak dünyada iz bırakır.",
  2: "Yaşam yolu 2, denge, işbirliği ve hassasiyet ile yönlendirilir. 2'ler, başkalarıyla uyum içinde olmayı, sempatik ve anlayışlı bir yaklaşım benimsemeyi tercih ederler. Zayıf yönleri, bazen fazla fedakâr olabilmeleri ve kendi ihtiyaçlarını ihmal etmeleri olabilir. Ancak, gerçek güçleri, ihtiyaç duyulduğunda destek olma ve barışı sağlama yeteneklerinde yatar. 2'ler, ilişkilerinde derin bağlar kurarak, dünyayı sevgiyle ve huzurla dönüştürürler.",
  3: "Yaşam yolu 3, yaratıcılık, neşe ve kendini ifade etme ile şekillenir. 3'ler, içsel bir enerjiye sahip, özgür ruhlu ve sanatçı kişilerdir. Kendilerini en iyi şekilde ifade edebilecekleri alanlarda parlarken, bazen disiplin eksikliği ve süreklilik sorunları yaşayabilirler. Ancak, en büyük güçleri, pozitif enerjileri ve insanları etkileme yeteneklerinde yatar. 3'ler, etraflarına neşe, ilham ve yaratıcı çözümler sunarak dünyayı güzelleştirirler.",
  4: "Yaşam yolu 4, istikrar, disiplin ve düzen ile şekillenir. 4'ler, sağlam temeller üzerine kurulu, çalışkan ve pratik bireylerdir. Zorluklardan korkmazlar ve hayatta başarıya ulaşmak için azimle çalışırlar. Ancak, bazen katı düşünme ve esneklik eksikliği gibi engellerle karşılaşabilirler. Gerçek güçleri, sistemli bir yaklaşım benimsemeleri ve güvenilir bir temel oluşturmalarındadır. 4'ler, hayatı düzenli bir şekilde inşa ederek, dayanıklı ve güvenilir bir yol açarlar.",
  5: "Yaşam yolu 5, özgürlük, macera ve değişim ile şekillenir. 5'ler, hayatı keşfetmeye, yeni deneyimler yaşamaya ve sürekli değişimden beslenmeye bayılırlar. Esneklikleri, yenilikçi düşünme ve risk alma yetenekleriyle dikkat çekerler. Ancak, bazen kararsızlık ve sürekli değişim nedeniyle istikrar bulmakta zorlanabilirler. Gerçek güçleri, özgürlüklerine sahip çıkma ve hayatı heyecan verici bir şekilde yaşama arzularındadır. 5'ler, değişimlere ayak uydurarak, hayatı ilginç ve farklı bir şekilde şekillendirirler.",
  6: "Yaşam yolu 6, sevgi, sorumluluk ve aile ile şekillenir. 6'lar, başkalarına yardım etmeye ve koruyucu bir rol üstlenmeye bayılırlar. Doğal bir şefkatleri vardır ve sıkça aileleri ya da sevdikleri için fedakarlık yaparlar. Ancak bazen, fazla sorumluluk almak ve kendilerini ihmal etmek gibi sorunlarla karşılaşabilirler. Gerçek güçleri, başkalarına olan derin sevgileri ve dengeli bir yaşam yaratma yeteneklerinde yatar. 6'lar, dünyayı merhametle ve sevgileriyle iyileştirirler.",
  7: "Yaşam yolu 7, derin düşünce, ruhsal arayış ve içsel keşif ile şekillenir. 7'ler, hayatı anlamak, bilgelik arayışında olmak ve gizli gerçekleri keşfetmek isteyen derin düşünen bireylerdir. Sıklıkla yalnızlık ve içe dönüklük eğilimleriyle, duygusal bağlardan çok zihinsel ve spiritüel bağlantılara yönelirler. Ancak, bazen dünya ile uyumsuzluk hissi ve şüphecilik yaşayabilirler. Gerçek güçleri, saf bir arayış ve derin sezgileri ile içsel dünyalarında bulurlar. 7'ler, ruhsal ve entelektüel derinlikleriyle dünyayı daha anlamlı kılarlar.",
  8: "Yaşam yolu 8, güç, başarı ve maddi dünya ile şekillenir. 8'ler, güçlü bir liderlik yeteneği, iş zekâsı ve kararlılık ile dikkat çekerler. Hayatlarında genellikle büyük hedeflere ulaşma, güçlü pozisyonlar elde etme ve maddi başarı sağlama arzusu vardır. Ancak, bazen kontrol takıntısı, iş ile özel yaşam arasındaki dengenin kaybolması ve duygusal izolasyon gibi zorluklarla karşılaşabilirler. Gerçek güçleri, disiplinli çalışma, zor zamanlarda bile kararlılıkla ilerleme ve dünya üzerinde kalıcı bir etki bırakma yeteneklerinde yatar. 8'ler, sadece kendi gücünü değil, aynı zamanda topluma ve iş dünyasına katkı sağlama konusunda da büyük bir potansiyele sahiptirler.",
  9: "Yaşam yolu 9, humanizm, şefkat ve evrensel sevgi ile şekillenir. 9'lar, başkalarına yardım etme, dünyayı iyileştirme ve toplumsal fayda sağlama konusunda derin bir arzuya sahiptirler. Genellikle sanat, maneviyat veya hizmet alanlarında güçlü bir etki bırakırlar. Ancak, zaman zaman duygusal tükenmişlik ve farklılık hissi yaşayabilirler, çünkü sürekli başkalarına verdikleri sevgi ve desteği kendi ihtiyaçlarından önce tutarlar. Gerçek güçleri, evrensel bir bakış açısı ve derin şefkat ile dünyayı daha iyi bir yer yapmak için çabalarıyla ortaya çıkar. 9'lar, merhamet ve fedakârlık ile insanları ve dünyayı dönüştürürler.",
  11: "Yaşam yolu 11, spiritüel farkındalık, ilham ve yüksek vizyon ile şekillenir. 11'ler, derin bir içsel sezgiye sahip, yaratıcı ve yükselmiş bir ruhsal potansiyele sahip insanlardır. Kendilerini genellikle büyük bir misyon veya toplumsal amaç için var olduklarına inandırırlar ve başkalarına ilham verme gücüne sahiptirler. Ancak, duygusal dalgalanmalar, yüksek beklentiler ve bazen içsel karışıklık yaşama eğilimleri olabilir. Gerçek güçleri, yüksek bilinç, spiritüel arayış ve güçlü bir rehberlik sunabilme yeteneklerinde yatar. 11'ler, ilham veren liderler olarak, dünya üzerinde önemli bir değişim yaratma potansiyeline sahiptirler.",
  22: "Yaşam yolu 22, master builder (usta inşaatçı) olarak bilinir ve büyük vizyon, güçlü liderlik ve somut başarı ile şekillenir. 22'ler, devasa projeleri gerçeğe dönüştürebilme kapasitesine sahip, mükemmeliyetçi ve stratejik bireylerdir. Onlar, küçük ölçekli değil, büyük resimlere odaklanarak dünyada kalıcı etkiler yaratmaya çalışırlar. Ancak bu yolda, aşırı yüklenme, baskı altında tükenmişlik ve zaman zaman kendilerini yalnız hissetme gibi zorluklarla karşılaşabilirler. Gerçek güçleri, güçlü kararlılıkları, disiplinli yaklaşımları ve toplum için devrim yaratma konusundaki azimlerinde yatar. 22'ler, insanlık için anlamlı ve kalıcı projeler inşa ederek, dünyayı dönüştüren liderler olabilirler.",
  33: "Yaşam yolu 33, master teacher (usta öğretmen) olarak bilinir ve sevgi, fedakârlık ve toplumsal hizmet ile şekillenir. 33'ler, yüksek bir spiritüel bilgelik ve derin şefkat ile başkalarına rehberlik etme yeteneğine sahiptir. Kendilerini genellikle daha büyük bir amaca adar, başkalarına yardım etmek ve dünyayı daha iyi bir yer haline getirmek için var olduklarına inanırlar. Ancak bu yüksek misyon bazen onları duygusal yükler ve kişisel sıkıntılar ile karşı karşıya bırakabilir. Gerçek güçleri, kendi içsel denge ve huzurlarını bulduğunda, topluma rehberlik etme, sevgiyi yayma ve yükselme potansiyellerinde yatar. 33'ler, sadece duygusal olgunlukları ve güçlü sevgi kapasiteleri ile değil, aynı zamanda insanlık adına yüksek idealler için çalışarak dünyada gerçek bir etki yaratırlar.",
};

const Footer = () => {
  const route = useRoute<NumerologyDetailScreenRouteProp>();
  const {numerologyDetail} = route.params;
  const styles = getStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <View style={styles.footerWrapper}>
        <Text style={styles.description}>
          <Text style={styles.description}>{numerologyDetail.name}: </Text>{' '}
          Yaşam yolu numarası, doğum tarihinizden hesaplanan ve hayatınızdaki
          ana temaları, güçlü yönlerinizi ve zorluklarınızı gösteren bir
          numeroloji kavramıdır. Bu sayı, doğduğunuz günden itibaren sizi
          yönlendiren enerjiyi belirler ve yaşamınızdaki genel yönelimleri,
          kişisel hedefleri ve potansiyeli ortaya çıkarır. Yaşam yolu numarası,
          kim olduğunuzu ve hayat amacınızı anlamada önemli bir rehberdir.
        </Text>
        <Text style={styles.description}>
          {lifePathDetail[numerologyDetail.lifePath]}
        </Text>
        <IconButton
          text="Daha fazla ayrıntı ve derinlemesine analiz için premium içeriğimize
            göz atın!"
          iconName="diamond"
          iconSize={50}
          variant={'primary'}
          handlePress={() =>
            navigation.navigate('NumerologyPremiumScreen', {numerologyDetail})
          }
        />
      </View>
    </View>
  );
};

export default Footer;
