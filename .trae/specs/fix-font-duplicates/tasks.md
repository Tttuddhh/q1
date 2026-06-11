# 修复字体选择器重复与渲染问题 - Tasks

## [x] Task 1: 审计现有字体条目并识别重复
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 扫描 `/workspace/src/data/fonts.ts` 中所有 `googleFontName`
  - 找出共享同一 googleFontName 的多条目
  - 找出仅通过字重（wght@xxx）区分的"伪不同"字体
  - 输出重复报告
- **Acceptance Criteria Addressed**: ADDED-每个系列只保留 4-5 个字体
- **Test Requirements**:
  - `programmatic` TR-1.1: googleFontName 去重后数量显著少于原始条目数
  - `programmatic` TR-1.2: 输出"按 googleFontName 分组后条目数 ≥ 2 的组"列表

## [x] Task 2: 收集真实可用的 Google Fonts 中文字体清单
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 整理 Google Fonts 真实存在的中文字体（每个字体一个 googleFontName）
  - 涵盖系列：Noto Sans SC、Noto Serif SC、Noto Sans HK、Noto Serif HK、Noto Sans TC、Noto Serif TC、LXGW WenKai、LXGW WenKai TC、LXGW Neo ZhiSong、LXGW XingMao、ZCOOL XiaoWei、ZCOOL KuaiLe、ZCOOL QingKe HuangYou、ZCOOL GaoDuanHei、ZCOOL KuHei、ZCOOL AoRan、ZCOOL QiuYi、ZCOOL XiaoBai、ZCOOL Addict Italic 01、ZCOOL QingKe ShuiMo、Ma Shan Zheng、Zhi Mang Xing、Long Cang、Liu Jian Mao Cao 等
  - 补充其他来源：霞鹜文楷屏幕版、得意黑(Smiley Sans)、MiSans 等
- **Acceptance Criteria Addressed**: ADDED-字体来源多样化, ADDED-中文字体总数 ≥ 120
- **Test Requirements**:
  - `programmatic` TR-2.1: 收集到的独立 googleFontName 数量 ≥ 120
  - `programmatic` TR-2.2: 系列前缀至少 3 种（Noto、LXGW、ZCOOL 等）

## [x] Task 3: 重写 fonts.ts，按"每系列 1 个默认条目"组织
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 重写 `/workspace/src/data/fonts.ts`
  - 每个字体系列只保留 1 条目（默认 Regular 字重）
  - 通过增加"系列数量"而非"字重数量"达到 120 个目标
  - 每个 FontData 拥有独立的 googleFontName
- **Acceptance Criteria Addressed**: ADDED-每个系列只保留 4-5 个字体, ADDED-字体必须真实加载并渲染对应样式, ADDED-中文字体总数 ≥ 120
- **Test Requirements**:
  - `programmatic` TR-3.1: 中文字体条目数 ≥ 120
  - `programmatic` TR-3.2: googleFontName 去重后数量 = 条目数量（无重复）
  - `programmatic` TR-3.3: 同一 googleFontName 不出现多次

## [x] Task 4: 验证字体加载与渲染
- **Priority**: P1
- **Depends On**: Task 3
- **Description**:
  - 构建并启动项目
  - 在字体选择器中随机选择 10 个不同 googleFontName 的字体
  - 验证每个字体在编辑器中确实渲染出不同的字体样式（不是默认字体）
  - 验证 Google Fonts URL 能成功加载字体
- **Acceptance Criteria Addressed**: ADDED-字体必须真实加载并渲染对应样式
- **Test Requirements**:
  - `programmatic` TR-4.1: 每个 googleFontName 拼接出的 Google Fonts URL 返回 200
  - `human-judgement` TR-4.2: 10 个字体中有 ≥ 8 个呈现明显不同的字体样式（不是默认字体回退）

## [x] Task 5: 验证项目构建与启动
- **Priority**: P1
- **Depends On**: Task 4
- **Description**:
  - 运行 `npm run build`，确保无 TypeScript / 编译错误
  - 启动开发服务器，访问字体选择器，截图确认
- **Acceptance Criteria Addressed**: ADDED-字体必须真实加载并渲染对应样式
- **Test Requirements**:
  - `programmatic` TR-5.1: `npm run build` 成功
  - `programmatic` TR-5.2: 开发服务器可访问，字体选择器弹出
