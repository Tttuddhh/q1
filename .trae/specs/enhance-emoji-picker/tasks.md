# 增强表情选择器 - The Implementation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: 修复缺失的😎表情
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在 EMOJIS 数组中找到缺失😎的位置并添加
  - 验证表情正确显示
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `human-judgement` TR-1.1: 验证😎表情在列表中正确显示
  - `human-judgement` TR-1.2: 验证没有空白位置
- **Notes**: 😎表情位于第4行第5个位置（索引34左右）

## [x] Task 2: 重构EmojiPicker组件支持分类
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 添加分类状态管理（activeTab: 'default' | 'recent' | 'favorites' | 'kaomoji'）
  - 添加分类标签栏UI（默认表情、最近使用、我的收藏、颜文字）
  - 根据当前分类渲染不同内容
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-2, AC-3]
- **Test Requirements**:
  - `human-judgement` TR-2.1: 验证四个分类标签正确显示
  - `human-judgement` TR-2.2: 验证点击标签切换内容
  - `human-judgement` TR-2.3: 验证当前激活标签有视觉区分
- **Notes**: 使用useState管理当前激活的分类

## [x] Task 3: 增加更多默认emoji表情
- **Priority**: P1
- **Depends On**: Task 1
- **Description**: 
  - 扩展EMOJIS数组，增加更多常用emoji
  - 包括动物、食物、活动、物品等分类的emoji
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-6]
- **Test Requirements**:
  - `human-judgement` TR-3.1: 验证默认表情数量明显增加
  - `human-judgement` TR-3.2: 验证新增表情正确显示
- **Notes**: 新增约50-100个常用emoji

## [x] Task 4: 实现颜文字分类
- **Priority**: P1
- **Depends On**: Task 2
- **Description**: 
  - 创建颜文字数组（KAOMOJIS）
  - 在颜文字分类中显示颜文字列表
  - 点击颜文字插入到编辑器
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-5]
- **Test Requirements**:
  - `human-judgement` TR-4.1: 验证颜文字分类显示正确
  - `human-judgement` TR-4.2: 验证点击颜文字插入编辑器
  - `human-judgement` TR-4.3: 验证颜文字列表包含常用表情
- **Notes**: 颜文字如(｡♥‿♥｡)、(╯°□°）╯︵ ┻━┻、(ಥ﹏ಥ)等

## [x] Task 5: 实现我的收藏分类和上传功能
- **Priority**: P1
- **Depends On**: Task 2
- **Description**: 
  - 使用localStorage存储收藏的表情图片
  - 添加上传按钮和文件选择器
  - 显示收藏的表情图片网格
  - 点击收藏表情插入到编辑器
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-4, AC-10]
- **Test Requirements**:
  - `human-judgement` TR-5.1: 验证上传按钮显示正确
  - `human-judgement` TR-5.2: 验证选择图片后添加到收藏
  - `human-judgement` TR-5.3: 验证收藏的表情可以插入编辑器
  - `human-judgement` TR-5.4: 验证刷新页面后收藏仍然存在
  - `human-judgement` TR-5.5: 验证未登录用户可以使用本地收藏
- **Notes**: 图片转为base64存储在localStorage，限制大小2MB

## [x] Task 6: 实现云端同步收藏表情
- **Priority**: P1
- **Depends On**: Task 5
- **Description**: 
  - 检查用户登录状态
  - 登录用户收藏表情同步到云端API
  - 登录时从云端拉取收藏表情
  - 同步冲突处理（以云端为准）
  - 涉及文件：RichTextEditor.tsx, API服务
- **Acceptance Criteria Addressed**: [AC-9]
- **Test Requirements**:
  - `human-judgement` TR-6.1: 验证登录用户上传表情后同步到云端
  - `human-judgement` TR-6.2: 验证换设备登录后收藏表情同步下来
  - `human-judgement` TR-6.3: 验证同步过程有加载状态提示
- **Notes**: 需要后端API支持，先实现前端同步逻辑

## [x] Task 7: 实现最近使用分类
- **Priority**: P1
- **Depends On**: Task 2
- **Description**: 
  - 使用localStorage存储最近使用的表情记录
  - 记录用户使用的emoji、颜文字、收藏表情
  - 显示最近使用的表情列表（最多30个）
  - 按使用时间倒序排列
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-7, AC-8]
- **Test Requirements**:
  - `human-judgement` TR-7.1: 验证使用表情后出现在最近使用
  - `human-judgement` TR-7.2: 验证最近使用按时间倒序排列
  - `human-judgement` TR-7.3: 验证刷新页面后记录仍然存在
  - `human-judgement` TR-7.4: 验证最多保存30个记录
- **Notes**: 最近使用记录保存在localStorage中

## [x] Task 8: 验证和测试
- **Priority**: P1
- **Depends On**: Task 3, Task 4, Task 5, Task 6, Task 7
- **Description**: 
  - 运行npm run build验证没有错误
  - 在浏览器中测试所有功能
  - 验证所有分类和交互正常
  - 涉及文件：RichTextEditor.tsx
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10]
- **Test Requirements**:
  - `programmatic` TR-8.1: npm run build成功无错误
  - `human-judgement` TR-8.2: 所有分类切换正常
  - `human-judgement` TR-8.3: 所有表情插入正常
  - `human-judgement` TR-8.4: 上传功能正常工作
  - `human-judgement` TR-8.5: 最近使用记录正常
  - `human-judgement` TR-8.6: 云端同步功能正常
- **Notes**: 确保没有TypeScript错误
