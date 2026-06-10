// 字体加载与渲染验证脚本 v2
// 通过 Playwright 在浏览器环境验证每个字体

import { chromium } from 'playwright';

const fontsToTest = [
  // === Google Fonts 中文字体 ===
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

  // === @chinese-fonts CDN 字体（部分）===
  { name: 'LXGW WenKai', family: 'LXGW WenKai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkai@latest/dist/LXGWWenKai-Regular/result.css', preview: '霞鹜文楷' },
  { name: 'Huiwen-mincho', family: 'Huiwen-mincho', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hwmct@latest/dist/汇文明朝体/result.css', preview: '汇文明朝体' },
  { name: 'Cubic 11', family: 'Cubic 11', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cubic@latest/dist/Cubic/result.css', preview: 'Cubic 11' },
  { name: 'DOUYU Font', family: 'DOUYU Font', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dyzgt@latest/dist/斗鱼追光体/result.css', preview: '斗鱼追光体' },
  { name: 'Jiangxi Zhuokai', family: 'jiangxizhuokai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/jxzk@latest/dist/江西拙楷/result.css', preview: '江西拙楷' },
  { name: 'Smiley Sans Oblique', family: 'Smiley Sans Oblique', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dyh@latest/dist/SmileySans-Oblique/result.css', preview: '得意黑' },
  { name: 'YeFont XiaoShiTou', family: 'YEFONTXiaoShiTou', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yzgcxst@latest/dist/也字工厂小石头/result.css', preview: '也字工厂小石头' },
  { name: 'YouSheBiaoTiHei', family: 'YouSheBiaoTiHei', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysbth@latest/dist/优设标题黑/result.css', preview: '优设标题黑' },
  { name: 'Maoken Assorted Sans', family: 'MaokenAssortedSans', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mksjh@latest/dist/MaokenAssortedSans/result.css', preview: '猫啃什锦黑' },
  { name: 'Biaozhi Xiaozhi Longzhu', family: 'LogoSC LongZhuTi', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/bxzlzt@latest/dist/标小智龙珠体/result.css', preview: '标小智龙珠体' },
  { name: 'Yozai', family: 'Yozai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yozai@latest/dist/Yozai-Regular/result.css', preview: '悠哉' },
  { name: 'Youziku Longcang', family: 'Long Cang', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yzklct@latest/dist/有字库龙藏体/result.css', preview: '有字库龙藏体' },
  { name: 'Quan Pixel', family: 'QuanPixel 8px', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/qxs@latest/dist/quan/result.css', preview: '全小素' },

  // === 日文字体 ===
  { name: 'Noto Serif JP', family: 'Noto Serif JP', googleFontName: 'Noto Serif JP', preview: '日本語明朝体' },
  { name: 'Noto Sans JP', family: 'Noto Sans JP', googleFontName: 'Noto Sans JP', preview: '日本語ゴシック' },
  { name: 'M PLUS Rounded 1c', family: 'M PLUS Rounded 1c', googleFontName: 'M PLUS Rounded 1c', preview: '日本語書体' },

  // === 韩文字体 ===
  { name: 'Noto Sans KR', family: 'Noto Sans KR', googleFontName: 'Noto Sans KR', preview: '한글' },
  { name: 'Noto Serif KR', family: 'Noto Serif KR', googleFontName: 'Noto Serif KR', preview: '한글' },
  { name: 'Nanum Gothic', family: 'Nanum Gothic', googleFontName: 'Nanum Gothic', preview: '나눔 고딕' },

  // === 英文字体 ===
  { name: 'Roboto', family: 'Roboto', googleFontName: 'Roboto', preview: 'Roboto' },
  { name: 'Inter', family: 'Inter', googleFontName: 'Inter', preview: 'Inter' },
  { name: 'Lato', family: 'Lato', googleFontName: 'Lato', preview: 'Lato' },
];

async function testFont(page, font) {
  const cssUrl = font.cssUrl
    ? font.cssUrl
    : `https://fonts.googleapis.com/css2?family=${font.googleFontName}&display=swap`;

  try {
    const result = await page.evaluate(async (f, url) => {
      // 注入样式表
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);

      // 等待 CSS 加载
      await new Promise((resolve, reject) => {
        link.onload = resolve;
        link.onerror = () => reject(new Error('CSS 加载失败'));
        setTimeout(() => reject(new Error('CSS 加载超时')), 6000);
      });

      // 等待字体就绪
      const family = f.family;
      const text = f.preview;

      try {
        await document.fonts.ready;
      } catch (e) {
        // 忽略
      }

      // 尝试主动加载字体
      try {
        await document.fonts.load(`24px "${family}"`, text);
      } catch (e) {
        // 忽略
      }

      // 再等待一点时间让字体渲染
      await new Promise(r => setTimeout(r, 500));

      // 检查是否可用
      const canRender = document.fonts.check(`24px "${family}"`, text);

      // 检查字体是否在字体表中注册
      let fontRegistered = false;
      try {
        for (const f of document.fonts) {
          if (f.family === family) {
            fontRegistered = true;
            break;
          }
        }
      } catch (e) {
        // 忽略
      }

      return {
        cssLoaded: true,
        family,
        canRender,
        fontRegistered,
      };
    }, font, cssUrl);

    return result;
  } catch (err) {
    return {
      cssLoaded: false,
      family: font.family,
      canRender: false,
      fontRegistered: false,
      error: String(err),
    };
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('about:blank');

  const results = [];

  for (const font of fontsToTest) {
    // 每次测试用新页面，避免字体缓存影响结果
    const testPage = await context.newPage();
    await testPage.goto('about:blank');

    const result = await testFont(testPage, font);
    const source = font.cssUrl ? 'CDN' : 'Google Fonts';
    const status = result.canRender ? '✓' : (result.fontRegistered ? '~' : '✗');

    results.push({
      name: font.name,
      family: font.family,
      source,
      cssLoaded: result.cssLoaded,
      fontRegistered: result.fontRegistered,
      canRender: result.canRender,
      error: result.error,
    });

    console.log(`${status} ${font.name} (${font.family}) [${source}] - canRender:${result.canRender} registered:${result.fontRegistered}${result.error ? ' ' + result.error : ''}`);

    await testPage.close();
  }

  // 统计
  const total = results.length;
  const okCount = results.filter(r => r.canRender).length;
  const partialCount = results.filter(r => !r.canRender && r.fontRegistered).length;
  const failCount = total - okCount - partialCount;

  console.log('\n=========== 统计 ===========');
  console.log(`总计: ${total}`);
  console.log(`可渲染: ${okCount}`);
  console.log(`部分(已注册但不可渲染): ${partialCount}`);
  console.log(`无法加载: ${failCount}`);

  console.log('\n=========== 问题字体 ===========');
  results.filter(r => !r.canRender).forEach(r => {
    console.log(`  - ${r.name} (${r.family}) [${r.source}] - registered:${r.fontRegistered}${r.error ? ' ' + r.error : ''}`);
  });

  await browser.close();
}

main().catch(console.error);
