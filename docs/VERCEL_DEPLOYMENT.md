# 从本地到公开网址：Vercel、域名和 Google 搜索提交

> **域名已迁移（2026-10-29）**：正式网址现在是 `https://www.resizet.com`，品牌名 Resizet。`opensourcephotoeditor.com` 与 `www.resizet.com` 的所有路径都 308 永久跳转到新域名的相同路径（Vercel 域名级跳转 + 环境变量 `LEGACY_DOMAIN_REDIRECT=1` 下的 next.config 跳转）。旧域名请保留续费至少一年。下文中出现的旧域名均应理解为新域名；发信域名为 `mail.resizet.com`。


## 当前项目状态（2026-10-14）

- 代码仓库：[Huoxinyue1995-Ma/first-code](https://github.com/Huoxinyue1995-Ma/first-code)
- Vercel 项目：`emma-8abb/image-ready`（正式域名绑定在这里）。另有一个 `emma-8abb/first-code` 项目也部署同一仓库，但没有绑定正式域名，不要在它上面配置变量。
- 当前生产网址：[https://www.resizet.com](https://www.resizet.com)
- GitHub 已与 Vercel 连接；之后推送到 `main` 会触发自动发布。
- `opensourcephotoeditor.com` 和 `www.resizet.com` 均已在 Vercel 验证；根域名会自动跳转至 `www`。
- `NEXT_PUBLIC_SITE_URL` 已设为正式网址，因此 `robots.txt` 和 `sitemap.xml` 均使用正式域名。
- Google Search Console 的 `opensourcephotoeditor.com` 域名属性已验证，`https://www.resizet.com/sitemap.xml` 已提交。

本阶段的上线步骤已经完成。Google 对站点地图的后续抓取、收录与排名属于上线后的观察工作，不属于本阶段完成条件。

## 使用前先知道三件事

1. 本文把网站代码放在 GitHub，Vercel 从 GitHub 自动发布。
2. 域名是网站地址，例如 `yourtool.com`；需要由你自己购买或已有。
3. Google Search Console 是 Google 给站长查看收录情况的后台。验证和提交站点地图不等于立刻被收录。

## 准备清单

- 一个 GitHub 账号。
- 一个 Vercel 账号，可以直接用 GitHub 或 Google 登录。
- 一个可以正常登录并接收验证码的 Google 账号。
- 一个域名，以及能登录域名购买平台后台的权限。
- 已完成并通过测试的网站代码。

不要把密码、域名购买平台的登录信息或 Google 登录验证码发到代码仓库或聊天中。

### 你的 Google 账号需要满足什么要求

普通 Gmail 账号就可以，不需要公司 Google Workspace 账号。这个账号需要：

- 你自己能正常登录，并建议开启两步验证。
- 能接收 Google 的安全验证码或确认提醒。
- 用于登录 Google Search Console，成为网站的所有者。
- 后续如果要展示 Google 广告，可用同一个账号申请 Google AdSense；AdSense 审核是否通过由 Google 决定。

不要求这个 Google 账号是美国注册，也不要求使用美国手机号。网站面向美国用户和账号的真实注册地区是两件事。请使用你自己真实的国家/地区、姓名和联系方式，不要为了投放英文网站或 Google 广告伪造美国身份。

如果后续申请 Google AdSense，Google 会按你真实填写的付款资料进行身份、地址、税务和收款方式核验。届时需要确认你所在国家/地区是否可申请、能否接收邮寄验证码，以及是否有可用的本地收款方式；这些要求以 AdSense 申请页面在当时显示的内容为准。

Google 账号本身不能证明你拥有网站。验证 Search Console 时，还需要你有域名购买平台的 DNS 设置权限，按 Google 给出的内容添加一条记录即可。

## 第 1 步：在自己电脑上检查网站

在网站项目文件夹中运行：

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

浏览器打开终端显示的本地网址，至少测试：选择一张图片、换三个平台尺寸、拖动和缩放、下载结果、手机宽度页面。

只有 `npm run build` 成功时，才能进入下一步。它相当于在发布前做一次完整检查。

## 第 2 步：把代码放到 GitHub

当前项目已经使用仓库 [Huoxinyue1995-Ma/first-code](https://github.com/Huoxinyue1995-Ma/first-code)，不需要重新创建仓库或重复初始化 Git。后续修改完成后，只需在项目文件夹中运行：

```bash
git add <需要提交的文件>
git commit -m "Describe the change"
git push
```

不要使用 `git add .`，避免把本地测试图、分析输出或密码文件意外提交。

发布后，今后每次把改动推送到 `main` 分支，Vercel 都会自动更新公开网站。

## 第 3 步：首次发布到 Vercel

当前项目已发布到 [https://www.resizet.com](https://www.resizet.com)，并且已经完成一次线上上传、裁剪和下载验证。Vercel 已识别 Next.js。图片不需要、也绝不能配置任何上传相关的环境变量。

以后若要从 Vercel 网页重新发布，打开项目 `image-ready` 的 `Deployments` 页面，找到最新版本后点击 `Redeploy`。正常情况下，推送到 GitHub 的 `main` 分支会自动完成这件事。

若页面显示构建失败，打开 Vercel 的 `Build Logs`，先修复本地 `npm run build` 中相同的问题，再把修复推送到 GitHub。

## Stripe 收款：在发布付款功能前完成

网站的批量 ZIP 定价是 `US$3.99/次`，每次最多 10 张图片。付款时，用户会跳到 Stripe 的安全付款页；原图始终只在用户浏览器内处理。

### 1. 注册并完成 Stripe 香港公司审核

使用香港公司资料注册 Stripe。按 Stripe 页面要求填写公司、负责人和收款银行账户资料。不要把登录密码、验证码、银行卡信息或密钥发送到聊天或提交到 GitHub。

### 2. 先用测试模式检查流程

Stripe 后台左上角先保持在 **Test mode**。在 `Developers` -> `API keys` 中复制测试用的 `Secret key`，只放在你电脑本地的 `.env.local`：

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
```

启动 `npm run dev` 后，选择 2 到 10 张测试图片，点击 `Unlock batch for $3.99`。付款页只会使用 Stripe 测试卡，不会扣真实的钱。付款成功后回到原来的 Image Ready 标签页，点击 `Download paid batch`，确认 ZIP 能打开。

如果 Stripe 测试页需要一张测试卡，使用 Stripe 文档列出的当前测试卡号；不要使用真实银行卡测试。

### 3. 在 Vercel 填写正式密钥

只有上面的测试流程完全通过、并确认要正式开放收款时，才在 Vercel 项目的 `Settings` -> `Environment Variables` 添加：

| 名称 | 值 | 适用环境 |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Stripe **Live mode** 的 Secret key | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://www.resizet.com` | Production |

保存后重新部署。`STRIPE_SECRET_KEY` 只能填在 Vercel 后台或自己电脑的 `.env.local`，绝不能加上 `NEXT_PUBLIC_` 前缀、提交到 GitHub 或放在网页代码中。

### 4. 正式验收

用一笔真实的小额付款完成一次 2 到 10 张的批量下载，确认：

1. Stripe 后台出现正确的 `US$3.99` 付款。
2. 回到编辑页后只允许下载一个 ZIP。
3. ZIP 含有正确数量和尺寸的图片。
4. 浏览器网络记录中没有原图文件、预览图或图片内容上传。

退款、拒付和收款对账在 Stripe 后台处理。当前第一版不建立用户账号或保存用户图片。

## 第 4 步：购买或使用已有域名

如果还没有域名，可在可信域名注册商购买。选择简短、好读、不容易拼错的 `.com` 域名优先，例如：

- `localproductresize.com`
- `sellerimagecrop.com`
- `privateimagecrop.com`

不要购买或使用包含 Amazon、Shopify、TikTok 商标的域名，除非你已经获得相应授权。

购买后，把域名保留在购买平台即可，不需要转移给 Vercel。

## 第 5 步：在 Vercel 绑定域名

1. 进入 Vercel 项目，依次点击 `Settings` -> `Domains`。
2. 输入你的域名，例如 `example.com`，点击 `Add`。
3. Vercel 会显示需要在域名购买平台填写的一组记录。常见情况是：
   - 根域名（`example.com`）使用一条 `A` 记录；或按 Vercel 页面给出的记录填写。
   - `www.example.com` 使用一条 `CNAME` 记录。
4. 在域名购买平台打开 DNS 设置，逐字填写 Vercel 显示的“名称”和“值”。不要根据旧教程猜数值，以 Vercel 当前页面为准。
5. 回到 Vercel 点击刷新或等待验证成功。DNS 更新可能立即完成，也可能需要数小时。
6. 在 Domains 页面把一个地址设为主要地址。推荐 `https://example.com`，并让 `www.example.com` 自动跳转到它。

验证方法：使用手机流量和电脑网络分别访问 `https://example.com`，确认都打开的是新网站，而且浏览器地址前有锁形图标。

## 第 6 步：确认搜索引擎需要的文件

代码中必须提供以下地址。把 `example.com` 换成实际域名后，在浏览器逐个打开确认：

| 地址 | 应看到的内容 |
| --- | --- |
| `https://example.com/robots.txt` | 允许搜索引擎读取网站，并写有站点地图地址 |
| `https://example.com/sitemap.xml` | 首页、编辑器、隐私、条款和联系页面的网址列表 |
| `https://example.com/privacy` | 清楚说明图片在浏览器本地处理、不上传原图 |

网站代码里的网站地址必须改成正式域名后再发布。否则站点地图会指向错误的临时网址。

在 Vercel 项目的 `Settings` -> `Environment Variables` 中新增：

| 名称 | 内容示例 | 何时填写 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://example.com` | 域名验证成功、确定主要网址后 |

保存后，在 Vercel 的 `Deployments` 页面点击最新版本右侧的 `Redeploy`。重新打开 `robots.txt` 和 `sitemap.xml`，确认里面已改成正式域名。

## 第 7 步：验证 Google Search Console

推荐验证“域名属性”，因为它同时涵盖 `www` 和非 `www` 地址。

1. 打开 [Google Search Console](https://search.google.com/search-console/)，用 Google 账号登录。
2. 点击 `Add property`。
3. 选择左侧的 `Domain`，只输入域名，例如 `example.com`，不要输入 `https://` 或路径。
4. Google 会给出一条 `TXT` 记录。复制整条记录。
5. 回到域名购买平台的 DNS 设置，新建一条 `TXT` 记录。名称和内容按 Google 页面显示填写。
6. 回到 Search Console 点击 `Verify`。
7. 如果提示暂时找不到记录，检查有没有多余空格，等待 DNS 更新后重试。不要删掉这条 TXT 记录，验证后也应保留。

验证成功后，进入 Search Console 的 `Settings`，确认网站所有者显示为你的 Google 账号。

## 第 8 步：提交站点地图

1. 在 Search Console 左侧选择 `Sitemaps`。
2. 在“Add a new sitemap”中填写 `sitemap.xml`。
3. 点击 `Submit`。
4. 看到状态为 `Success` 即表示 Google 已收到站点地图。

这一步完成后，不需要等待“已编入索引”或有排名才宣布本阶段上线完成。之后每周可在 Search Console 的 `Pages` 和 `Performance` 中观察收录与搜索表现。

## 第 9 步：上线验收记录

建议在发布当天按下面清单逐项勾选，并保存截图或网址作为证据：

- [ ] `npm run typecheck` 成功。
- [ ] `npm run build` 成功。
- [ ] Vercel 临时网址可正常处理和下载图片。
- [ ] 自有域名可从电脑和手机直接打开。
- [ ] 主要域名已在 Vercel 中设置，另一个 `www`/非 `www` 地址会自动跳转。
- [ ] 浏览器显示 HTTPS 锁图标。
- [ ] `robots.txt` 可打开。
- [ ] `sitemap.xml` 可打开，里面是正式域名。
- [ ] Google Search Console 的域名验证成功。
- [ ] Search Console 中提交 `sitemap.xml` 后显示 `Success`。

## Google 广告（在网站上线后单独做）

Google Search Console 和 Google AdSense 是两个不同的产品。完成 Search Console 验证不代表可以立刻投放广告。

1. 等网站有正式域名、隐私页面、条款页面、联系邮箱和足够的原创说明内容后，使用同一 Google 账号申请 [Google AdSense](https://www.google.com/adsense/)。
2. 按 AdSense 页面要求验证网站、填写收款信息并等待审核。
3. 只有审核通过后，才把 AdSense 给出的广告代码加入网站。
4. 广告应放在首页说明内容之间或页脚附近，不应遮挡图片裁剪区、下载按钮或手机屏幕。

不要在审核前使用假广告、复制其他网站的广告代码，或让用户点击广告。这样会违反 Google 的规则并可能导致账号被限制。

## 常见问题

### 域名在 Vercel 中一直没有验证成功

对照 Vercel 当前页面重新检查 DNS 记录的名称和内容。删除与同一名称冲突的旧记录前，先确认它没有被邮箱或别的网站使用。DNS 变更有延迟，等待一段时间再查。

### Google 验证失败

确认你选的是 `Domain` 验证方式，且 TXT 记录填写在正确的域名下。TXT 内容必须完整，不能删掉引号内的字符。等 DNS 生效后重试。

### 提交站点地图报错

先在无痕窗口直接打开 `https://你的域名/sitemap.xml`。若打不开，先修复网站部署或代码中的正式域名设置；若能打开，再回到 Search Console 提交。

### Vercel 网站可打开，但编辑器无法下载文件

用 Chrome 和 Safari 各测试一次，确认浏览器没有拦截自动下载。第一版应由用户主动点击 Download，避免被浏览器当成弹窗拦截。
