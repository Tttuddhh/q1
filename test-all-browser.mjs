// 浏览器全面测试 fonts.ts 中的 _所有_ 字体可渲染性
import { chromium } from 'playwright';

const allFonts = [
  // Google Fonts 中文字体
  { name: 'Noto Sans SC', family: 'Noto Sans SC', googleFontName: 'Noto Sans SC', preview: '思源黑体', category: 'chinese' },
  { name: 'Noto Serif SC', family: 'Noto Serif SC', googleFontName: 'Noto Serif SC', preview: '思源宋体', category: 'chinese' },
  { name: 'Noto Sans TC', family: 'Noto Sans TC', googleFontName: 'Noto Sans TC', preview: '思源黑體', category: 'chinese' },
  { name: 'Noto Serif TC', family: 'Noto Serif TC', googleFontName: 'Noto Serif TC', preview: '思源宋體', category: 'chinese' },
  { name: 'Noto Sans HK', family: 'Noto Sans HK', googleFontName: 'Noto Sans HK', preview: '思源黑體', category: 'chinese' },
  { name: 'Noto Serif HK', family: 'Noto Serif HK', googleFontName: 'Noto Serif HK', preview: '思源宋體', category: 'chinese' },
  { name: 'ZCOOL KuaiLe', family: 'ZCOOL KuaiLe', googleFontName: 'ZCOOL KuaiLe', preview: '站酷快乐体', category: 'chinese' },
  { name: 'ZCOOL XiaoWei', family: 'ZCOOL XiaoWei', googleFontName: 'ZCOOL XiaoWei', preview: '站酷小薇体', category: 'chinese' },
  { name: 'ZCOOL QingKe HuangYou', family: 'ZCOOL QingKe HuangYou', googleFontName: 'ZCOOL QingKe HuangYou', preview: '站酷庆科黄油体', category: 'chinese' },
  { name: 'Ma Shan Zheng', family: 'Ma Shan Zheng', googleFontName: 'Ma Shan Zheng', preview: '马善政毛笔体', category: 'chinese' },
  { name: 'Zhi Mang Xing', family: 'Zhi Mang Xing', googleFontName: 'Zhi Mang Xing', preview: '志莽行书', category: 'chinese' },
  { name: 'Long Cang', family: 'Long Cang', googleFontName: 'Long Cang', preview: '龙苍手写体', category: 'chinese' },
  { name: 'Liu Jian Mao Cao', family: 'Liu Jian Mao Cao', googleFontName: 'Liu Jian Mao Cao', preview: '刘建毛笔草书', category: 'chinese' },
  { name: 'LXGW Marker Gothic', family: 'LXGW Marker Gothic', googleFontName: 'LXGW Marker Gothic', preview: '霞鹜铭心体', category: 'chinese' },
  { name: 'LXGW WenKai TC', family: 'LXGW WenKai TC', googleFontName: 'LXGW WenKai TC', preview: '霞鹜文楷繁体', category: 'chinese' },

  // CDN 字体
  { name: 'LXGW WenKai', family: 'LXGW WenKai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkai@latest/dist/LXGWWenKai-Regular/result.css', preview: '霞鹜文楷', category: 'chinese' },
  { name: 'Huiwen-mincho', family: 'Huiwen-mincho', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hwmct@latest/dist/汇文明朝体/result.css', preview: '汇文明朝体', category: 'chinese' },
  { name: 'Cubic 11', family: 'Cubic 11', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cubic@latest/dist/Cubic/result.css', preview: 'Cubic 11', category: 'chinese' },
  { name: 'DOUYU Font', family: 'DOUYU Font', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dyzgt@latest/dist/斗鱼追光体/result.css', preview: '斗鱼追光体', category: 'chinese' },
  { name: 'Jiangxi Zhuokai', family: 'jiangxizhuokai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/jxzk@latest/dist/江西拙楷/result.css', preview: '江西拙楷', category: 'chinese' },
  { name: 'Qiantu Bifeng', family: 'qiantubifengshouxieti', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/qtbfsxt@latest/dist/千图笔锋手写体/result.css', preview: '千图笔锋手写体', category: 'chinese' },
  { name: 'YouSheBiaoTiHei', family: 'YouSheBiaoTiHei', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysbth@latest/dist/优设标题黑/result.css', preview: '优设标题黑', category: 'chinese' },
  { name: 'Zoomla Mengya', family: 'ZoomlaMengyas-A080', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zlmyz@latest/dist/逐浪萌芽字/result.css', preview: '逐浪萌芽字', category: 'chinese' },
  { name: 'Zhongqi Zhimang Xingshu', family: '钟齐志莽行书', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zqzmxs@latest/dist/钟齐志莽行书/result.css', preview: '钟齐志莽行书', category: 'chinese' },
  { name: 'Suifeng Ti', family: 'The Peak Font', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/sft@latest/dist/随峰体/result.css', preview: '随峰体', category: 'chinese' },
  { name: 'Ruimeijia Zhangqingping', family: '瑞美加张清平硬笔行书', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/rmjzqpybxs@latest/dist/瑞美加张清平硬笔行书/result.css', preview: '瑞美加张清平硬笔行书', category: 'chinese' },
  { name: 'HongLei Xingshu', family: 'hongleixingshu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hlxsjt@latest/dist/鸿雷行书简体/result.css', preview: '鸿雷行书简体', category: 'chinese' },
  { name: 'Smiley Sans Oblique', family: 'Smiley Sans Oblique', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dyh@latest/dist/SmileySans-Oblique/result.css', preview: '得意黑', category: 'chinese' },
  { name: 'Maoken Assorted Sans', family: 'MaokenAssortedSans', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mksjh@latest/dist/MaokenAssortedSans/result.css', preview: '猫啃什锦黑', category: 'chinese' },
  { name: 'Tiejili', family: 'Tiejili', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/tjl@latest/dist/Tiejili_Regular/result.css', preview: '铁蒺藜体', category: 'chinese' },
  { name: 'Youshi Youran', family: 'slideyouran', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysyrxk@latest/dist/slideyouran-Regular2_0/result.css', preview: '演示悠然小楷', category: 'chinese' },
  { name: 'Biaozhi Xiaozhi Longzhu', family: 'LogoSC LongZhuTi', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/bxzlzt@latest/dist/标小智龙珠体/result.css', preview: '标小智龙珠体', category: 'chinese' },
  { name: 'Youziku Longcang', family: 'Long Cang', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yzklct@latest/dist/有字库龙藏体/result.css', preview: '有字库龙藏体', category: 'chinese' },
  { name: 'Zihun Biantaoti', family: 'zihunbiantaoti', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zhbtt@latest/dist/字魂扁桃体/result.css', preview: '字魂扁桃体', category: 'chinese' },
  { name: 'Maoken Tangyuan', family: 'MaoKenTangYuan', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mkwtyt@latest/dist/MaoKenTangYuan/result.css', preview: '猫啃网糖圆体', category: 'chinese' },
  { name: 'Source Han Serif CN', family: 'Source Han Serif CN VF', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/syst@latest/dist/SourceHanSerifCN/result.css', preview: '思源宋体 CN', category: 'chinese' },
  { name: 'Youshi Foxi', family: 'Slidefu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysfxt@latest/dist/Slidefu-Regular/result.css', preview: '演示佛系体', category: 'chinese' },
  { name: 'JingHua OldSong', family: 'KingHwa_OldSong', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/jhlst@latest/dist/京華老宋体v2_002/result.css', preview: '京华老宋体', category: 'chinese' },
  { name: 'Douyin Sans', family: 'Douyin Sans', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dymh@latest/dist/DouyinSansBold/result.css', preview: '抖音美好体', category: 'chinese' },
  { name: 'Yozai', family: 'Yozai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yozai@latest/dist/Yozai-Regular/result.css', preview: '悠哉', category: 'chinese' },
  { name: 'Xiaolai', family: 'Xiaolai SC', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/xiaolai@latest/dist/Xiaolai/result.css', preview: '小赖体', category: 'chinese' },
  { name: 'LXGWWenKai Screen', family: 'LXGW WenKai Screen', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgw-wenkai-screen-web@latest/dist/LXGWWenKaiScreen/result.css', preview: '霞鹜文楷屏显版', category: 'chinese' },
  { name: 'Muzai Pixel', family: 'MuzaiPixel', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mzxst@latest/dist/MZPXorig/result.css', preview: '目哉像素体', category: 'chinese' },
  { name: 'Zhuque Fangsong', family: 'Zhuque Fangsong', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zqfs@latest/dist/ZhuqueFangsong-Regular/result.css', preview: '朱雀仿宋', category: 'chinese' },
  { name: 'Soukou Mincho', family: 'SoukouMincho', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zjmc@latest/dist/装甲明朝体/result.css', preview: '装甲明朝体', category: 'chinese' },
  { name: 'Fei Hua Song', family: 'FlyFlowerSong', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/fhst@latest/dist/飞花宋体/result.css', preview: '飞花宋体', category: 'chinese' },
  { name: 'Pingfang Gongzi', family: 'PING FANG GONG ZI TI', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/pfgzt@latest/dist/平方公子体/result.css', preview: '平方公子体', category: 'chinese' },
  { name: 'Pingfang Langya', family: 'PingFangLaiJiangHuLangYaTi-2', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/pfljhlyt@latest/dist/平方赖江湖琅琊体/result.css', preview: '平方赖江湖琅琊体', category: 'chinese' },
  { name: 'CEF Fonts CJK Mono', family: 'CEF Fonts CJK Mono', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cef@latest/dist/CEFFontsCJKMono-Regular/result.css', preview: 'CEF 编程等宽字体', category: 'chinese' },
  { name: 'Feibo ZhengDian', family: 'Feibo Zheng Dots', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/fbdzt@latest/dist/飞波正点体V2_1/result.css', preview: '飞波正点体', category: 'chinese' },
  { name: 'Kuaikan Shijieti', family: 'kuaikanshijieti', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/kksjt@latest/dist/kuaikanshijieti20231213/result.css', preview: '快看世界体', category: 'chinese' },
  { name: 'YuFan XinYu', family: 'YuFanXinYu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yfxy@latest/dist/YuFanXinYu-Regular/result.css', preview: '余繁新语', category: 'chinese' },
  { name: 'YeFont XiaoShiTou', family: 'YEFONTXiaoShiTou', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yzgcxst@latest/dist/也字工厂小石头/result.css', preview: '也字工厂小石头', category: 'chinese' },
  { name: 'Xuandong Kaishu', family: 'XuandongKaishu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/xuandongkaishu@latest/dist/XuandongKaishu/result.css', preview: '玄冬楷书', category: 'chinese' },
  { name: 'Tsanger Zhouke', family: 'TsangerZhoukeZhengdabangshu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cezkzdbs@latest/dist/仓耳周珂正大榜书/result.css', preview: '仓耳周珂正大榜书', category: 'chinese' },
  { name: 'Huang Lingdong Qiji', family: 'QIJIFALLBACK', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hldqjt@latest/dist/qiji-fallback/result.css', preview: '黄令东齐伋体', category: 'chinese' },
  { name: 'Huang Yinqi Zhaopai', family: 'huangyinqi zhaopai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hyqzp@latest/dist/黄引齐招牌体/result.css', preview: '黄引齐招牌体', category: 'chinese' },
  { name: 'PangMen ZhengDao', family: 'PangMenZhengDao-XiXian', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/pmzdxxt@latest/dist/庞门正道细线体/result.css', preview: '庞门正道细线条', category: 'chinese' },
  { name: 'JUNJUN', family: 'JUNJUN', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/jnjj@latest/dist/JUNJUN/result.css', preview: '荆南俊俊体', category: 'chinese' },
  { name: 'NZGR Kangxi', family: 'nzgrKangxi', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/rzjkxzdmh@latest/dist/nzgrKangxi/result.css', preview: '润植家康熙字典美化体', category: 'chinese' },
  { name: 'ZhanKu XiaoWei', family: 'xiaowei', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zkxw@latest/dist/站酷小薇LOGO体_猫啃网/result.css', preview: '站酷小薇LOGO体', category: 'chinese' },
  { name: 'Quan Pixel', family: 'QuanPixel 8px', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/qxs@latest/dist/quan/result.css', preview: '全小素', category: 'chinese' },
  { name: 'SourceHan Display', family: 'Source Han Serif CN for Display', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/sypxzs@latest/dist/思源屏显臻宋/result.css', preview: '思源屏显臻宋', category: 'chinese' },
  { name: 'YouShe Shayu Feite', family: 'YouSheShaYuFeiTeJianKangTi', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/syftjkt@latest/dist/优设鲨鱼菲特健康体/result.css', preview: '优设鲨鱼菲特健康体', category: 'chinese' },
  { name: 'BWCKKT', family: 'BWCKKT', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/bwckkt@latest/dist/白无常可可体-Regular/result.css', preview: '白无常可可体', category: 'chinese' },

  // 日文
  { name: 'Noto Serif JP', family: 'Noto Serif JP', googleFontName: 'Noto Serif JP', preview: '日本語明朝体', category: 'japanese' },
  { name: 'Noto Sans JP', family: 'Noto Sans JP', googleFontName: 'Noto Sans JP', preview: '日本語ゴシック', category: 'japanese' },
  { name: 'M PLUS Rounded 1c', family: 'M PLUS Rounded 1c', googleFontName: 'M PLUS Rounded 1c', preview: '日本語書体', category: 'japanese' },
  { name: 'M PLUS 1p', family: 'M PLUS 1p', googleFontName: 'M PLUS 1p', preview: '日本語書体', category: 'japanese' },

  // 韩文
  { name: 'Hangeuljaemin 韩文', family: 'Hangeuljaemin4.0', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hqzmt@latest/dist/Hangeuljaemin4-Regular/result.css', preview: '한글 제목', category: 'korean' },
  { name: 'Noto Sans KR', family: 'Noto Sans KR', googleFontName: 'Noto Sans KR', preview: '한글', category: 'korean' },
  { name: 'Noto Serif KR', family: 'Noto Serif KR', googleFontName: 'Noto Serif KR', preview: '한글', category: 'korean' },
  { name: 'Nanum Gothic', family: 'Nanum Gothic', googleFontName: 'Nanum Gothic', preview: '나눔 고딕', category: 'korean' },

  // 英文
  { name: 'Roboto', family: 'Roboto', googleFontName: 'Roboto', preview: 'Roboto', category: 'english' },
  { name: 'Inter', family: 'Inter', googleFontName: 'Inter', preview: 'Inter', category: 'english' },
  { name: 'Lato', family: 'Lato', googleFontName: 'Lato', preview: 'Lato', category: 'english' },
  { name: 'Open Sans', family: 'Open Sans', googleFontName: 'Open Sans', preview: 'Open Sans', category: 'english' },
  { name: 'Montserrat', family: 'Montserrat', googleFontName: 'Montserrat', preview: 'Montserrat', category: 'english' },
  { name: 'Poppins', family: 'Poppins', googleFontName: 'Poppins', preview: 'Poppins', category: 'english' },
  { name: 'Playfair Display', family: 'Playfair Display', googleFontName: 'Playfair Display', preview: 'Playfair Display', category: 'english' },
  { name: 'Merriweather', family: 'Merriweather', googleFontName: 'Merriweather', preview: 'Merriweather', category: 'english' },
  { name: 'Dancing Script', family: 'Dancing Script', googleFontName: 'Dancing Script', preview: 'Dancing Script', category: 'english' },
  { name: 'Pacifico', family: 'Pacifico', googleFontName: 'Pacifico', preview: 'Pacifico', category: 'english' },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const results = [];

  console.log(`\n=== 开始测试 ${allFonts.length} 个字体 ===\n`);
  
  let idx = 0;
  for (const font of allFonts) {
    idx++;
    const page = await context.newPage();
    await page.goto('about:blank');
    
    try {
      const result = await page.evaluate((fontData) => {
        return new Promise((resolve) => {
          const cssUrl = fontData.cssUrl || 
            `https://fonts.googleapis.com/css2?family=${fontData.googleFontName}&display=swap`;
          
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = cssUrl;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
          
          let done = false;
          const timeoutMs = 8000;
          
          const checkFont = () => {
            if (done) return;
            done = true;
            const family = fontData.family;
            const text = fontData.preview;
            try {
              const canRender = document.fonts.check(`24px "${family}"`, text);
              let fontRegistered = false;
              try {
                for (const f of document.fonts) {
                  if (f.family === family) { fontRegistered = true; break; }
                }
              } catch (e) {}
              resolve({ cssLoaded: true, canRender, fontRegistered, family });
            } catch (e) {
              resolve({ cssLoaded: true, canRender: false, fontRegistered: false, family, error: String(e) });
            }
          };
          
          link.onload = () => {
            setTimeout(async () => {
              try {
                await document.fonts.ready;
                await document.fonts.load(`24px "${fontData.family}"`, fontData.preview);
              } catch (e) {}
              checkFont();
            }, 1800);
          };
          
          link.onerror = () => {
            if (done) return;
            done = true;
            resolve({ cssLoaded: false, canRender: false, fontRegistered: false, family: fontData.family, error: 'CSS加载失败' });
          };
          
          setTimeout(() => {
            if (!done) {
              const family = fontData.family;
              let canRender = false, fontRegistered = false;
              try {
                canRender = document.fonts.check(`24px "${family}"`, fontData.preview);
                for (const f of document.fonts) {
                  if (f.family === family) { fontRegistered = true; break; }
                }
              } catch (e) {}
              done = true;
              resolve({ cssLoaded: false, canRender, fontRegistered, family, error: '超时' });
            }
          }, timeoutMs);
        });
      }, font);
      
      const source = font.cssUrl ? 'CDN' : 'Google Fonts';
      const status = result.canRender ? '✓' : '✗';
      results.push({
        name: font.name, family: font.family, source, category: font.category,
        canRender: result.canRender, fontRegistered: result.fontRegistered,
        cssLoaded: result.cssLoaded, error: result.error,
        googleFontName: font.googleFontName, cssUrl: font.cssUrl, preview: font.preview
      });
      
      console.log(`[${idx}/${allFonts.length}] ${status} ${font.name} [${source}/${font.category}] - canRender:${result.canRender}${result.error ? ' ' + result.error : ''}`);
    } catch (e) {
      results.push({
        name: font.name, family: font.family, source: font.cssUrl ? 'CDN' : 'Google Fonts',
        category: font.category, canRender: false, fontRegistered: false, cssLoaded: false,
        error: String(e), googleFontName: font.googleFontName, cssUrl: font.cssUrl, preview: font.preview
      });
      console.log(`[${idx}/${allFonts.length}] ✗ ${font.name} - ERROR: ${String(e).slice(0, 50)}`);
    }
    
    await page.close();
  }
  
  await browser.close();
  
  // 统计与分类
  const ok = results.filter(r => r.canRender);
  const fail = results.filter(r => !r.canRender);
  
  console.log('\n=========== 最终统计 ===========');
  console.log(`总计: ${results.length}`);
  console.log(`✓ 可渲染: ${ok.length}`);
  console.log(`✗ 不可渲染: ${fail.length}`);
  
  console.log('\n=========== 不可渲染字体列表 ===========');
  fail.forEach(r => {
    console.log(`  - ${r.name} (family: "${r.family}") [${r.source}/${r.category}]${r.error ? ' - ' + r.error : ''}`);
  });
  
  console.log('\n=========== 可渲染字体列表 (按分类) ===========');
  const byCat = {};
  for (const r of ok) {
    if (!byCat[r.category]) byCat[r.category] = [];
    byCat[r.category].push(r);
  }
  for (const cat of Object.keys(byCat)) {
    console.log(`\n【${cat}】${byCat[cat].length} 个:`);
    byCat[cat].forEach(r => {
      console.log(`  - ${r.name} (family: "${r.family}") [${r.source}]`);
      if (r.googleFontName) console.log(`    googleFontName: "${r.googleFontName}"`);
      if (r.cssUrl) console.log(`    cssUrl: "${r.cssUrl}"`);
      console.log(`    previewText: "${r.preview}"`);
    });
  }
}

main().catch(console.error);
