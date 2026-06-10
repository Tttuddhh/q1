// 批量验证 fonts.ts 中所有的 @chinese-fonts CDN URL 是否可用
// 同时检查 Google Fonts 是否真实存在

import https from 'https';
import http from 'http';
import { chromium } from 'playwright';

// 从 fonts.ts 中读取的所有字体数据
const allFonts = [
  // Google Fonts 中文字体
  { name: 'Noto Sans SC', family: 'Noto Sans SC', googleFontName: 'Noto Sans SC', preview: '思源黑体' },
  { name: 'Noto Serif SC', family: 'Noto Serif SC', googleFontName: 'Noto Serif SC', preview: '思源宋体' },
  { name: 'Noto Sans TC', family: 'Noto Sans TC', googleFontName: 'Noto Sans TC', preview: '思源黑體' },
  { name: 'Noto Serif TC', family: 'Noto Serif TC', googleFontName: 'Noto Serif TC', preview: '思源宋體' },
  { name: 'Noto Sans HK', family: 'Noto Sans HK', googleFontName: 'Noto Sans HK', preview: '思源黑體' },
  { name: 'Noto Serif HK', family: 'Noto Serif HK', googleFontName: 'Noto Serif HK', preview: '思源宋體' },
  { name: 'ZCOOL KuaiLe', family: 'ZCOOL KuaiLe', googleFontName: 'ZCOOL KuaiLe', preview: '站酷快乐体' },
  { name: 'ZCOOL XiaoWei', family: 'ZCOOL XiaoWei', googleFontName: 'ZCOOL XiaoWei', preview: '站酷小薇体' },
  { name: 'ZCOOL QingKe HuangYou', family: 'ZCOOL QingKe HuangYou', googleFontName: 'ZCOOL QingKe HuangYou', preview: '站酷庆科黄油体' },
  { name: 'Ma Shan Zheng', family: 'Ma Shan Zheng', googleFontName: 'Ma Shan Zheng', preview: '马善政毛笔体' },
  { name: 'Zhi Mang Xing', family: 'Zhi Mang Xing', googleFontName: 'Zhi Mang Xing', preview: '志莽行书' },
  { name: 'Long Cang', family: 'Long Cang', googleFontName: 'Long Cang', preview: '龙苍手写体' },
  { name: 'Liu Jian Mao Cao', family: 'Liu Jian Mao Cao', googleFontName: 'Liu Jian Mao Cao', preview: '刘建毛笔草书' },
  { name: 'LXGW Marker Gothic', family: 'LXGW Marker Gothic', googleFontName: 'LXGW Marker Gothic', preview: '霞鹜铭心体' },
  { name: 'LXGW WenKai TC', family: 'LXGW WenKai TC', googleFontName: 'LXGW WenKai TC', preview: '霞鹜文楷繁体' },

  // CDN 字体 (需要验证 URL 有效性)
  { name: 'LXGW WenKai', family: 'LXGW WenKai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkai@latest/dist/LXGWWenKai-Regular/result.css', preview: '霞鹜文楷' },
  { name: 'Huiwen-mincho', family: 'Huiwen-mincho', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hwmct@latest/dist/汇文明朝体/result.css', preview: '汇文明朝体' },
  { name: 'Cubic 11', family: 'Cubic 11', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cubic@latest/dist/Cubic/result.css', preview: 'Cubic 11' },
  { name: 'DOUYU Font', family: 'DOUYU Font', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dyzgt@latest/dist/斗鱼追光体/result.css', preview: '斗鱼追光体' },
  { name: 'Jiangxi Zhuokai', family: 'jiangxizhuokai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/jxzk@latest/dist/江西拙楷/result.css', preview: '江西拙楷' },
  { name: 'Qiantu Bifeng', family: 'qiantubifengshouxieti', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/qtbfsxt@latest/dist/千图笔锋手写体/result.css', preview: '千图笔锋手写体' },
  { name: 'YouSheBiaoTiHei', family: 'YouSheBiaoTiHei', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysbth@latest/dist/优设标题黑/result.css', preview: '优设标题黑' },
  { name: 'Zoomla Mengya', family: 'ZoomlaMengyas-A080', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zlmyz@latest/dist/逐浪萌芽字/result.css', preview: '逐浪萌芽字' },
  { name: 'Zhongqi Zhimang Xingshu', family: '钟齐志莽行书', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zqzmxs@latest/dist/钟齐志莽行书/result.css', preview: '钟齐志莽行书' },
  { name: 'Suifeng Ti', family: 'The Peak Font', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/sft@latest/dist/随峰体/result.css', preview: '随峰体' },
  { name: 'Ruimeijia Zhangqingping', family: '瑞美加张清平硬笔行书', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/rmjzqpybxs@latest/dist/瑞美加张清平硬笔行书/result.css', preview: '瑞美加张清平硬笔行书' },
  { name: 'HongLei Xingshu', family: 'hongleixingshu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hlxsjt@latest/dist/鸿雷行书简体/result.css', preview: '鸿雷行书简体' },
  { name: 'Smiley Sans Oblique', family: 'Smiley Sans Oblique', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dyh@latest/dist/SmileySans-Oblique/result.css', preview: '得意黑' },
  { name: 'Maoken Assorted Sans', family: 'MaokenAssortedSans', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mksjh@latest/dist/MaokenAssortedSans/result.css', preview: '猫啃什锦黑' },
  { name: 'Tiejili', family: 'Tiejili', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/tjl@latest/dist/Tiejili_Regular/result.css', preview: '铁蒺藜体' },
  { name: 'Youshi Youran', family: 'slideyouran', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysyrxk@latest/dist/slideyouran-Regular2_0/result.css', preview: '演示悠然小楷' },
  { name: 'Biaozhi Xiaozhi Longzhu', family: 'LogoSC LongZhuTi', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/bxzlzt@latest/dist/标小智龙珠体/result.css', preview: '标小智龙珠体' },
  { name: 'Youziku Longcang', family: 'Long Cang', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yzklct@latest/dist/有字库龙藏体/result.css', preview: '有字库龙藏体' },
  { name: 'Zihun Biantaoti', family: 'zihunbiantaoti', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zhbtt@latest/dist/字魂扁桃体/result.css', preview: '字魂扁桃体' },
  { name: 'Maoken Tangyuan', family: 'MaoKenTangYuan', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mkwtyt@latest/dist/MaoKenTangYuan/result.css', preview: '猫啃网糖圆体' },
  { name: 'Source Han Serif CN', family: 'Source Han Serif CN VF', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/syst@latest/dist/SourceHanSerifCN/result.css', preview: '思源宋体 CN' },
  { name: 'Youshi Foxi', family: 'Slidefu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysfxt@latest/dist/Slidefu-Regular/result.css', preview: '演示佛系体' },
  { name: 'JingHua OldSong', family: 'KingHwa_OldSong', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/jhlst@latest/dist/京華老宋体v2_002/result.css', preview: '京华老宋体' },
  { name: 'Douyin Sans', family: 'Douyin Sans', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dymh@latest/dist/DouyinSansBold/result.css', preview: '抖音美好体' },
  { name: 'Yozai', family: 'Yozai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yozai@latest/dist/Yozai-Regular/result.css', preview: '悠哉' },
  { name: 'Xiaolai', family: 'Xiaolai SC', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/xiaolai@latest/dist/Xiaolai/result.css', preview: '小赖体' },
  { name: 'LXGWWenKai Screen', family: 'LXGW WenKai Screen', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgw-wenkai-screen-web@latest/dist/LXGWWenKaiScreen/result.css', preview: '霞鹜文楷屏显版' },
  { name: 'Muzai Pixel', family: 'MuzaiPixel', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mzxst@latest/dist/MZPXorig/result.css', preview: '目哉像素体' },
  { name: 'Zhuque Fangsong', family: 'Zhuque Fangsong', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zqfs@latest/dist/ZhuqueFangsong-Regular/result.css', preview: '朱雀仿宋' },
  { name: 'Soukou Mincho', family: 'SoukouMincho', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zjmc@latest/dist/装甲明朝体/result.css', preview: '装甲明朝体' },
  { name: 'Fei Hua Song', family: 'FlyFlowerSong', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/fhst@latest/dist/飞花宋体/result.css', preview: '飞花宋体' },
  { name: 'Pingfang Gongzi', family: 'PING FANG GONG ZI TI', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/pfgzt@latest/dist/平方公子体/result.css', preview: '平方公子体' },
  { name: 'Pingfang Langya', family: 'PingFangLaiJiangHuLangYaTi-2', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/pfljhlyt@latest/dist/平方赖江湖琅琊体/result.css', preview: '平方赖江湖琅琊体' },
  { name: 'CEF Fonts CJK Mono', family: 'CEF Fonts CJK Mono', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cef@latest/dist/CEFFontsCJKMono-Regular/result.css', preview: 'CEF 编程等宽字体' },
  { name: 'Feibo ZhengDian', family: 'Feibo Zheng Dots', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/fbdzt@latest/dist/飞波正点体V2_1/result.css', preview: '飞波正点体' },
  { name: 'Kuaikan Shijieti', family: 'kuaikanshijieti', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/kksjt@latest/dist/kuaikanshijieti20231213/result.css', preview: '快看世界体' },
  { name: 'YuFan XinYu', family: 'YuFanXinYu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yfxy@latest/dist/YuFanXinYu-Regular/result.css', preview: '余繁新语' },
  { name: 'YeFont XiaoShiTou', family: 'YEFONTXiaoShiTou', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yzgcxst@latest/dist/也字工厂小石头/result.css', preview: '也字工厂小石头' },
  { name: 'Xuandong Kaishu', family: 'XuandongKaishu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/xuandongkaishu@latest/dist/XuandongKaishu/result.css', preview: '玄冬楷书' },
  { name: 'Tsanger Zhouke', family: 'TsangerZhoukeZhengdabangshu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cezkzdbs@latest/dist/仓耳周珂正大榜书/result.css', preview: '仓耳周珂正大榜书' },
  { name: 'Huang Lingdong Qiji', family: 'QIJIFALLBACK', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hldqjt@latest/dist/qiji-fallback/result.css', preview: '黄令东齐伋体' },
  { name: 'Huang Yinqi Zhaopai', family: 'huangyinqi zhaopai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hyqzp@latest/dist/黄引齐招牌体/result.css', preview: '黄引齐招牌体' },
  { name: 'PangMen ZhengDao', family: 'PangMenZhengDao-XiXian', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/pmzdxxt@latest/dist/庞门正道细线体/result.css', preview: '庞门正道细线条' },
  { name: 'JUNJUN', family: 'JUNJUN', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/jnjj@latest/dist/JUNJUN/result.css', preview: '荆南俊俊体' },
  { name: 'NZGR Kangxi', family: 'nzgrKangxi', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/rzjkxzdmh@latest/dist/nzgrKangxi/result.css', preview: '润植家康熙字典美化体' },
  { name: 'ZhanKu XiaoWei', family: 'xiaowei', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zkxw@latest/dist/站酷小薇LOGO体_猫啃网/result.css', preview: '站酷小薇LOGO体' },
  { name: 'Quan Pixel', family: 'QuanPixel 8px', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/qxs@latest/dist/quan/result.css', preview: '全小素' },
  { name: 'SourceHan Display', family: 'Source Han Serif CN for Display', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/sypxzs@latest/dist/思源屏显臻宋/result.css', preview: '思源屏显臻宋' },
  { name: 'YouShe Shayu Feite', family: 'YouSheShaYuFeiTeJianKangTi', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/syftjkt@latest/dist/优设鲨鱼菲特健康体/result.css', preview: '优设鲨鱼菲特健康体' },
  { name: 'BWCKKT', family: 'BWCKKT', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/bwckkt@latest/dist/白无常可可体-Regular/result.css', preview: '白无常可可体' },

  // 日文字体
  { name: 'Noto Serif JP', family: 'Noto Serif JP', googleFontName: 'Noto Serif JP', preview: '日本語明朝体' },
  { name: 'Noto Sans JP', family: 'Noto Sans JP', googleFontName: 'Noto Sans JP', preview: '日本語ゴシック' },
  { name: 'M PLUS Rounded 1c', family: 'M PLUS Rounded 1c', googleFontName: 'M PLUS Rounded 1c', preview: '日本語書体' },
  { name: 'M PLUS 1p', family: 'M PLUS 1p', googleFontName: 'M PLUS 1p', preview: '日本語書体' },

  // 韩文字体
  { name: 'Hangeuljaemin 韩文', family: 'Hangeuljaemin4.0', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hqzmt@latest/dist/Hangeuljaemin4-Regular/result.css', preview: '한글 제목' },
  { name: 'Noto Sans KR', family: 'Noto Sans KR', googleFontName: 'Noto Sans KR', preview: '한글' },
  { name: 'Noto Serif KR', family: 'Noto Serif KR', googleFontName: 'Noto Serif KR', preview: '한글' },
  { name: 'Nanum Gothic', family: 'Nanum Gothic', googleFontName: 'Nanum Gothic', preview: '나눔 고딕' },

  // 英文字体
  { name: 'Roboto', family: 'Roboto', googleFontName: 'Roboto', preview: 'Roboto' },
  { name: 'Inter', family: 'Inter', googleFontName: 'Inter', preview: 'Inter' },
  { name: 'Lato', family: 'Lato', googleFontName: 'Lato', preview: 'Lato' },
  { name: 'Open Sans', family: 'Open Sans', googleFontName: 'Open Sans', preview: 'Open Sans' },
  { name: 'Montserrat', family: 'Montserrat', googleFontName: 'Montserrat', preview: 'Montserrat' },
  { name: 'Poppins', family: 'Poppins', googleFontName: 'Poppins', preview: 'Poppins' },
  { name: 'Playfair Display', family: 'Playfair Display', googleFontName: 'Playfair Display', preview: 'Playfair Display' },
  { name: 'Merriweather', family: 'Merriweather', googleFontName: 'Merriweather', preview: 'Merriweather' },
  { name: 'Dancing Script', family: 'Dancing Script', googleFontName: 'Dancing Script', preview: 'Dancing Script' },
  { name: 'Pacifico', family: 'Pacifico', googleFontName: 'Pacifico', preview: 'Pacifico' },
];

function fetchUrl(url, timeoutMs = 10000) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const options = {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: 'HEAD',
        timeout: timeoutMs,
        headers: { 'User-Agent': 'Mozilla/5.0 font-tester' }
      };
      
      const proto = url.startsWith('https') ? https : http;
      const req = proto.request(options, (res) => {
        resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 300 });
      });
      req.on('error', () => resolve({ url, status: 0, ok: false, error: 'network' }));
      req.on('timeout', () => {
        req.destroy();
        resolve({ url, status: 0, ok: false, error: 'timeout' });
      });
      req.setTimeout(timeoutMs);
      req.end();
    } catch (e) {
      resolve({ url, status: 0, ok: false, error: String(e) });
    }
  });
}

async function main() {
  // 1. 先检查所有 CDN URL 的 HTTP 状态
  const cdnFonts = allFonts.filter(f => f.cssUrl);
  console.log(`=== 检查 ${cdnFonts.length} 个 CDN 字体 URL ===\n`);
  
  const urlResults = [];
  for (const font of cdnFonts) {
    const result = await fetchUrl(font.cssUrl);
    const ok = result.ok ? '✓' : '✗';
    console.log(`${ok} ${font.name} (HTTP ${result.status}) - ${font.cssUrl}`);
    urlResults.push({ name: font.name, family: font.family, ...result });
  }
  
  const okUrls = urlResults.filter(r => r.ok);
  const badUrls = urlResults.filter(r => !r.ok);
  console.log(`\n=== CDN URL 检查结果: ${okUrls.length}/${urlResults.length} 可用, ${badUrls.length} 不可用 ===`);
  
  if (badUrls.length) {
    console.log('\n=== 不可用的 CDN 字体 ===');
    badUrls.forEach(r => console.log(`  - ${r.name} (HTTP ${r.status})`));
  }

  // 2. 用浏览器测试字体实际可渲染性
  console.log('\n=== 浏览器字体渲染测试 ===');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const renderResults = [];
  
  const fontsToTest = allFonts.filter(f => f.cssUrl ? urlResults.find(r => r.name === f.name && r.ok) : true);
  
  for (const font of fontsToTest) {
    const page = await context.newPage();
    await page.goto('about:blank');
    
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
        
        link.onload = () => {
          if (done) return;
          const family = fontData.family;
          const text = fontData.preview;
          
          setTimeout(async () => {
            try {
              await document.fonts.ready;
              await document.fonts.load(`24px "${family}"`, text);
            } catch (e) {}
            
            const canRender = document.fonts.check(`24px "${family}"`, text);
            
            let fontRegistered = false;
            try {
              for (const f of document.fonts) {
                if (f.family === family) {
                  fontRegistered = true;
                  break;
                }
              }
            } catch (e) {}
            
            done = true;
            resolve({ cssLoaded: true, canRender, fontRegistered, family });
          }, 1500);
        };
        
        link.onerror = () => {
          if (done) return;
          done = true;
          resolve({ cssLoaded: false, canRender: false, fontRegistered: false, family: fontData.family, error: 'CSS加载失败' });
        };
        
        setTimeout(() => {
          if (!done) {
            done = true;
            const family = fontData.family;
            const canRender = document.fonts.check(`24px "${family}"`, fontData.preview);
            let fontRegistered = false;
            try {
              for (const f of document.fonts) {
                if (f.family === family) {
                  fontRegistered = true;
                  break;
                }
              }
            } catch (e) {}
            resolve({ cssLoaded: false, canRender, fontRegistered, family, error: '超时' });
          }
        }, timeoutMs);
      });
    }, font);
    
    const source = font.cssUrl ? 'CDN' : 'Google Fonts';
    const status = result.canRender ? '✓' : (result.fontRegistered ? '~' : '✗');
    renderResults.push({
      name: font.name, family: font.family, source,
      canRender: result.canRender, fontRegistered: result.fontRegistered,
      error: result.error
    });
    
    console.log(`${status} ${font.name} [${source}] - canRender:${result.canRender}${result.error ? ' ' + result.error : ''}`);
    await page.close();
  }
  
  await browser.close();
  
  const okRender = renderResults.filter(r => r.canRender);
  const badRender = renderResults.filter(r => !r.canRender);
  
  console.log(`\n=== 最终结果: ${okRender.length}/${renderResults.length} 个字体可渲染 ===`);
  if (badRender.length) {
    console.log('\n=== 不可渲染/不可用字体列表:');
    badRender.forEach(r => {
      console.log(`  - ${r.name} (family: "${r.family}") [${r.source}]`);
    });
  }
  
  console.log('\n=== 可用字体完整列表 (建议保留):');
  okRender.forEach(r => {
    console.log(`  - ${r.name} (family: "${r.family}") [${r.source}]`);
  });
}

main().catch(console.error);
