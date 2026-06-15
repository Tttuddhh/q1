# 浏览器截图诊断字体渲染问题 - 实现计划

## [ ] Task 1: 安装 Playwright 和浏览器
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 安装 Playwright Python 包: `pip install playwright`
  - 安装 Chromium 浏览器: `python3 -m playwright install chromium`
  - 验证安装成功

## [ ] Task 2: 编写自动化截图脚本
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 编写 Python 脚本使用 Playwright 打开 http://localhost:4173/
  - 等待页面加载完成 (networkidle)
  - 截图保存初始状态
  - 点击字体选择器按钮（显示"系统默认"的按钮）
  - 等待字体选择器面板打开
  - 截图保存字体选择器打开状态
  - 滚动字体列表，分多次截图展示所有50种字体
  - 选择几种字体（手写体、宋体、黑体各一种），截图查看编辑器渲染效果

## [ ] Task 3: 运行脚本并分析截图
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 运行截图脚本
  - 查看生成的截图
  - 分析哪些字体没有正确渲染
  - 记录问题字体的名称和表现

## [ ] Task 4: 根据诊断结果修复字体问题
- **Priority**: P0
- **Depends On**: Task 3
- **Description**:
  - 根据截图分析结果，修复渲染失败的字体
  - 可能是替换字体包、调整 unicode-range、或修改加载方式
