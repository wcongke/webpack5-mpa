# webpack5-mpa

> webpack5 多页面应用

- [tailwindcss](https://tailwindcss.com/)
- [lodash](https://lodash.com/)
- [f2elint](https://www.npmjs.com/package/f2elint)

## 启动应用

```bash
nvm use v16.15.1

pnpm i

# 开发
pnpm run dev
# 测试
pnpm run test
# 生产
pnpm run prod
```

## 打包应用

```bash
# 开发
pnpm run build:dev
# 测试
pnpm run build:test
# 生产
pnpm run build:prod
```

## 静态服务

```bash
pnpm run serve
```

- 将代理 `dist/` 文件夹下的文件
- 可通过 `-p` 指定启动端口

## 模式和环境变量

- 默认支持 dev/test/prod 模式
- 可在 `.env.(development/test/production)` 文件中自定义环境变量
- 可自定义开发模式如(local/preview)
  - 1. 新增 `npm script`
  - 2. 新增 `.env.xxx` 文件
