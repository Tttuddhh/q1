// 字体加载与渲染验证脚本
// 通过 Playwright 浏览器自动化，验证 fonts.ts 中每个字体是否能正确加载

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

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('about:blank');

  const results = [];

  for (const font of fontsToTest) {
    try {
      await page.evaluate((fontDef) => {
        return new Promise((resolve) => {
          let familyName = '';
          if (fontDef.cssUrl) {
            // CDN 字体 - 注入样式表
            const linkId = 'css-font-test-' + Date.now();
            const link = document.createElement('link');
            link.id = linkId;
            link.rel = 'stylesheet';
            link.href = fontDef.cssUrl;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
            familyName = fontDef.family;

            // 监听加载
            link.onload = () => resolve({ cssLoaded: true });
            link.onerror = () => resolve({ cssLoaded: false, error: 'CSS 加载失败' });

            // 5秒超时
            setTimeout(() => resolve({ cssLoaded: false, error: 'CSS 加载超时' }), 5000);
          } else if (fontDef.googleFontName) {
            // Google Fonts 字体
            const linkId = 'gf-font-test-' + Date.now();
            const link = document.createElement('link');
            link.id = linkId;
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=' + fontDef.googleFontName + '&display=swap';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
            familyName = fontDef.googleFontName;

            link.onload = () => resolve({ cssLoaded: true });
            link.onerror = () => resolve({ cssLoaded: false, error: 'Google Fonts CSS 加载失败' });

            setTimeout(() => resolve({ cssLoaded: false, error: 'Google Fonts CSS 加载超时' }), 5000);
          }
        }).then(async (result) => {
          // 验证字体是否可渲染
          if (result.cssLoaded && window.document && window.document.fonts) {
            try {
              await window.document.fonts.ready;
              const fontSpec = '16px "' + familyName + '"';
              const canRender = window.document.fonts.check(fontSpec, fontDef.preview);
              return {
                ...result,
                family: familyName,
                canRender,
              };
            } catch (e) {
              return { ...result, family: familyName, canRender: false, fontError: String(e) };
            }
          }
          return { ...result, family: familyName, canRender: false };
        });
      }, font);

      // 在页面中创建测试元素并截图对比
      const canRender = await page.evaluate((fontDef) => {
        let familyName = fontDef.family;
        if (!document.fonts) return false;
        try {
          const fontSpec = '24px "' + familyName + '"';
          return document.fonts.check(fontSpec, fontDef.preview);
        } catch {
          return false;
        }
      }, font);

      results.push({
        name: font.name,
        family: font.family,
        source: font.cssUrl ? 'CDN' : (font.googleFontName ? 'Google Fonts' : 'System'),
        canRender,
      });

      console.log(`${canRender ? '✓' : '✗'} ${font.name} (${font.family}) [${font.cssUrl ? 'CDN' : 'Google Fonts'}]`);
    } catch (err) {
      results.push({
        name: font.name,
        family: font.family,
        source: font.cssUrl ? 'CDN' : 'Google Fonts',
        canRender: false,
        error: String(err),
      });
      console.log(`✗ ${font.name} - ERROR: ${err}`);
    }
  }

  // 统计
  const total = results.length;
  const okCount = results.filter(r => r.canRender).length;
  const failCount = total - okCount;

  console.log('\n=========== 统计 ===========');
  console.log(`总计: ${total}`);
  console.log(`可渲染: ${okCount}`);
  console.log(`无法渲染: ${failCount}`);

  console.log('\n=========== 无法渲染的字体 ===========');
  results.filter(r => !r.canRender).forEach(r => {
    console.log(`  - ${r.name} (${r.family}) [${r.source}]`);
  });

  await browser.close();
}

main().catch(console.error);
