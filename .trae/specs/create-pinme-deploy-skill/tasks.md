# Tasks

- [ ] Task 1: 创建 PinMe 技能说明文档 skill.md
  - [ ] 编写 PinMe 简介、快速开始、命令参考、限制说明
  - **验证**: 文档完整，包含所有必要信息

- [ ] Task 2: 创建一键部署脚本 deploy.sh
  - [ ] 自动检测/安装 pinme CLI
  - [ ] 自动检测构建输出目录（dist/build/out/public）
  - [ ] 支持 --name 和 --dir 参数
  - [ ] 执行 pinme upload 并返回 URL
  - **验证**: 脚本可执行，参数解析正确

- [ ] Task 3: 创建 PinMe 配置文件模板 pinme.toml
  - [ ] 包含项目名、描述、构建命令等配置项
  - **验证**: 配置格式正确

- [ ] Task 4: 打包技能包
  - [ ] 将 skill.md + scripts/ 打包为 zip
  - **验证**: zip 文件可解压，结构正确
