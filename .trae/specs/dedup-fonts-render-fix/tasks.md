# Tasks

- [x] Task 1: 精简 fonts.ts 去重同系列字体
  - [x] SubTask 1.1: 分析当前154个字体，识别同系列重复组（獅尾、霞鹜、悠哉、思源、站酷、平方、cn-fontsource 等）
  - [x] SubTask 1.2: 獅尾系列从40+个精简到3个（保留：獅尾黑体标准、獅尾腿黑体、獅尾糖黑体/肉丸黑体）
  - [x] SubTask 1.3: 霞鹜文楷系列从7个精简到3个（保留：霞鹜文楷 Regular、Light、Mono）
  - [x] SubTask 1.4: 悠哉系列从4个精简到1个（保留：悠哉 Regular）
  - [x] SubTask 1.5: 思源系列去重（Noto Sans SC/TC/HK 保留，去掉 Source Han Sans CN 等重复）
  - [x] SubTask 1.6: cn-fontsource 系列去重（与 @chinese-fonts CDN 重复的只保留一个来源）
  - [x] SubTask 1.7: 其他系列检查去重（LXGW Bright、站酷、平方、鸿雷行书等）
  - [x] SubTask 1.8: 确保精简后总数约80-100个，覆盖14个分类

- [x] Task 2: 修复 FontPicker 字体预览渲染
  - [x] SubTask 2.1: 修改 FontPicker 字体项，使用 Intersection Observer 或即时加载策略触发字体加载
  - [x] SubTask 2.2: 字体项在字体未加载完成前显示普通文本，加载完成后应用 font-family
  - [x] SubTask 2.3: 添加加载状态指示（如淡入效果或加载标记）
  - [x] SubTask 2.4: 加载失败时降级显示，不强制应用 font-family

- [x] Task 3: 验证 fontLoader.ts 支持按需加载
  - [x] SubTask 3.1: 确认 loadFontAsync 支持单个字体按需加载
  - [x] SubTask 3.2: 确认 isFontLoaded 可以检查单个字体状态
  - [x] SubTask 3.3: 预加载策略改为只加载视口内字体，而非全部150个

- [x] Task 4: 构建并验证
  - [x] SubTask 4.1: npm run build 通过
  - [x] SubTask 4.2: 字体数量在80-100之间
  - [x] SubTask 4.3: 无重复 name 或 displayName
  - [x] SubTask 4.4: 预览中字体选择器显示正确，字体项能以自身字形渲染

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1
- Task 4 depends on Task 2, Task 3
