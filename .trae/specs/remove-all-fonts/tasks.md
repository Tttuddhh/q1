# 删除字体选择器中的所有字体 - 实现计划

## [x] Task 1: 修改 fonts.ts 文件，删除所有字体定义
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 将 `FONTS` 数组修改为空数组
  - 保留 `SYSTEM_FONT` 常量不变
  - 保留 `FontData` 接口和 `FONT_CATEGORIES` 常量不变
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `programmatic` TR-1.1: 检查 FONTS 数组长度为 0 ✓
  - `programmatic` TR-1.2: 检查 SYSTEM_FONT 常量仍存在且值正确 ✓
- **Notes**: 需要保留文件结构，仅清空 FONTS 数组内容

## [x] Task 2: 验证构建是否成功
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 运行 `npm run build` 验证代码修改后项目仍可正常构建
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `programmatic` TR-2.1: 构建命令执行成功，退出码为 0 ✓
  - `programmatic` TR-2.2: 无 TypeScript 编译错误 ✓

## [x] Task 3: 验证字体选择器行为
- **Priority**: P1
- **Depends On**: Task 2
- **Description**: 
  - 启动预览服务，验证字体选择器仅显示系统默认字体
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - `human-judgment` TR-3.1: 字体选择器展开后仅显示"系统默认"选项
  - `human-judgment` TR-3.2: 字体选择器功能正常（点击可选择）