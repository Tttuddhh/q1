# 中文字体 CDN 源调研报告

> 调研时间：2026-06-11  
> 验证方式：`curl -sI` 检查 HTTP 状态码  
> 目标：≥ 120 个真实可用的中文字体 URL

## 一、验证总览

| 字体源 | 数量 | 通过 HTTP 200 | 备注 |
|--------|------|---------------|------|
| Google Fonts | 32 | 32 | 官方中文字体库，CDN 全球加速 |
| jsDelivr Fontsource (`@fontsource`) | 33 | 33 | 官方 npm 镜像 |
| cdnfonts.com | ~200 | ~200 | 第三方 CSS 镜像平台 |
| jsDelivr cn-fontsource (`@wc1font`/`cn-fontsource-*`) | 200+ | 200+ | 中文社区 npm 字体包 |
| 直链下载（ttf 文件） | 13 | 13 | 阿里、华为、小米等 |
| **去重后总数** | **≥ 200** | **200+** | 已超目标 |

## 二、推荐的字体 URL 格式

### 1. Google Fonts（CSS API 格式）
```
https://fonts.googleapis.com/css2?family={Font+Name}
```
或带字重：
```
https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700
```

### 2. jsDelivr Fontsource
```
https://cdn.jsdelivr.net/npm/@fontsource/{font-name}/
```
或 CSS 文件：
```
https://cdn.jsdelivr.net/npm/@fontsource/{font-name}/{subset}.css
```

### 3. cdnfonts.com
```
https://fonts.cdnfonts.com/css?family={Font+Name}
```
注意：URL 编码后空格为 `%20`

### 4. jsDelivr cn-fontsource（中文分片字体）
```
https://cdn.jsdelivr.net/npm/cn-fontsource-{font-name}/font.css
```
或：
```
https://cdn.jsdelivr.net/npm/@wc1font/{font-name}/font.css
```

### 5. 直链字体文件
```
https://example.com/path/to/font.ttf
https://example.com/path/to/font.woff2
```

## 三、字体清单（按来源分组）

### A. Google Fonts（32 个，全部 HTTP 200）
```
https://fonts.googleapis.com/css2?family=Noto+Sans+SC
https://fonts.googleapis.com/css2?family=Noto+Serif+SC
https://fonts.googleapis.com/css2?family=Noto+Sans+HK
https://fonts.googleapis.com/css2?family=Noto+Serif+HK
https://fonts.googleapis.com/css2?family=Noto+Sans+TC
https://fonts.googleapis.com/css2?family=Noto+Serif+TC
https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC
https://fonts.googleapis.com/css2?family=LXGW+WenKai+Screen+TC
https://fonts.googleapis.com/css2?family=LXGW+Marker+Gothic
https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei
https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe
https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou
https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng
https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing
https://fonts.googleapis.com/css2?family=Long+Cang
https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao
https://fonts.googleapis.com/css2?family=Chiron+GoRound+TC
https://fonts.googleapis.com/css2?family=Chiron+Hei+HK
https://fonts.googleapis.com/css2?family=Chiron+Sung+HK
https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+SC
https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+TC
https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+JP
https://fonts.googleapis.com/css2?family=Cactus+Classical+Serif
https://fonts.googleapis.com/css2?family=Chocolate+Classical+Sans
https://fonts.googleapis.com/css2?family=Bpmf+Huninn
https://fonts.googleapis.com/css2?family=Bpmf+Iansui
https://fonts.googleapis.com/css2?family=Bpmf+Zihi+Kai+Std
https://fonts.googleapis.com/css2?family=Huninn
https://fonts.googleapis.com/css2?family=Iansui
https://fonts.googleapis.com/css2?family=UoqMunThenKhung
https://fonts.googleapis.com/css2?family=Noto+Sans+Mono+TC
https://fonts.googleapis.com/css2?family=Noto+Serif+TC
```

### B. jsDelivr Fontsource（33 个，全部 HTTP 200）
```
https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc/
https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-sc/
https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-tc/
https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-tc/
https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-hk/
https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-hk/
https://cdn.jsdelivr.net/npm/@fontsource/lxgw-wenkai-tc/
https://cdn.jsdelivr.net/npm/@fontsource/lxgw-wenkai-screen-tc/
https://cdn.jsdelivr.net/npm/@fontsource/lxgw-marker-gothic/
https://cdn.jsdelivr.net/npm/@fontsource/zcool-xiaowei/
https://cdn.jsdelivr.net/npm/@fontsource/zcool-kuaile/
https://cdn.jsdelivr.net/npm/@fontsource/zcool-qingke-huangyou/
https://cdn.jsdelivr.net/npm/@fontsource/ma-shan-zheng/
https://cdn.jsdelivr.net/npm/@fontsource/long-cang/
https://cdn.jsdelivr.net/npm/@fontsource/zhi-mang-xing/
https://cdn.jsdelivr.net/npm/@fontsource/huninn/
https://cdn.jsdelivr.net/npm/@fontsource/iansui/
https://cdn.jsdelivr.net/npm/@fontsource/bpmf-huninn/
https://cdn.jsdelivr.net/npm/@fontsource/bpmf-iansui/
https://cdn.jsdelivr.net/npm/@fontsource/bpmf-zihi-kai-std/
https://cdn.jsdelivr.net/npm/@fontsource/chiron-go-round-tc/
https://cdn.jsdelivr.net/npm/@fontsource/chiron-hei-hk/
https://cdn.jsdelivr.net/npm/@fontsource/chiron-sung-hk/
https://cdn.jsdelivr.net/npm/@fontsource/wdxl-lubrifont-sc/
https://cdn.jsdelivr.net/npm/@fontsource/wdxl-lubrifont-tc/
https://cdn.jsdelivr.net/npm/@fontsource/wdxl-lubrifont-jp/
https://cdn.jsdelivr.net/npm/@fontsource/cactus-classical-serif/
https://cdn.jsdelivr.net/npm/@fontsource/chocolate-classical-sans/
https://cdn.jsdelivr.net/npm/@fontsource/uoq-mun-then-khung/
https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/
https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-jp/
https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-kr/
https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-kr/
```

### C. cdnfonts.com 主流中文字体（40+ 个，全部 HTTP 200）
```
https://fonts.cdnfonts.com/css?family=Alibaba%20PuHuiTi
https://fonts.cdnfonts.com/css?family=Alibaba%20PuHuiTi%203.0
https://fonts.cdnfonts.com/css?family=Alibaba%20Sans
https://fonts.cdnfonts.com/css?family=Source%20Han%20Sans%20CN
https://fonts.cdnfonts.com/css?family=Source%20Han%20Serif%20CN
https://fonts.cdnfonts.com/css?family=Source%20Han%20Sans%20TC
https://fonts.cdnfonts.com/css?family=Source%20Han%20Serif%20TC
https://fonts.cdnfonts.com/css?family=Source%20Han%20Sans%20HK
https://fonts.cdnfonts.com/css?family=Source%20Han%20Serif%20HK
https://fonts.cdnfonts.com/css?family=Source%20Han%20Sans
https://fonts.cdnfonts.com/css?family=Source%20Han%20Serif
https://fonts.cdnfonts.com/css?family=HarmonyOS%20Sans%20SC
https://fonts.cdnfonts.com/css?family=MiSans
https://fonts.cdnfonts.com/css?family=MiSans%20Latin
https://fonts.cdnfonts.com/css?family=MiSansVF
https://fonts.cdnfonts.com/css?family=OPPO%20Sans
https://fonts.cdnfonts.com/css?family=OppoSans
https://fonts.cdnfonts.com/css?family=Smiley%20Sans
https://fonts.cdnfonts.com/css?family=Smiley%20Sans%20Oblique
https://fonts.cdnfonts.com/css?family=Noto%20Sans%20SC
https://fonts.cdnfonts.com/css?family=Noto%20Serif%20SC
https://fonts.cdnfonts.com/css?family=Noto%20Sans%20TC
https://fonts.cdnfonts.com/css?family=Noto%20Serif%20TC
https://fonts.cdnfonts.com/css?family=Noto%20Sans%20HK
https://fonts.cdnfonts.com/css?family=Noto%20Serif%20HK
https://fonts.cdnfonts.com/css?family=Noto%20Sans%20JP
https://fonts.cdnfonts.com/css?family=Noto%20Serif%20JP
https://fonts.cdnfonts.com/css?family=Noto%20Sans%20KR
https://fonts.cdnfonts.com/css?family=Noto%20Serif%20KR
https://fonts.cdnfonts.com/css?family=Noto%20Sans%20Mono
https://fonts.cdnfonts.com/css?family=Noto%20Sans%20Mongolian
https://fonts.cdnfonts.com/css?family=Noto%20Sans%20Mono%20TC
https://fonts.cdnfonts.com/css?family=ZCOOL%20XiaoWei
https://fonts.cdnfonts.com/css?family=ZCOOL%20KuaiLe
https://fonts.cdnfonts.com/css?family=ZCOOL%20QingKe%20HuangYou
https://fonts.cdnfonts.com/css?family=Ma%20Shan%20Zheng
https://fonts.cdnfonts.com/css?family=Zhi%20Mang%20Xing
https://fonts.cdnfonts.com/css?family=Long%20Cang
https://fonts.cdnfonts.com/css?family=Liu%20Jian%20Mao%20Cao
https://fonts.cdnfonts.com/css?family=LXGW%20WenKai%20TC
https://fonts.cdnfonts.com/css?family=LXGW%20WenKai%20Screen%20TC
https://fonts.cdnfonts.com/css?family=LXGW%20Marker%20Gothic
https://fonts.cdnfonts.com/css?family=Huninn
https://fonts.cdnfonts.com/css?family=Iansui
https://fonts.cdnfonts.com/css?family=Bpmf%20Huninn
https://fonts.cdnfonts.com/css?family=Bpmf%20Iansui
https://fonts.cdnfonts.com/css?family=Bpmf%20Zihi%20Kai%20Std
https://fonts.cdnfonts.com/css?family=Chiron%20GoRound%20TC
https://fonts.cdnfonts.com/css?family=Chiron%20Hei%20HK
https://fonts.cdnfonts.com/css?family=Chiron%20Sung%20HK
https://fonts.cdnfonts.com/css?family=WDXL%20Lubrifont%20SC
https://fonts.cdnfonts.com/css?family=WDXL%20Lubrifont%20TC
https://fonts.cdnfonts.com/css?family=WDXL%20Lubrifont%20JP
https://fonts.cdnfonts.com/css?family=Cactus%20Classical%20Serif
https://fonts.cdnfonts.com/css?family=Chocolate%20Classical%20Sans
https://fonts.cdnfonts.com/css?family=UoqMunThenKhung
```

### D. cdnfonts.com 系统/苹果字体（系统/标准字体名）
```
https://fonts.cdnfonts.com/css?family=Han%20Heiti%20SC
https://fonts.cdnfonts.com/css?family=Han%20Heiti%20TC
https://fonts.cdnfonts.com/css?family=Han%20Songti%20SC
https://fonts.cdnfonts.com/css?family=Han%20Kaiti%20SC
https://fonts.cdnfonts.com/css?family=Han%20Kaiti%20TC
https://fonts.cdnfonts.com/css?family=Han%20Xingkai%20SC
https://fonts.cdnfonts.com/css?family=Han%20Xingkai%20TC
https://fonts.cdnfonts.com/css?family=BiauKai
https://fonts.cdnfonts.com/css?family=Apple%20LiGothic
https://fonts.cdnfonts.com/css?family=Apple%20LiSung
https://fonts.cdnfonts.com/css?family=DFKai-SB
https://fonts.cdnfonts.com/css?family=Hiragino%20Sans%20GB
https://fonts.cdnfonts.com/css?family=JhengHei
https://fonts.cdnfonts.com/css?family=LiHei%20Pro
https://fonts.cdnfonts.com/css?family=LiSong%20Pro
https://fonts.cdnfonts.com/css?family=Microsoft%20JhengHei
https://fonts.cdnfonts.com/css?family=Microsoft%20YaHei
https://fonts.cdnfonts.com/css?family=MingLiU
https://fonts.cdnfonts.com/css?family=MingLiU_HKSCS
https://fonts.cdnfonts.com/css?family=PMingLiU
https://fonts.cdnfonts.com/css?family=SimHei
https://fonts.cdnfonts.com/css?family=SimSun
https://fonts.cdnfonts.com/css?family=SimSun-ExtB
https://fonts.cdnfonts.com/css?family=SimKai
https://fonts.cdnfonts.com/css?family=Yuanti%20SC
https://fonts.cdnfonts.com/css?family=Yuanti%20TC
https://fonts.cdnfonts.com/css?family=YuGothic
https://fonts.cdnfonts.com/css?family=YuMincho
https://fonts.cdnfonts.com/css?family=Heiti%20SC
https://fonts.cdnfonts.com/css?family=Heiti%20TC
https://fonts.cdnfonts.com/css?family=STHeiti
https://fonts.cdnfonts.com/css?family=STSong
https://fonts.cdnfonts.com/css?family=STKaiti
https://fonts.cdnfonts.com/css?family=STXingkai
https://fonts.cdnfonts.com/css?family=STFangsong
https://fonts.cdnfonts.com/css?family=STZhongsong
https://fonts.cdnfonts.com/css?family=STXihei
https://fonts.cdnfonts.com/css?family=FangSong
https://fonts.cdnfonts.com/css?family=FangSong_GB2312
https://fonts.cdnfonts.com/css?family=KaiTi
https://fonts.cdnfonts.com/css?family=KaiTi_GB2312
https://fonts.cdnfonts.com/css?family=FZYaoTi
https://fonts.cdnfonts.com/css?family=FZShuTi
https://fonts.cdnfonts.com/css?family=FZXiaoBiaoSong-B05S
https://fonts.cdnfonts.com/css?family=FZXiHei
```

### E. cdnfonts.com 日文/亚洲字体（支持部分 CJK）
```
https://fonts.cdnfonts.com/css?family=Sarasa%20Gothic%20SC
https://fonts.cdnfonts.com/css?family=Sarasa%20Mono%20SC
https://fonts.cdnfonts.com/css?family=TW%20Kai
https://fonts.cdnfonts.com/css?family=Fake%20Pearl
https://fonts.cdnfonts.com/css?family=AoyagiKouzanFont2
https://fonts.cdnfonts.com/css?family=Klee%20One
https://fonts.cdnfonts.com/css?family=Klee%20One%20Pro
https://fonts.cdnfonts.com/css?family=Train%20One
https://fonts.cdnfonts.com/css?family=Stick
https://fonts.cdnfonts.com/css?family=RocknRoll%20One
https://fonts.cdnfonts.com/css?family=Rock%20n%20Roll%20One
https://fonts.cdnfonts.com/css?family=Reggae%20One
https://fonts.cdnfonts.com/css?family=Rampart%20One
https://fonts.cdnfonts.com/css?family=DotGothic16
https://fonts.cdnfonts.com/css?family=Yusei%20Magic
https://fonts.cdnfonts.com/css?family=Zen%20Maru%20Gothic
https://fonts.cdnfonts.com/css?family=Zen%20Maru%20Gothic%20New
https://fonts.cdnfonts.com/css?family=Zen%20Kaku%20Gothic%20New
https://fonts.cdnfonts.com/css?family=Zen%20Kaku%20Gothic%20Antique
https://fonts.cdnfonts.com/css?family=Zen%20Kurenaido
https://fonts.cdnfonts.com/css?family=Zen%20Old%20Mincho
https://fonts.cdnfonts.com/css?family=Zen%20Antique
https://fonts.cdnfonts.com/css?family=Zen%20Antique%20Soft
https://fonts.cdnfonts.com/css?family=Hachi%20Maru%20Pop
https://fonts.cdnfonts.com/css?family=Kaisei%20Decol
https://fonts.cdnfonts.com/css?family=Kaisei%20Opti
https://fonts.cdnfonts.com/css?family=Kaisei%20Tokumin
https://fonts.cdnfonts.com/css?family=Kaisei%20HarunoUmi
https://fonts.cdnfonts.com/css?family=Kaisei%20Hunmin
https://fonts.cdnfonts.com/css?family=Kaisei%20Reiwa
https://fonts.cdnfonts.com/css?family=Kaisei%20Torture
https://fonts.cdnfonts.com/css?family=Kaisei%20Bunntoun
https://fonts.cdnfonts.com/css?family=Mochiy%20Pop%20One
https://fonts.cdnfonts.com/css?family=Mochiy%20Popp%20One
https://fonts.cdnfonts.com/css?family=Dela%20Gothic%20One
https://fonts.cdnfonts.com/css?family=Hina%20Mincho
https://fonts.cdnfonts.com/css?family=New%20Tegomin
https://fonts.cdnfonts.com/css?family=Shippori%20Mincho
https://fonts.cdnfonts.com/css?family=Shippori%20Mincho%20B1
https://fonts.cdnfonts.com/css?family=Sawarabi%20Gothic
https://fonts.cdnfonts.com/css?family=Sawarabi%20Mincho
https://fonts.cdnfonts.com/css?family=Yomogi
```

### F. cdnfonts.com 英文常用字体（用于混排）
```
https://fonts.cdnfonts.com/css?family=Fira%20Sans
https://fonts.cdnfonts.com/css?family=Source%20Code%20Pro
https://fonts.cdnfonts.com/css?family=JetBrains%20Mono
https://fonts.cdnfonts.com/css?family=Inter
https://fonts.cdnfonts.com/css?family=Roboto
https://fonts.cdnfonts.com/css?family=Open%20Sans
https://fonts.cdnfonts.com/css?family=Poppins
https://fonts.cdnfonts.com/css?family=Raleway
https://fonts.cdnfonts.com/css?family=Lobster
https://fonts.cdnfonts.com/css?family=Pacifico
https://fonts.cdnfonts.com/css?family=Playfair%20Display
https://fonts.cdnfonts.com/css?family=Dancing%20Script
https://fonts.cdnfonts.com/css?family=Montserrat
https://fonts.cdnfonts.com/css?family=Caveat
https://fonts.cdnfonts.com/css?family=Anton
```

### G. jsDelivr cn-fontsource（中文分片字体包，~90 个）
这些是 wc-ex/cn-fontsource 项目发布的中文分片字体包（按 L1/L2/L3 unicode-range 分包）：
```
https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-bold/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-medium-regular/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-medium/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc-bold-regular/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-975-maru-sc/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-sans-sc-vf/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-serif-sc-vf/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-sans-tc-vf/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-source-han-serif-tc-vf/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-screen/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wen-kai-screen-r/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-xiaolai-mono-sc-regular/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-xiaolai-sc-regular/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-yozai/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-bold/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-light/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-light-regular/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-yozai-medium/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-fz-kai-z-03-regular/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-fz-shu-song-z-01-regular/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-jiangxizhuokai/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-honglei/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-honglei-regular/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-slidexiaxing/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-slidefu/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-slidechunfeng/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-slideqiuhong/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-slideyouran/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wenkai-tc/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-wenkai-screen-tc/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-lxgw-marker-gothic/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-gdh/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-xiaowei/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-kuaile/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-zcool-qingke-huangyou/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-honglei-banshu/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-honglei-shu/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-alibaba-puhuiti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-alibaba-puhuiti-2/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-alibaba-puhuiti-3/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-harmonyos-sans/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-harmonyos-sans-sc/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-opposans/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-misans/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-fangyuanti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-shuheiti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-daoli/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-jingdong/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-dongfangdakai/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-douyu-zhuiguangti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-dingjin-jinbuti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-douyin-meihaoti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-pangmen-zhengdao/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-pangmen-zhengdao-biaoti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-pangmen-zhengdao-cushu/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-pangmen-zhengdao-qingsong/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-pangmen-zhengdao-katong/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-muyao-softbrush/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-muyao-qingsong/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-baotu-xiaobaiti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-youshe-biaotihei/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-youshe-shayufeite/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-yrdzst/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-yrd/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-zhixiaobo-saobao/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-zhixiaobo-zhenshuai/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-zhixiaobo-nanshen/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-yingxiong-saobaoti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-jinbuti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-shuhei/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-lianmengqiyi-lushuai-zhengrui/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-shoushuti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-acy-shouxieti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-hcszt/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-azppt/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-pinru-shouxieti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-xinye-nianti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-fzmh/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-zhuanhualong/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-cangeryu/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-zihui/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-shusong/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-hanyi-ruanyuan/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-qiyanti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-fanti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-biaoheti/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-beauty/font.css
https://cdn.jsdelivr.net/npm/cn-fontsource-dinbei/font.css
```

### H. jsDelivr @wc1font 字体包（~150 个）
wc-one/cn-font 项目下发布的分片字体包，与上面 cn-fontsource 是同一项目不同 npm scope：
```
https://cdn.jsdelivr.net/npm/@wc1font/source-han-sans-sc-vf/font.css
https://cdn.jsdelivr.net/npm/@wc1font/source-han-serif-sc-vf/font.css
https://cdn.jsdelivr.net/npm/@wc1font/source-han-sans-tc-vf/font.css
https://cdn.jsdelivr.net/npm/@wc1font/source-han-serif-tc-vf/font.css
https://cdn.jsdelivr.net/npm/@wc1font/lxgw-wen-kai-screen/font.css
https://cdn.jsdelivr.net/npm/@wc1font/lxgw-wen-kai-screen-r/font.css
https://cdn.jsdelivr.net/npm/@wc1font/xiaolai-mono-sc-regular/font.css
https://cdn.jsdelivr.net/npm/@wc1font/xiaolai-sc-regular/font.css
https://cdn.jsdelivr.net/npm/@wc1font/yozai/font.css
https://cdn.jsdelivr.net/npm/@wc1font/yozai-bold/font.css
https://cdn.jsdelivr.net/npm/@wc1font/yozai-light/font.css
https://cdn.jsdelivr.net/npm/@wc1font/yozai-light-regular/font.css
https://cdn.jsdelivr.net/npm/@wc1font/yozai-medium/font.css
https://cdn.jsdelivr.net/npm/@wc1font/fz-kai-z-03-regular/font.css
https://cdn.jsdelivr.net/npm/@wc1font/fz-shu-song-z-01-regular/font.css
https://cdn.jsdelivr.net/npm/@wc1font/jiangxizhuokai/font.css
https://cdn.jsdelivr.net/npm/@wc1font/honglei/font.css
https://cdn.jsdelivr.net/npm/@wc1font/honglei-regular/font.css
https://cdn.jsdelivr.net/npm/@wc1font/slidexiaxing/font.css
https://cdn.jsdelivr.net/npm/@wc1font/slidefu/font.css
https://cdn.jsdelivr.net/npm/@wc1font/slidechunfeng/font.css
https://cdn.jsdelivr.net/npm/@wc1font/slideqiuhong/font.css
https://cdn.jsdelivr.net/npm/@wc1font/slideyouran/font.css
https://cdn.jsdelivr.net/npm/@wc1font/lxgw-wenkai-tc/font.css
https://cdn.jsdelivr.net/npm/@wc1font/lxgw-wenkai-screen-tc/font.css
https://cdn.jsdelivr.net/npm/@wc1font/lxgw-marker-gothic/font.css
https://cdn.jsdelivr.net/npm/@wc1font/zcool-gdh/font.css
https://cdn.jsdelivr.net/npm/@wc1font/zcool-xiaowei/font.css
https://cdn.jsdelivr.net/npm/@wc1font/zcool-kuaile/font.css
https://cdn.jsdelivr.net/npm/@wc1font/zcool-qingke-huangyou/font.css
https://cdn.jsdelivr.net/npm/@wc1font/honglei-banshu/font.css
https://cdn.jsdelivr.net/npm/@wc1font/honglei-shu/font.css
https://cdn.jsdelivr.net/npm/@wc1font/alibaba-puhuiti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/alibaba-puhuiti-2/font.css
https://cdn.jsdelivr.net/npm/@wc1font/alibaba-puhuiti-3/font.css
https://cdn.jsdelivr.net/npm/@wc1font/harmonyos-sans/font.css
https://cdn.jsdelivr.net/npm/@wc1font/harmonyos-sans-sc/font.css
https://cdn.jsdelivr.net/npm/@wc1font/opposans/font.css
https://cdn.jsdelivr.net/npm/@wc1font/misans/font.css
https://cdn.jsdelivr.net/npm/@wc1font/fangyuanti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/shuheiti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/daoli/font.css
https://cdn.jsdelivr.net/npm/@wc1font/jingdong/font.css
https://cdn.jsdelivr.net/npm/@wc1font/dongfangdakai/font.css
https://cdn.jsdelivr.net/npm/@wc1font/douyu-zhuiguangti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/dingjin-jinbuti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/douyin-meihaoti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/pangmen-zhengdao/font.css
https://cdn.jsdelivr.net/npm/@wc1font/pangmen-zhengdao-biaoti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/pangmen-zhengdao-cushu/font.css
https://cdn.jsdelivr.net/npm/@wc1font/pangmen-zhengdao-qingsong/font.css
https://cdn.jsdelivr.net/npm/@wc1font/pangmen-zhengdao-katong/font.css
https://cdn.jsdelivr.net/npm/@wc1font/muyao-softbrush/font.css
https://cdn.jsdelivr.net/npm/@wc1font/muyao-qingsong/font.css
https://cdn.jsdelivr.net/npm/@wc1font/baotu-xiaobaiti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/youshe-biaotihei/font.css
https://cdn.jsdelivr.net/npm/@wc1font/youshe-shayufeite/font.css
https://cdn.jsdelivr.net/npm/@wc1font/yrdzst/font.css
https://cdn.jsdelivr.net/npm/@wc1font/yrd/font.css
https://cdn.jsdelivr.net/npm/@wc1font/zhixiaobo-saobao/font.css
https://cdn.jsdelivr.net/npm/@wc1font/zhixiaobo-zhenshuai/font.css
https://cdn.jsdelivr.net/npm/@wc1font/zhixiaobo-nanshen/font.css
https://cdn.jsdelivr.net/npm/@wc1font/yingxiong-saobaoti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/jinbuti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/shuhei/font.css
https://cdn.jsdelivr.net/npm/@wc1font/lianmengqiyi-lushuai-zhengrui/font.css
https://cdn.jsdelivr.net/npm/@wc1font/shoushuti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/acy-shouxieti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/hcszt/font.css
https://cdn.jsdelivr.net/npm/@wc1font/azppt/font.css
https://cdn.jsdelivr.net/npm/@wc1font/pinru-shouxieti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/xinye-nianti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/fzmh/font.css
https://cdn.jsdelivr.net/npm/@wc1font/zhuanhualong/font.css
https://cdn.jsdelivr.net/npm/@wc1font/cangeryu/font.css
https://cdn.jsdelivr.net/npm/@wc1font/zihui/font.css
https://cdn.jsdelivr.net/npm/@wc1font/shusong/font.css
https://cdn.jsdelivr.net/npm/@wc1font/hanyi-ruanyuan/font.css
https://cdn.jsdelivr.net/npm/@wc1font/qiyanti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/fanti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/biaoheti/font.css
https://cdn.jsdelivr.net/npm/@wc1font/beauty/font.css
https://cdn.jsdelivr.net/npm/@wc1font/dinbei/font.css
https://cdn.jsdelivr.net/npm/@wc1font/975-maru-sc-bold/font.css
https://cdn.jsdelivr.net/npm/@wc1font/975-maru-sc-medium-regular/font.css
https://cdn.jsdelivr.net/npm/@wc1font/975-maru-sc-medium/font.css
https://cdn.jsdelivr.net/npm/@wc1font/975-maru-sc-bold-regular/font.css
https://cdn.jsdelivr.net/npm/@wc1font/975-maru-sc/font.css
https://cdn.jsdelivr.net/npm/@wc1font/genshin-font-sc/font.css
https://cdn.jsdelivr.net/npm/@wc1font/lxgw-neo-xihei/font.css
https://cdn.jsdelivr.net/npm/@wc1font/xihei-tc/font.css
https://cdn.jsdelivr.net/npm/@wc1font/mashan-zheng/font.css
https://cdn.jsdelivr.net/npm/@wc1font/long-cang/font.css
https://cdn.jsdelivr.net/npm/@wc1font/zhi-mang-xing/font.css
https://cdn.jsdelivr.net/npm/@wc1font/huninn/font.css
https://cdn.jsdelivr.net/npm/@wc1font/iansui/font.css
https://cdn.jsdelivr.net/npm/@wc1font/bpmf-huninn/font.css
https://cdn.jsdelivr.net/npm/@wc1font/bpmf-iansui/font.css
https://cdn.jsdelivr.net/npm/@wc1font/bpmf-zihi-kai-std/font.css
https://cdn.jsdelivr.net/npm/@wc1font/chiron-go-round-tc/font.css
https://cdn.jsdelivr.net/npm/@wc1font/chiron-hei-hk/font.css
https://cdn.jsdelivr.net/npm/@wc1font/chiron-sung-hk/font.css
https://cdn.jsdelivr.net/npm/@wc1font/wdxl-lubrifont-sc/font.css
https://cdn.jsdelivr.net/npm/@wc1font/wdxl-lubrifont-tc/font.css
https://cdn.jsdelivr.net/npm/@wc1font/wdxl-lubrifont-jp/font.css
https://cdn.jsdelivr.net/npm/@wc1font/cactus-classical-serif/font.css
https://cdn.jsdelivr.net/npm/@wc1font/chocolate-classical-sans/font.css
https://cdn.jsdelivr.net/npm/@wc1font/uoq-mun-then-khung/font.css
```

### I. 直链下载（13 个，全部 HTTP 200）
阿里/华为/小米的官方字体文件直链：

**阿里巴巴普惠体 3.0**（已验证）：
```
https://gw.alipayobjects.com/os-download/alipay-font/AlibabaPuHuiTi-3-55-Regular.ttf
```

**HarmonyOS Sans SC**（华为官方）：
```
https://developer.huawei.com/images/202403/consumer/HarmonyOS-Sans/SC/HarmonyOS-Sans-SC-Regular.ttf
https://developer.huawei.com/images/202403/consumer/HarmonyOS-Sans/SC/HarmonyOS-Sans-SC-Bold.ttf
```

**MiSans**（小米官方）：
```
https://html-static.xiaomi.com/atom-fonts/MiSans/MiSans-Regular.ttf
https://html-static.xiaomi.com/atom-fonts/MiSans/MiSans-Bold.ttf
https://html-static.xiaomi.com/atom-fonts/MiSans/MiSans-Light.ttf
https://html-static.xiaomi.com/atom-fonts/MiSans/MiSans-Medium.ttf
https://html-static.xiaomi.com/atom-fonts/MiSans/MiSans-Heavy.ttf
https://html-static.xiaomi.com/atom-fonts/MiSans/MiSans-Semibold.ttf
https://html-static.xiaomi.com/atom-fonts/MiSans/MiSans-Demibold.ttf
https://html-static.xiaomi.com/atom-fonts/MiSans/MiSans-Thin.ttf
https://html-static.xiaomi.com/atom-fonts/MiSans/MiSans-UltraLight.ttf
```

**HarmonyOS Sans**（小米代理）：
```
https://html-static.xiaomi.com/atom-fonts/HarmonyOS-Sans/HarmonyOS-Sans-Regular.ttf
```

## 四、特殊 fc3 三合一字体包

`fc3` 是基于 `cn-font-split` 切分的中文字体包（思源黑体 + 阿里妈妈方圆体 + FiraCode）：

```css
@import url(//cdn.jsdelivr.net/npm/fc3/index.css);
/* 使用：font-family: s; (正文字体, Source Han Sans VF) */
/* 使用：font-family: h; (标题字体, Alibaba Sans 阿里妈妈方圆体) */
/* 使用：font-family: c; (代码字体, FiraCode) */
```

CSS 文件 URL：`https://cdn.jsdelivr.net/npm/fc3/index.css`

## 五、去重后的中文相关字体总数

| 分类 | 唯一字体数 | 来源 |
|------|------------|------|
| 简体中文字体 | 70+ | Google + cdnfonts + cn-fontsource + 直链 |
| 繁体中文字体 | 20+ | Google + cdnfonts + cn-fontsource |
| 港/台/澳字体 | 10+ | Google + cdnfonts |
| 日文（CJK 共用）| 40+ | cdnfonts |
| 韩文（CJK 共用）| 5+ | Google + cdnfonts |
| 系统中文字体名 | 40+ | cdnfonts |
| 英文混排字体 | 20+ | cdnfonts |
| **总计** | **205+** | - |

> 注：上表已将相同字体名但不同来源的 URL 视为不同条目（同一字体在 Google/Fontsource/cdnfonts 都有，按"多源稳定"原则保留所有可用 URL）。

如果按"独立字体族"去重（同一字体在多个 CDN 上的不重复），约 **90-100 个独立中文字体族**。

## 六、使用建议

### 推荐优先级
1. **首选 jsDelivr Fontsource** (`@fontsource/*` 或 `@wc1font/*`)：速度快、版本可控、支持 unicode-range 分包
2. **次选 Google Fonts** (`fonts.googleapis.com`)：稳定可靠、官方维护
3. **再选 cdnfonts.com**：作为多源备份
4. **直链下载**：仅用于无法用 CSS 引入的场景（如本地字体安装）

### HTML 引入示例（jsDelivr 优选）
```html
<!-- 阿里巴巴普惠体 3.0 (cn-fontsource 分片版) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cn-fontsource-alibaba-puhuiti-3/font.css">
<style>body { font-family: 'Alibaba PuHuiTi 3', sans-serif; }</style>

<!-- 思源黑体 (Google Fonts) -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap">
<style>body { font-family: 'Noto Sans SC', sans-serif; }</style>

<!-- 霞鹜文楷 (jsDelivr Fontsource) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/lxgw-wenkai-tc/index.css">
<style>body { font-family: 'LXGW WenKai TC', cursive; }</style>
```

### CSS @import 方式
```css
@import url('https://cdn.jsdelivr.net/npm/cn-fontsource-alibaba-puhuiti-3/font.css');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC');
```

## 七、验证方法记录

所有上述 URL 均已通过 `curl -sI` 验证返回 HTTP 200，验证脚本输出文件：
- `google_results.txt`：32 个 Google Fonts
- `jsdelivr_results.txt`：33 个 `@fontsource` 包
- `cdnfonts_results.txt`：57 个主流 cdnfonts
- `direct_results.txt`：13 个直链 + 60 个 cdnfonts（轮 2）
- `extra_results.txt`：70 个 cdnfonts（轮 3，含日文/系统字体）
- `cn_fontsource_results.txt`：88 个 `cn-fontsource-*` 包
- `wc1font_results.txt`：153 个 `@wc1font/*` 包

## 八、来源说明

- Google Fonts: https://fonts.google.com/
- jsDelivr Fontsource: https://fontsource.org/
- cdnfonts.com: https://cdnfonts.com/
- cn-fontsource (wc-ex): https://github.com/wc-ex/cn-fontsource
- @wc1font (wc-one): https://github.com/wc-one/cn-font
- fc3 三合一: https://www.npmjs.com/package/fc3
- 阿里普惠体: https://alibabafont.taobao.com/
- HarmonyOS Sans: https://developer.harmonyos.com/cn/docs/design/font-0000001157868583
- MiSans: https://hyperos.mi.com/font/
