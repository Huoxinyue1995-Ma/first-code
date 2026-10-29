# 账号与点数：上线配置清单

> **域名已迁移（2026-10-29）**：正式网址现在是 `https://www.resizet.com`，品牌名 Resizet。`opensourcephotoeditor.com` 与 `www.resizet.com` 的所有路径都 308 永久跳转到新域名的相同路径（Vercel 域名级跳转 + 环境变量 `LEGACY_DOMAIN_REDIRECT=1` 下的 next.config 跳转）。旧域名请保留续费至少一年。下文中出现的旧域名均应理解为新域名；发信域名为 `mail.resizet.com`。


代码在分支 `feat/accounts-credits`。下面每一步都需要在对应后台登录操作；密钥只填到 Vercel 环境变量或本机 `.env.local`，不要发到聊天或提交到 GitHub。

## 功能概览

| 部分 | 说明 |
| --- | --- |
| 登录 | Google 登录 + 邮箱登录链接（15 分钟有效、只能用一次） |
| 会话 | 30 天 HttpOnly Cookie；数据库只存令牌的哈希 |
| 点数 | 新用户送 3 点；$5 = 50 点，$15 = 165 点；白底图 1 点，场景图 2 点；失败自动退还 |
| 记账 | 每次变动都写入 `credit_ledger`，余额 = 流水之和；同一个 Stripe 付款只入账一次 |
| 价格 | 只在 `src/lib/credits.ts` 修改 |
| 旧功能 | $0.50 批量 ZIP 不需要登录，保持不变 |

## 1. 数据库（Neon Postgres，经 Vercel 接入）

1. Vercel → 项目 `image-ready`（正式域名所在的项目，不是 `first-code`）→ Storage → Create Database → 选 Neon（Postgres），区域选靠近 Vercel 函数的美国东部。
2. 连接到项目时，勾选 Production 和 Preview。Vercel 会自动添加 `DATABASE_URL` 等变量。
3. 在本机建表（只需一次；重复运行也安全）：

```bash
DATABASE_URL="从 Vercel 复制的连接串" npm run db:migrate
```

## 2. Google 登录

1. 打开 Google Cloud Console → 新建项目 `Image Ready`。
2. APIs & Services → OAuth consent screen：类型选 External，填应用名、支持邮箱、网站首页 `https://www.resizet.com`、隐私政策 `https://www.resizet.com/privacy`。范围只需 `email`、`profile`、`openid`，然后 Publish。
3. Credentials → Create credentials → OAuth client ID → Web application。
   - Authorized redirect URIs：
     - `https://www.resizet.com/api/auth/google/callback`
     - `http://localhost:3000/api/auth/google/callback`（本机测试用）
4. 把 Client ID 和 Client secret 填到 Vercel：`GOOGLE_CLIENT_ID`、`GOOGLE_CLIENT_SECRET`。

预览地址（`*.vercel.app`）不在回调白名单里，Google 登录只在正式域名和本机可用；预览地址上用邮箱登录测试。

预览地址开启了 Vercel Authentication。测试邮箱登录时，请右键复制邮件里的链接，粘贴到已登录 Vercel 的浏览器打开；直接点击会先跳转 Vercel 登录页，链接里的登录码会丢失。正式域名不受影响。

## 3. 邮箱登录（Resend）

1. 注册 resend.com → Domains → Add Domain：`mail.resizet.com`（用子域，不影响主域邮件）。
2. 域名的 DNS 由 **Vercel** 托管（域名服务器是 `ns1/ns2.vercel-dns.com`），不是 Spaceship。用 `vercel dns add opensourcephotoeditor.com <name> <type> <value>` 添加 Resend 显示的记录（已完成：`resend._domainkey.mail` TXT、`rsend.mail` 与 `send.mail` CNAME、`_dmarc` TXT），等 Resend 显示 Verified。
3. API Keys → 创建只发送权限的 key。
4. Vercel 环境变量：
   - `RESEND_API_KEY`
   - `EMAIL_FROM` = `Image Ready <login@mail.resizet.com>`

本机开发时可以不配 Resend：登录链接会打印在 `npm run dev` 的终端里。

## 4. Stripe

点数购买复用现有的 `STRIPE_SECRET_KEY` 和 `STRIPE_WEBHOOK_SECRET`，不需要新的商品。

- Webhook 端点（已存在）`/api/stripe-webhook` 需要订阅：`checkout.session.completed`、`checkout.session.async_payment_succeeded`、`checkout.session.async_payment_failed`。
- Preview 环境已填 **Test mode** 密钥（`sk_test_`），Production 保持 Live 密钥。
- 预览地址有访问保护，Stripe Webhook 进不来；测试时靠付款后回到 `/account` 的主动核对入账。
- 即使 Webhook 延迟，用户付款后回到 `/account` 时也会立即核对并入账；两条路径不会重复加点。

## 5. 上线前验收

在 Preview 地址逐项检查：

- [ ] `/login` 输入邮箱 → 收到邮件 → 点链接 → 点 Sign in → 进入 `/account`，余额 3
- [ ] 同一个链接第二次使用会提示失效
- [ ] 买 Starter（Stripe 测试卡）→ 回到 `/account` 显示 53，流水里有 Starter pack
- [ ] Stripe 后台重发同一个 Webhook，余额不变
- [ ] 正式域名上 Google 登录可用，同一邮箱用 Google 和邮箱登录进的是同一个账号
- [ ] Sign out 后 `/account` 会跳到登录页
- [ ] 首页、批量 ZIP 付款不受影响

## 6. 给 AI 功能留的接口

AI 路由在服务器端这样扣点（失败自动退还）：

```ts
import { getCurrentUser } from "@/lib/auth";
import { InsufficientCreditsError, runPaidJob } from "@/lib/paid-job";

const user = await getCurrentUser();
if (!user) return Response.json({ error: "Please sign in." }, { status: 401 });
try {
  const { result, balanceAfter } = await runPaidJob(user.id, "white_background", { model: "birefnet" }, () => callFal(...));
  return Response.json({ url: result, balance: balanceAfter });
} catch (error) {
  if (error instanceof InsufficientCreditsError) return Response.json({ error: "Not enough credits." }, { status: 402 });
  throw error;
}
```

扣点和退款没有公开的网址，只能由服务器代码调用。

## 7. 测试

```bash
# 需要一个本地 Postgres；测试会创建测试用户
DATABASE_URL=postgres://... npm run db:migrate
DATABASE_URL=postgres://... npm run test:ledger
```

覆盖：注册赠点只发一次、Google 与邮箱账号合并、同一付款并发入账只算一次、余额不足拒绝、并发扣点不透支、失败退款只退一次、余额与流水一致。
