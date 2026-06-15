# 浏览器截图诊断字体渲染问题 - 产品需求文档

## Overview
- **Summary**: 使用 Playwright 浏览器自动化工具打开应用，点击字体选择器，截图查看每种字体的实际渲染效果，诊断哪些字体没有正确渲染
- **Purpose**: 通过可视化截图精准定位字体渲染失败的根因

## Why
用户反馈仍有部分字体没有渲染成功，需要直观的截图证据来诊断问题：
1. 无法确定是字体文件问题、CSS 加载问题还是 unicode-range 问题
2. 需要看到每种字体在浏览器中的实际渲染效果
3. 需要确认字体名称在列表中是否以自身字体样式显示

## What Changes
- 安装 Playwright 浏览器自动化工具
- 编写自动化脚本打开应用、点击字体选择器、截图
- 分析截图结果，定位渲染失败的字体

## Impact
- Affected code: 无代码修改，仅诊断
- Affected specs: download-local-fonts

## ADDED Requirements
### Requirement: 自动化截图诊断
The system SHALL 通过 Playwright 自动化工具截图，展示字体选择器中每种字体的实际渲染效果。

#### Scenario: 诊断字体渲染
- **WHEN** 运行诊断脚本
- **THEN** 生成多张截图，展示字体选择器的不同状态
- **AND** 截图中包含字体列表和每种字体的预览效果
