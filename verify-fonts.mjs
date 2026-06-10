// 真实验证字体可渲染性
// 1. 先验证 CSS URL 可访问
// 2. 再验证字体能否真正渲染（通过 Canvas 像素差异对比）
import { chromium } from 'playwright';

const FONTS_TO_TEST = [
  // === Google Fonts ===
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

  // === CDN (@chinese-fonts on jsDelivr) ===
  { name: 'LXGW WenKai', family: 'LXGW WenKai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/lxgwwenkai@latest/dist/LXGWWenKai-Regular/result.css', preview: '霞鹜文楷', category: 'chinese' },
  { name: 'Cubic 11', family: 'Cubic 11', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cubic@latest/dist/Cubic/result.css', preview: 'Cubic 11', category: 'chinese' },
  { name: 'Smiley Sans Oblique', family: 'Smiley Sans Oblique', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/dyh@latest/dist/SmileySans-Oblique/result.css', preview: '得意黑', category: 'chinese' },
  { name: 'Maoken Assorted Sans', family: 'MaokenAssortedSans', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mksjh@latest/dist/MaokenAssortedSans/result.css', preview: '猫啃什锦黑', category: 'chinese' },
  { name: 'Tiejili', family: 'Tiejili', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/tjl@latest/dist/Tiejili_Regular/result.css', preview: '铁蒺藜体', category: 'chinese' },
  { name: 'Youshi Youran', family: 'slideyouran', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysyrxk@latest/dist/slideyouran-Regular2_0/result.css', preview: '演示悠然小楷', category: 'chinese' },
  { name: 'Maoken Tangyuan', family: 'MaoKenTangYuan', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mkwtyt@latest/dist/MaoKenTangYuan/result.css', preview: '猫啃网糖圆体', category: 'chinese' },
  { name: 'Source Han Serif CN', family: 'Source Han Serif CN VF', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/syst@latest/dist/SourceHanSerifCN/result.css', preview: '思源宋体 CN', category: 'chinese' },
  { name: 'Youshi Foxi', family: 'Slidefu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/ysfxt@latest/dist/Slidefu-Regular/result.css', preview: '演示佛系体', category: 'chinese' },
  { name: 'Yozai', family: 'Yozai', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yozai@latest/dist/Yozai-Regular/result.css', preview: '悠哉', category: 'chinese' },
  { name: 'Muzai Pixel', family: 'MuzaiPixel', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/mzxst@latest/dist/MZPXorig/result.css', preview: '目哉像素体', category: 'chinese' },
  { name: 'Zhuque Fangsong', family: 'Zhuque Fangsong', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/zqfs@latest/dist/ZhuqueFangsong-Regular/result.css', preview: '朱雀仿宋', category: 'chinese' },
  { name: 'CEF Fonts CJK Mono', family: 'CEF Fonts CJK Mono', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/cef@latest/dist/CEFFontsCJKMono-Regular/result.css', preview: 'CEF 编程等宽字体', category: 'chinese' },
  { name: 'Kuaikan Shijieti', family: 'kuaikanshijieti', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/kksjt@latest/dist/kuaikanshijieti20231213/result.css', preview: '快看世界体', category: 'chinese' },
  { name: 'YuFan XinYu', family: 'YuFanXinYu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/yfxy@latest/dist/YuFanXinYu-Regular/result.css', preview: '余繁新语', category: 'chinese' },
  { name: 'Xuandong Kaishu', family: 'XuandongKaishu', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/xuandongkaishu@latest/dist/XuandongKaishu/result.css', preview: '玄冬楷书', category: 'chinese' },
  { name: 'JUNJUN', family: 'JUNJUN', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/jnjj@latest/dist/JUNJUN/result.css', preview: '荆南俊俊体', category: 'chinese' },
  { name: 'NZGR Kangxi', family: 'nzgrKangxi', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/rzjkxzdmh@latest/dist/nzgrKangxi/result.css', preview: '润植家康熙字典美化体', category: 'chinese' },
  { name: 'Quan Pixel', family: 'QuanPixel 8px', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/qxs@latest/dist/quan/result.css', preview: '全小素像素体', category: 'chinese' },

  // === 日文 ===
  { name: 'Noto Serif JP', family: 'Noto Serif JP', googleFontName: 'Noto Serif JP', preview: '日本語明朝体', category: 'japanese' },
  { name: 'Noto Sans JP', family: 'Noto Sans JP', googleFontName: 'Noto Sans JP', preview: '日本語ゴシック', category: 'japanese' },
  { name: 'M PLUS Rounded 1c', family: 'M PLUS Rounded 1c', googleFontName: 'M PLUS Rounded 1c', preview: '日本語書体', category: 'japanese' },
  { name: 'M PLUS 1p', family: 'M PLUS 1p', googleFontName: 'M PLUS 1p', preview: '日本語書体', category: 'japanese' },

  // === 韩文 ===
  { name: 'Hangeuljaemin', family: 'Hangeuljaemin4.0', cssUrl: 'https://cdn.jsdelivr.net/npm/@chinese-fonts/hqzmt@latest/dist/Hangeuljaemin4-Regular/result.css', preview: '한글 제목', category: 'korean' },
  { name: 'Noto Sans KR', family: 'Noto Sans KR', googleFontName: 'Noto Sans KR', preview: '한글', category: 'korean' },
  { name: 'Noto Serif KR', family: 'Noto Serif KR', googleFontName: 'Noto Serif KR', preview: '한글', category: 'korean' },
  { name: 'Nanum Gothic', family: 'Nanum Gothic', googleFontName: 'Nanum Gothic', preview: '나눔 고딕', category: 'korean' },

  // === 英文 ===
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
  const page = await context.newPage();
  await page.goto('about:blank');

  const results = [];
  console.log(`\n=== 开始测试 ${FONTS_TO_TEST.length} 个字体 ===\n`);

  for (let i = 0; i < FONTS_TO_TEST.length; i++) {
    const font = FONTS_TO_TEST[i];
    const cssUrl = font.cssUrl || `https://fonts.googleapis.com/css2?family=${font.googleFontName}&display=swap`;

    try {
      const result = await page.evaluate(async (data) => {
        // 清理之前的 link 标签（保留但重置）
        const prevLinks = document.querySelectorAll('link[data-testfont]');
        prevLinks.forEach(l => l.remove());

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = data.cssUrl;
        link.crossOrigin = 'anonymous';
        link.setAttribute('data-testfont', '1');
        document.head.appendChild(link);

        return new Promise((resolve) => {
          let done = false;
          const finish = (state) => {
            if (done) return;
            done = true;
            resolve(state);
          };

          link.onload = async () => {
            try {
              await document.fonts.ready;
              // 尝试加载字体（触发字体下载）
              const fontSpec = `24px "${data.family}"`;
              try {
                await document.fonts.load(fontSpec, data.preview);
              } catch (e) {}

              // 等待一点时间让字体就绪
              await new Promise(r => setTimeout(r, 1500));

              // 检查字体是否被注册
              let registered = false;
              try {
                for (const f of document.fonts) {
                  if (f.family === data.family) { registered = true; break; }
                }
              } catch (e) {}

              // 检查能否渲染
              let canRender = false;
              try {
                canRender = document.fonts.check(fontSpec, data.preview);
              } catch (e) {}

              // 用 Canvas 对比：如果该字体与系统字体渲染不同，说明字体真的生效了
              let hasVisualDiff = false;
              try {
                const canvas = document.createElement('canvas');
                canvas.width = 300;
                canvas.height = 60;
                const ctx = canvas.getContext('2d');

                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#000000';
                ctx.font = `32px "${data.family}", sans-serif`;
                ctx.textBaseline = 'top';
                ctx.fillText(data.preview, 10, 10);
                const imgData1 = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.font = '32px serif';
                ctx.fillText(data.preview, 10, 10);
                const imgData2 = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

                let diff = 0;
                for (let j = 0; j < imgData1.length; j += 4) {
                  if (imgData1[j] !== imgData2[j] || imgData1[j+1] !== imgData2[j+1] || imgData1[j+2] !== imgData2[j+2]) {
                    diff++;
                  }
                }
                hasVisualDiff = diff > 50;
              } catch (e) {}

              finish({
                cssLoaded: true,
                fontRegistered: registered,
                canRender: canRender,
                visualDiff: hasVisualDiff,
                family: data.family,
              });
            } catch (e) {
              finish({ cssLoaded: true, error: String(e), family: data.family, fontRegistered: false, canRender: false, visualDiff: false });
            }
          };

          link.onerror = () => {
            finish({ cssLoaded: false, error: 'CSS load error', family: data.family, fontRegistered: false, canRender: false, visualDiff: false });
          };

          setTimeout(() => {
            finish({ cssLoaded: false, error: 'timeout 10s', family: data.family, fontRegistered: false, canRender: false, visualDiff: false });
          }, 10000);
        });
      }, { ...font, cssUrl });

      const source = font.cssUrl ? 'CDN' : 'Google';
      const ok = result.visualDiff || result.canRender;
      results.push({
        name: font.name,
        family: font.family,
        source,
        category: font.category,
        cssLoaded: result.cssLoaded,
        fontRegistered: result.fontRegistered,
        canRender: result.canRender,
        visualDiff: result.visualDiff,
        ok: ok,
        googleFontName: font.googleFontName,
        cssUrl: font.cssUrl,
        preview: font.preview,
        error: result.error,
      });

      const status = ok ? '✓' : '✗';
      console.log(`[${i + 1}/${FONTS_TO_TEST.length}] ${status} ${font.name} [${source}/${font.category}]` +
                  (result.error ? ` ERROR: ${result.error}` : '') +
                  ` visualDiff=${result.visualDiff} canRender=${result.canRender} registered=${result.fontRegistered}`);
    } catch (e) {
      results.push({
        name: font.name,
        family: font.family,
        source: font.cssUrl ? 'CDN' : 'Google',
        category: font.category,
        ok: false,
        cssLoaded: false,
        fontRegistered: false,
        canRender: false,
        visualDiff: false,
        googleFontName: font.googleFontName,
        cssUrl: font.cssUrl,
        preview: font.preview,
        error: String(e),
      });
      console.log(`[${i + 1}/${FONTS_TO_TEST.length}] ✗ ${font.name} - ERROR: ${String(e).slice(0, 60)}`);
    }
  }

  await browser.close();

  // 汇总
  const ok = results.filter(r => r.ok);
  const fail = results.filter(r => !r.ok);

  console.log('\n=========== 最终统计 ===========');
  console.log(`总计: ${results.length}`);
  console.log(`✓ 可渲染: ${ok.length}`);
  console.log(`✗ 不可渲染: ${fail.length}`);

  console.log('\n=========== 不可渲染字体列表 ===========');
  fail.forEach(r => {
    console.log(`  - ${r.name} (family: "${r.family}") [${r.source}/${r.category}]` +
                (r.error ? ` - ${r.error}` : ''));
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
      console.log(`  - ${r.name}`);
      console.log(`    family: "${r.family}"`);
      if (r.googleFontName) console.log(`    googleFontName: "${r.googleFontName}"`);
      if (r.cssUrl) console.log(`    cssUrl: "${r.cssUrl}"`);
      console.log(`    previewText: "${r.preview}"`);
    });
  }

  // 打印 JSON 格式供复制
  console.log('\n=========== JSON 输出 ===========');
  const jsonOut = ok.map(r => ({
    name: r.name,
    family: r.family,
    ...(r.googleFontName ? { googleFontName: r.googleFontName } : {}),
    ...(r.cssUrl ? { cssUrl: r.cssUrl } : {}),
    category: r.category,
    previewText: r.preview,
  }));
  console.log(JSON.stringify(jsonOut, null, 2));
}

main().catch(console.error);
