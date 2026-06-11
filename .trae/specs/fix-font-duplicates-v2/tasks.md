# 修复字体选择器重复与渲染问题 V2 - Tasks

## [x] Task 1: 删除所有非真正中文字体（日文/韩文）
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 从 fonts.ts 中删除所有日文字体（M PLUS、Zen Kaku Gothic、Shippori Mincho、Kosugi、Dela Gothic One 等）
  - 删除所有韩文字体（Nanum Gothic、Black Han Sans、Do Hyeon、Jua、Gothic A1 等）
  - 这些字体虽然支持部分汉字，但不是真正的中文字体，不应出现在"中文字体"分类中
- **Acceptance Criteria Addressed**: ADDED-字体来源多样化
- **Test Requirements**:
  - `programmatic` TR-1.1: 删除后 fonts.ts 中不再有日文/韩文字体名称
  - `programmatic` TR-1.2: 剩余中文字体条目数统计

## [x] Task 2: 合并 Noto CJK 系列为 4-5 个代表条目
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - Noto Sans SC、Noto Serif SC、Noto Sans HK、Noto Serif HK、Noto Sans TC、Noto Serif TC、Noto Sans JP、Noto Serif JP、Noto Sans KR、Noto Serif KR、Noto Sans Mono 共 11 个
  - 只保留 4-5 个最有代表性的（建议保留：Noto Sans SC、Noto Serif SC、Noto Sans HK、Noto Serif HK、Noto Sans TC）
  - 删除其余 Noto 系列条目
- **Acceptance Criteria Addressed**: ADDED-每个系列只保留 4-5 个差异明显的字体
- **Test Requirements**:
  - `programmatic` TR-2.1: Noto 系列条目数 ≤ 5
  - `programmatic` TR-2.2: 保留的 Noto 条目覆盖不同地区（SC/HK/TC）和不同风格（Sans/Serif）

## [x] Task 3: 补充真正的中文字体至 120 个
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 通过 WebSearch 查询 Google Fonts 上真实存在的中文字体
  - 补充字体来源：LXGW 系列、ZCOOL 系列、手写体系列等
  - 确保每个字体都有独立的 googleFontName
  - 目标：中文字体总数 ≥ 120
- **Acceptance Criteria Addressed**: ADDED-中文字体总数 ≥ 120, ADDED-字体来源多样化
- **Test Requirements**:
  - `programmatic` TR-3.1: 中文字体条目数 ≥ 120
  - `programmatic` TR-3.2: googleFontName 去重后数量 = 条目数量（无重复）
  - `programmatic` TR-3.3: 至少 3 个不同系列来源（Noto、LXGW、ZCOOL 等）

## [x] Task 4: 验证字体渲染效果
- **Priority**: P1
- **Depends On**: Task 3
- **Description**:
  - 构建并启动项目
  - 在字体选择器中测试各字体渲染效果
  - 确保所有字体能正常显示中文
- **Acceptance Criteria Addressed**: ADDED-字体必须真实加载并渲染对应样式
- **Test Requirements**:
  - `programmatic` TR-4.1: 随机选择 10 个字体测试，均能正常渲染中文
  - `human-judgement` TR-4.2: 同系列字体之间有明显视觉差异

## [x] Task 5: 测试项目构建和部署
- **Priority**: P1
- **Depends On**: Task 4
- **Description**:
  - 运行 npm run build 验证项目能正常构建
  - 启动开发服务器验证字体选择器功能正常
- **Acceptance Criteria Addressed**: ADDED-字体必须真实加载并渲染对应样式
- **Test Requirements**:
  - `programmatic` TR-5.1: npm run build 无错误
  - `programmatic` TR-5.2: 开发服务器正常启动
