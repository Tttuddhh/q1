# 编辑器字体选择器 Spec

## Why
用户在编辑文档时需要为选中的文字设置不同的字体，以丰富文档的视觉效果。目前编辑器工具栏缺少字体选择功能，需要添加一个支持100+种免费商用字体的选择器。

## What Changes
- 在编辑器工具栏加粗按钮前面添加字体选择器组件
- 添加字体选择器下拉面板（类似表情选择器），支持搜索和分类浏览
- 集成 Tiptap FontFamily 扩展，支持选中文字应用字体
- 引入 Google Fonts CDN 加载免费商用字体
- 字体数据硬编码在代码中，包含30+中文字体和70+其他语言字体
- 添加相关 i18n 翻译键

## Impact
- Affected specs: 编辑器工具栏、编辑器内容样式
- Affected code: RichTextEditor.tsx, i18n/index.ts, index.css

## ADDED Requirements

### Requirement: 字体选择器组件
The system SHALL provide a font picker in the editor toolbar.

#### Scenario: 显示字体选择器
- **WHEN** 用户进入编辑模式
- **THEN** 工具栏加粗按钮前面显示字体选择器，默认显示"系统默认"

#### Scenario: 打开字体面板
- **WHEN** 用户点击字体选择器
- **THEN** 弹出下拉面板，显示搜索框、分类标签和字体列表

#### Scenario: 选择字体
- **WHEN** 用户选中文字并点击某个字体
- **THEN** 选中文字的字体变为所选字体

#### Scenario: 搜索字体
- **WHEN** 用户在搜索框输入关键词
- **THEN** 字体列表实时过滤显示匹配的字体

#### Scenario: 切换分类
- **WHEN** 用户点击分类标签
- **THEN** 字体列表只显示该分类下的字体

### Requirement: 字体数据
The system SHALL provide 100+ free commercial fonts.

#### Scenario: 中文字体
- **WHEN** 用户切换到"中文字体"分类
- **THEN** 显示30+种中文字体，如阿里巴巴普惠体、站酷系列、思源黑体等

#### Scenario: 其他语言字体
- **WHEN** 用户切换到其他分类
- **THEN** 显示70+种其他语言字体，包括可爱风、哥特风、手写体等

#### Scenario: 字体预览
- **WHEN** 用户浏览字体列表
- **THEN** 每个字体名称用该字体样式显示预览

### Requirement: 字体加载
The system SHALL load fonts from Google Fonts CDN.

#### Scenario: 加载字体
- **WHEN** 页面加载或选择字体
- **THEN** 通过 Google Fonts CDN 动态加载字体文件

## MODIFIED Requirements

### Requirement: 编辑器工具栏
The editor toolbar SHALL include a font picker before the bold button.

#### Scenario: 工具栏布局
- **WHEN** 用户查看编辑器工具栏
- **THEN** 工具栏从左到右依次为：字体选择器、加粗、斜体、下划线、删除线...

## REMOVED Requirements
None.
