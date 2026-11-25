# 行摄手记

摄影、游记与随笔。站点使用 Astro，摄影组件基于 Astro Photo Folio。

## 本地预览

需要 Node.js 22.12 或更高版本及 pnpm。仓库锁定的 pnpm 版本见 `package.json`。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm build` 将静态站点生成到 `dist/`，`pnpm preview` 可预览构建结果。

## 更新内容

- 相册放在 `src/content/albums/`。每个 Markdown 文件是一册，在头部填写地点、主题和照片列表。第一张是相册封面，`featured: true` 会把相册放到首页精选区。
- 文章放在 `src/content/stories/`。用 `section: travel` 添加游记，用 `section: essays` 添加随笔。用 `featured: true` 设置首页主推故事，列表按日期从新到旧排列。
- 在文章头部填写 `album: dolomites`，即可连接到文件名为 `dolomites.md` 的相册。对应的游记会出现在相册页。可以在 `.mdx` 正文中用 `<StoryPhotos album="dolomites" numbers={[1, 3]} />` 引用同一相册里的第一、第三张照片，参见示例游记的组件导入。
- 图片放在 `src/assets/`，使用准备公开的导出图。当前图片和文章是带标记的示例，示例照片的作者与原始链接记录在相册文件中。
- 「白衣庭院」静态存档在 `public/archive/baiyi/`，在新版的友情链接里可访问。站名可在 `src/lib/content.ts` 修改。
