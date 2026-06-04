# 编辑器字体选择器 Spec

## Why
当前编辑器支持字体大小调整，但不支持字体族（font-family）切换。用户希望在不同场景下使用不同风格的字体，如书写体、哥特风、可爱风等。增加字体选择功能可以提升编辑器的表达能力和用户体验。

## What Changes
- 在 `RichTextEditor.tsx` 工具栏的撤销图标后面增加一个字体选择下拉框
- 使用 Google Fonts 免费可商用字体，通过 CSS `@import` 加载
- 字体列表包含中文字体 30+ 个，英文字体 70+ 个，总计超过 100 个
- 下拉框支持上下滑动浏览，按字体风格分类展示
- 选中字体后应用到编辑器内容区域
- 字体选择需要持久化到页面数据中

## Impact
- Affected specs: 富文本编辑器功能
- Affected code: `src/components/RichTextEditor.tsx`, `src/index.css`, `src/data/initialData.ts`, `src/hooks/useAppState.ts`

## ADDED Requirements
### Requirement: 字体选择器组件
The system SHALL 在编辑器工具栏中提供一个字体选择下拉框，支持浏览和选择超过 100 种免费可商用字体。

#### Scenario: 打开字体选择器
- **WHEN** 用户点击工具栏中的字体选择按钮
- **THEN** 显示下拉面板，展示字体列表，支持上下滑动浏览
- **THEN** 字体按风格分类展示（手写、哥特、可爱、衬线、无衬线、等宽等）

#### Scenario: 选择字体
- **WHEN** 用户点击某个字体
- **THEN** 下拉面板关闭
- **THEN** 编辑器内容区域的字体切换为选中的字体
- **THEN** 字体选择持久化到页面数据中

### Requirement: 字体列表
The system SHALL 提供超过 100 种免费可商用字体，其中中文字体不少于 30 个。

#### Scenario: 浏览字体列表
- **WHEN** 用户打开字体选择器
- **THEN** 可以看到按风格分类的字体列表
- **THEN** 中文字体包括：思源宋体、思源黑体、站酷系列、庞门正道、优设标题黑、仓耳渔阳体、霞鹜文楷、演示系列、鸿雷板书、钟齐志莽行书、有字库龙藏体、小赖体、悠哉、沐瑶软笔手写、清松手写、江西拙楷、杨任东竹石体、联盟起艺卢帅正锐黑体、胡晓波男神体、胡晓波真帅体、阿朱泡泡体、峰广明锐体、卓健橄榄简体、千图厚黑体、千图纤墨体、猫啃网糖圆体、猫啃网故障黑体、包图小白体、优设好身体、站酷庆科黄油体、站酷快乐体等
- **THEN** 英文字体包括：Roboto、Open Sans、Lato、Montserrat、Poppins、Playfair Display、Merriweather、Oswald、Raleway、Nunito、Bebas Neue、Lobster、Pacifico、Dancing Script、Great Vibes、Cinzel、Old English Text MT、Blackletter、Gothic、Creepster、Bangers、Fredoka One、Comic Neue、Quicksand、Josefin Sans、Abril Fatface、Alfa Slab One、Righteous、Permanent Marker、Shadows Into Light、Satisfy、Kaushan Script、Courgette、Sacramento、Amatic SC、Caveat、Indie Flower、Gloria Hallelujah、Handlee、Kalam、Nothing You Could Do、Reenie Beanie、Zeyada、Allura、Tangerine、Parisienne、Alex Brush、Birthstone、Mrs Saint Delafield、Herr Von Muellerhoff、Pinyon Script、Rouge Script、Italianno、Qwigley、Vibur、Lovers Quarrel、Meddon、Monsieur La Doulaise、Petit Formal Script、Stalemate、WindSong、Yesteryear、Bonheur Royale、Euphoria Script、Qwitcher Grypen、Meow Script、Rubik Bubbles、Cherry Bomb One、Mochiy Pop One、Kosugi Maru、M PLUS Rounded 1c、Zen Maru Gothic、Yusei Magic、Klee One、New Tegomin、DotGothic16、Reggae One、RocknRoll One、Stick、Train One、Hachi Maru Pop、Mochiy Pop P One、Nico Moji、Potta One、Rampart One、Shizuru、Yomogi、Zen Kurenaido、Delius、Itim、Short Stack、Sniglet、Baloo 2、Varela Round、Nunito Sans、Work Sans、Source Sans 3、Inter、Manrope、Outfit、Space Grotesk、Syne、Sora、DM Sans、Plus Jakarta Sans、Red Hat Display、Urbanist、Figtree、Geist、Geist Mono、JetBrains Mono、Fira Code、Cascadia Code、IBM Plex Mono、Source Code Pro、Inconsolata、Space Mono、Ubuntu Mono、Courier Prime、Roboto Mono、Anonymous Pro、VT323、Press Start 2P、Share Tech Mono等
# 编辑器字体选择器 Spec

## Why
当前编辑器支持字体大小调整，但不支持字体族（font-family）切换。用户希望在不同场景下使用不同风格的字体，如书写体、哥特风、可爱风等。增加字体选择功能可以提升编辑器的表达能力和用户体验。

## What Changes
- 在 `RichTextEditor.tsx` 工具栏的撤销图标后面增加一个字体选择下拉框
- 使用 Google Fonts 免费可商用字体，通过 CSS `@import` 加载
- 字体列表包含中文字体 30+ 个，英文字体 70+ 个，总计超过 100 个
- 下拉框支持上下滑动浏览，按字体风格分类展示
- 选中字体后应用到编辑器内容区域
- 字体选择需要持久化到页面数据中

## Impact
- Affected specs: 富文本编辑器功能
- Affected code: `src/components/RichTextEditor.tsx`, `src/index.css`, `src/data/initialData.ts`, `src/hooks/useAppState.ts`

## ADDED Requirements
### Requirement: 字体选择器组件
The system SHALL 在编辑器工具栏中提供一个字体选择下拉框，支持浏览和选择超过 100 种免费可商用字体。

#### Scenario: 打开字体选择器
- **WHEN** 用户点击工具栏中的字体选择按钮
- **THEN** 显示下拉面板，展示字体列表，支持上下滑动浏览
- **THEN** 字体按风格分类展示（手写、哥特、可爱、衬线、无衬线、等宽等）

#### Scenario: 选择字体
- **WHEN** 用户点击某个字体
- **THEN** 下拉面板关闭
- **THEN** 编辑器内容区域的字体切换为选中的字体
- **THEN** 字体选择持久化到页面数据中

### Requirement: 字体列表
The system SHALL 提供超过 100 种免费可商用字体，其中中文字体不少于 30 个。

#### Scenario: 浏览字体列表
- **WHEN** 用户打开字体选择器
- **THEN** 可以看到按风格分类的字体列表
- **THEN** 中文字体包括：思源宋体、思源黑体、站酷系列、庞门正道、优设标题黑、仓耳渔阳体、霞鹜文楷、演示系列、鸿雷板书、钟齐志莽行书、有字库龙藏体、小赖体、悠哉、沐瑶软笔手写、清松手写、江西拙楷、杨任东竹石体、联盟起艺卢帅正锐黑体、胡晓波男神体、胡晓波真帅体、阿朱泡泡体、峰广明锐体、卓健橄榄简体、千图厚黑体、千图纤墨体、猫啃网糖圆体、猫啃网故障黑体、包图小白体、优设好身体、站酷庆科黄油体、站酷快乐体等
- **THEN** 英文字体包括：Roboto、Open Sans、Lato、Montserrat、Poppins、Playfair Display、Merriweather、Oswald、Raleway、Nunito、Bebas Neue、Lobster、Pacifico、Dancing Script、Great Vibes、Cinzel、Old English Text MT、Blackletter、Gothic、Creepster、Bangers、Fredoka One、Comic Neue、Quicksand、Josefin Sans、Abril Fatface、Alfa Slab One、Righteous、Permanent Marker、Shadows Into Light、Satisfy、Kaushan Script、Courgette、Sacramento、Amatic SC、Caveat、Indie Flower、Gloria Hallelujah、Handlee、Kalam、Nothing You Could Do、Reenie Beanie、Zeyada、Allura、Tangerine、Parisienne、Alex Brush、Birthstone、Mrs Saint Delafield、Herr Von Muellerhoff、Pinyon Script、Rouge Script、Italianno、Qwigley、Vibur、Lovers Quarrel、Meddon、Monsieur La Doulaise、Petit Formal Script、Stalemate、WindSong、Yesteryear、Bonheur Royale、Euphoria Script、Qwitcher Grypen、Meow Script、Rubik Bubbles、Cherry Bomb One、Mochiy Pop One、Kosugi Maru、M PLUS Rounded 1c、Zen Maru Gothic、Yusei Magic、Klee One、New Tegomin、DotGothic16、Reggae One、RocknRoll One、Stick、Train One、Hachi Maru Pop、Mochiy Pop P One、Nico Moji、Potta One、Rampart One、Shizuru、Yomogi、Zen Kurenaido、Delius、Itim、Short Stack、Sniglet、Baloo 2、Varela Round、Nunito Sans、Work Sans、Source Sans 3、Inter、Manrope、Outfit、Space Grotesk、Syne、Sora、DM Sans、Plus Jakarta Sans、Red Hat Display、Urbanist、Figtree、Geist、Geist Mono、JetBrains Mono、Fira Code、Cascadia Code、IBM Plex Mono、Source Code Pro、Inconsolata、Space Mono、Ubuntu Mono、Courier Prime、Roboto Mono、Anonymous Pro、VT323、Press Start 2P、Share Tech Mono等
