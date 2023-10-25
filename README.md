# nextjs-starter

`next.js` 项目脚手架，包含以下特性：

* 现代化的 `nextjs` + `prisma` + `trpc` + `tailwindcss` + `next-auth` 全栈方案，已实现登录和会话管理。
* 完备的 `typescript` + `eslint` + `stylelint` + `prettier` 能力，整合 vscode 配置，一键规范化代码。
* 一套在 `preline` UI 皮肤上实现的完整的 `React` 组件库 `preline-react`，开箱即用，告别基础组件上繁琐重复的 `tailwindcss`。复杂组件采用在开源 Headless 组件基础上封装：
  * 弹出类组件（tooltip, popover）使用 `@floating-ui/floating-react`。
  * 表格使用 `@tanstack/react-table`
  * 表单使用 `react-hook-form` + `zod`
* 前后端通过 `prisma` 打通业务模型的类型，通过 `zod` 打通表单数据的类型和校验规则。
* 整合了社区的 SSR + CSR 同构渲染方案，在 `src/app/post` 目录下有示例。PS: 目前 `trpc` 并没有官方正式的 `nextjs v13` 版本的整合方案。

## preline-react

* 示例网站：https://preline-react.vercel.app 或 https://preline.binfoe.com
* 示例代码：https://github.com/binfoe/preline-react-demo-site
* 组件源码：https://github.com/binfoe/preline-react


## 本地研发

```bash
git clone https://github.com/YuhangGe/nextjs-starter
cd nextjs-starter
pnpm install
pnpm dev
```

## TODO

* `next-auth` 集成，实现登录会话管理。
* `logger` 能力。
* 服务端和客户端复用表单校验。
* 推进 `react-preline` 组件库。
