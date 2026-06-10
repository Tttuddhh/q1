# Email Verification Login System - Product Requirement Document

## Overview
- **Summary**: 实现邮箱验证登录系统，用户注册时向邮箱发送验证链接/验证码，用户可在指定时间内（如一周）填写验证信息完成注册并登录。
- **Purpose**: 提供安全的邮箱验证注册登录机制，支持邮箱验证链接有效期管理。
- **Target Users**: 需要安全注册登录的平台用户

## Goals
- [ ] 实现邮箱注册功能：用户输入邮箱后发送验证邮件
- [ ] 实现验证链接有效期管理（默认7天）
- [ ] 实现邮箱验证登录流程
- [ ] 实现用户数据持久化存储
- [ ] 提供完整的前端登录/注册界面

## Non-Goals (Out of Scope)
- [ ] 不实现社交登录（如 Google/Facebook）
- [ ] 不实现密码登录（仅邮箱验证登录）
- [ ] 不实现 OAuth2.0 授权

## Background & Context
当前项目是一个知识库编辑器前端项目，需要添加用户认证系统。采用邮箱验证方式，无需密码，更加安全便捷。

## Functional Requirements
- **FR-1**: 用户注册时输入邮箱，系统发送验证链接
- **FR-2**: 验证链接有效期为7天，过期后需重新发送
- **FR-3**: 用户点击验证链接或输入验证码后完成注册并自动登录
- **FR-4**: 支持重新发送验证邮件（有冷却时间限制）
- **FR-5**: 已验证用户可直接登录

## Non-Functional Requirements
- **NFR-1**: 邮件发送响应时间 < 3秒
- **NFR-2**: 验证链接有效期可配置
- **NFR-3**: 支持 Gmail 和 QQ 邮箱发送

## Constraints
- **Technical**: Node.js 后端 + SQLite 数据库
- **Dependencies**: nodemailer, express, jsonwebtoken

## Assumptions
- [ ] 用户邮箱可正常接收邮件
- [ ] 项目已安装 Node.js 环境

## Acceptance Criteria

### AC-1: 用户注册
- **Given**: 用户在注册页面输入有效邮箱
- **When**: 点击"发送验证邮件"按钮
- **Then**: 系统向该邮箱发送验证链接，显示"验证邮件已发送"提示
- **Verification**: `human-judgment`

### AC-2: 验证链接有效期
- **Given**: 用户收到验证邮件
- **When**: 在7天内点击验证链接
- **Then**: 验证成功，用户自动登录
- **Verification**: `human-judgment`

### AC-3: 过期验证
- **Given**: 验证链接已超过7天有效期
- **When**: 用户点击过期链接
- **Then**: 提示链接过期，引导重新发送验证邮件
- **Verification**: `human-judgment`

### AC-4: 重复发送限制
- **Given**: 用户在60秒内已发送过验证邮件
- **When**: 再次点击"发送验证邮件"
- **Then**: 提示"请稍后再试"，显示倒计时
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要支持验证码（数字）方式登录？
- [ ] 是否需要支持密码找回功能？