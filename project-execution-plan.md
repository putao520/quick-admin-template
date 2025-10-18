# Quick Admin Template 执行计划

> 目标：在现有升级成果基础上，通过自动化 UI 覆盖、服务端联调与回归收敛，验证并完善项目升级质量。
> 更新维护者：Codex AI 助手
> 最近更新时间：2025-10-18（阶段二完成，阶段三回归执行中）

## 阶段总览

| 阶段 | 目标 | 当前状态 | 说明 |
| --- | --- | --- | --- |
| 阶段一：UI 端到端保障 | 扩展 Playwright 场景，覆盖关键页面与交互，确保无前端 Runtime 错误 | 已完成 | `tests/smoke.spec.ts` 覆盖仪表盘、登录、表格、账户设置、Cards、Form Layouts；`npm run test:e2e` 通过 |
| 阶段二：服务端联调与文档 | 构建 Redis/Prisma 联调路径，利用 `createTestCaller`/Mocks 验证核心 tRPC 流程并沉淀文档 | 已完成 | SQLite + 内存 Redis 集成测试通过，操作手册已落地并同步状态文档 |
| 阶段三：回归收敛与交付 | 全量 lint/test/build/e2e，整理风险与遗留项，交付总结报告 | 已完成 | 最终交付阶段 |

## 阶段一：UI 端到端保障（已完成）
- [x] 扩充 Playwright 场景
  - [x] 账户设置：验证各 tab 交互、表单控件可用
  - [x] Cards 列表：检测多个卡片组件关键文案
  - [x] Form Layouts：验证主要输入、按钮、校验提示
  - [ ] 如必要，加入截图或可视化比对（当前暂未启用，视后续需要补充）
- [x] 加强异常捕获
  - [x] 控制台 / `pageerror` 监听（已在 `tests/smoke.spec.ts` 中启用）
  - [x] 对发现的异常整理日志与解决方案（本轮无新增异常）
- [x] 完成一次 `npm run test:e2e` 并记录结果（2025-10-18 通过）

## 阶段二：服务端联调与文档（已完成）
- [x] 准备 Redis / Prisma 环境（本地或稳定 Mock 配置）
- [x] 使用 `createTestCaller` + Mock DB 扩展 tRPC 关键业务流程测试
- [x] 编写操作指引
  - [x] 启动步骤、所需环境变量
  - [x] 常见问题 / 回滚说明
- [x] 更新 `upgrade-status.md` / `upgrade-progress.md` 联调结果
- [x] 2025-10-18：复跑 `npm test`（含 integration）确认 SQLite + 内存 Redis 路径可复现，并记录命令输出摘要

> **联调说明（2025-10-18 已验证）**
> - 环境要求：Node.js 20+、已执行 `npm install`、Playwright 运行时依赖已按阶段一配置。
> - 配置：若无 `.env`，复制 `.env.example` 并保持 `DATABASE_URL="file:./dev.db"`；Redis 相关变量留空以启用内存实现。
> - Prisma 同步：必要时执行 `npx prisma generate`，确保客户端与 schema 一致。
> - 数据库初始化：集成测试会通过 `ensureSchema` 自动建表；需要手工预建时可运行 `npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script` 生成 SQL 并执行。
> - 测试命令：`npm test -- integration`（或 `npm test`）应输出 `PASS src/server/api/__tests__/integration.test.ts`，并在 `dev.db` 中生成一条 Post 记录。
> - 常见问题：`SQLITE_CANTOPEN` 时删除 `dev.db` 后重试；Prisma 报错时重新执行 `npx prisma generate`；如需接入真实 Redis，请同步设置 `REDIS_URI`/`PERSISTENT_REDIS_URI`/`EVENT_REDIS_URI` 并确认可达。
> - 回滚：删除 `dev.db` 可重建数据库，将 `.env` 恢复为仓库默认占位值可撤销临时配置。

## 阶段三：回归收敛与交付（已完成）
- [x] 全量运行 npm run lint:auto
- [x] 全量运行 npm test
- [x] 全量运行 npm run build
- [x] 全量运行 npm run test:e2e
- [x] 汇总风险清单与未决事项（见下方）
- [x] 更新状态文档并准备最终交付摘要（见下方）
- [x] 2025-10-18：npm run lint:auto（Biome 修复 2 个文件，Oxlint 0 问题）
- [x] 2025-10-18：npm test 全量通过，3 个测试套件均成功
- [x] 2025-10-18：npm run build 生产构建通过，存在 browserslist 数据过期提示
- [x] 2025-10-18：npm run test:e2e 6 个 Playwright 场景全部通过

### 风险与未决事项（2025-10-18）
- 浏览器兼容性数据提示过期：构建阶段提示 `browserslist` 数据需更新，需在具备网络的环境手动执行 `npx update-browserslist-db@latest`。
- 真实 Redis 集成尚未验证：当前联调基于内存实现，若部署环境使用外部 Redis，需要按 `upgrade-status.md` 中的操作指引配置连接并复测。
- 可视化回归能力未启用：Playwright 目前仅做行为校验，未接入截图比对，后续如关注视觉差异需追加该能力。

### 最终交付摘要（2025-10-18）
- React 19、Next.js 15、MUI v7、Tailwind v4、tRPC 11、Prisma 6 等关键依赖升级已完成，lint/test/build/e2e 全量巡检通过。
- tRPC + Prisma + 内存 Redis 集成测试可复现；`project-execution-plan.md`、`upgrade-status.md`、`upgrade-progress.md` 均已同步最终状态与操作手册。
- Playwright 覆盖仪表盘、登录、表单、账户设置、Cards 等核心页面，确保主流程无回归。
- 交付物包括最新的执行计划、风险清单与操作指引，可直接作为后续交付或移交依据。

## 备注
- 执行过程中如遇阻塞（依赖无法获取、环境缺失等），需记录在文档中并在会话中询问处理方式。
- 每次阶段推进后请更新本文件，便于跨会话持续跟进。




