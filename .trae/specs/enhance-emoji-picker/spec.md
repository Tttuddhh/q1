# 增强表情选择器 - Product Requirement Document

## Overview
- **Summary**: 修复表情选择器中缺失的表情，并增加分类功能（默认表情、我的收藏、颜文字）
- **Purpose**: 提升用户表情输入体验，增加更多表情选择和管理功能
- **Target Users**: 所有使用富文本编辑器的用户

## Goals
- 修复表情选择器中缺失的表情（😎 太阳镜笑脸）
- 增加表情分类功能：默认表情、我的收藏、颜文字
- 支持用户上传自定义表情到我的收藏
- 增加更多emoji表情到默认表情库

## Non-Goals (Out of Scope)
- 不实现表情搜索功能

## Background & Context
当前表情选择器只有一个简单的emoji列表，缺少分类管理功能。用户反馈：
1. 表情列表中有一个位置显示为空白（缺失😎表情）
2. 需要更多表情分类（收藏、颜文字）
3. 需要支持上传自定义表情

## Functional Requirements
- **FR-1**: 修复缺失的😎表情
- **FR-2**: 增加表情分类标签：默认表情、最近使用、我的收藏、颜文字
- **FR-3**: 最近使用分类自动记录用户最近使用的表情（emoji、颜文字、收藏）
- **FR-4**: 我的收藏支持用户上传自定义表情图片
- **FR-5**: 增加更多emoji表情到默认表情库
- **FR-6**: 颜文字分类包含常用颜文字文本表情
- **FR-7**: 收藏表情支持云端同步，登录用户可跨设备同步收藏

## Non-Functional Requirements
- **NFR-1**: 表情选择器加载速度不受影响
- **NFR-2**: 上传的表情图片大小限制在2MB以内
- **NFR-3**: 界面响应式，在不同屏幕尺寸下正常显示

## Constraints
- **Technical**: 使用React和现有组件结构
- **Business**: 自定义表情本地存储在localStorage中，登录用户同步到云端

## Assumptions
- 用户上传的表情图片格式为PNG/JPG/GIF
- localStorage有足够空间存储收藏表情

## Acceptance Criteria

### AC-1: 修复缺失表情
- **Given**: 用户打开表情选择器
- **When**: 查看表情列表
- **Then**: 😎表情正确显示，没有空白位置
- **Verification**: `human-judgment`

### AC-2: 表情分类标签
- **Given**: 用户打开表情选择器
- **When**: 查看表情选择器界面
- **Then**: 看到"默认表情"、"最近使用"、"我的收藏"、"颜文字"四个分类标签
- **Verification**: `human-judgment`

### AC-3: 分类切换
- **Given**: 用户在表情选择器中
- **When**: 点击不同分类标签
- **Then**: 显示对应分类的表情内容
- **Verification**: `human-judgment`

### AC-4: 上传自定义表情
- **Given**: 用户在"我的收藏"分类
- **When**: 点击上传按钮并选择图片
- **Then**: 图片被添加到收藏列表中
- **Verification**: `human-judgment`

### AC-5: 颜文字显示
- **Given**: 用户切换到"颜文字"分类
- **When**: 查看颜文字列表
- **Then**: 看到常用颜文字如(｡♥‿♥｡)、(╯°□°）╯︵ ┻━┻等
- **Verification**: `human-judgment`

### AC-6: 更多默认表情
- **Given**: 用户在"默认表情"分类
- **When**: 查看表情列表
- **Then**: 看到比之前更多的emoji表情
- **Verification**: `human-judgment`

### AC-7: 最近使用表情
- **Given**: 用户在编辑器中使用了表情
- **When**: 打开"最近使用"分类
- **Then**: 看到最近使用过的表情列表，按使用时间倒序排列
- **Verification**: `human-judgment`

### AC-8: 最近使用持久化
- **Given**: 用户使用了表情并刷新页面
- **When**: 重新打开表情选择器的"最近使用"分类
- **Then**: 仍然看到之前使用过的表情记录
- **Verification**: `human-judgment`

### AC-9: 云端同步收藏表情
- **Given**: 登录用户上传了收藏表情
- **When**: 在另一台设备登录同一账号
- **Then**: 看到同步的收藏表情
- **Verification**: `human-judgment`

### AC-10: 未登录用户使用本地收藏
- **Given**: 未登录用户上传了收藏表情
- **When**: 查看"我的收藏"分类
- **Then**: 表情存储在本地，可以正常使用
- **Verification**: `human-judgment`

## Open Questions
- [ ] 颜文字列表需要包含哪些具体表情？
- [ ] 上传的表情是否需要支持GIF动画？
- [ ] 最近使用记录保存多少个表情？
- [ ] 云端同步使用什么后端服务？
