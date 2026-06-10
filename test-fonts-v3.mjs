// 字体加载与渲染验证脚本 v3
// 改用 HTML 页面方式测试

import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';

// 测试字体列表
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
  // 启动一个简单的 HTTP 服务器来提供测试页面
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const results = [];

  for (const font of fontsToTest) {
    const page = await context.newPage();
    
    // 先访问空白页，然后动态注入字体
    await page.goto('about:blank');
    
    const result = await page.evaluate((fontData) => {
      return new Promise((resolve) => {
        const cssUrl = fontData.cssUrl || 
          `https://fonts.googleapis.com/css2?family=${fontData.googleFontName}&display=swap`;
        
        // 注入样式表
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssUrl;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
        
        let done = false;
        const timeoutMs = 8000;
        const startTime = Date.now();
        
        link.onload = () => {
          if (done) return;
          // CSS 加载完成后，检查字体
          const family = fontData.family;
          const text = fontData.preview;
          
          // 等待字体就绪
          setTimeout(async () => {
            try {
              await document.fonts.ready;
              await document.fonts.load(`24px "${family}"`, text);
            } catch (e) {
              // ignore
            }
            
            // 检查字体是否可渲染
            const canRender = document.fonts.check(`24px "${family}"`, text);
            
            // 检查字体是否注册
            let fontRegistered = false;
            try {
              for (const f of document.fonts) {
                if (f.family === family) {
                  fontRegistered = true;
                  break;
                }
              }
            } catch (e) {
              // ignore
            }
            
            done = true;
            resolve({ cssLoaded: true, canRender, fontRegistered, family });
          }, 1500);
        };
        
        link.onerror = () => {
          if (done) return;
          done = true;
          resolve({ cssLoaded: false, canRender: false, fontRegistered: false, family: fontData.family, error: 'CSS加载失败' });
        };
        
        // 超时兜底
        setTimeout(() => {
          if (!done) {
            done = true;
            // 即使超时也检查一下
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

    await page.close();
  }

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
