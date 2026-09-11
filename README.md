# Bro Liu · 刘哥装修

高端极简室内装修展示网站。纯 HTML / CSS / JavaScript，无需安装依赖或构建。

## 本地打开

直接用浏览器打开 `index.html`。图片使用 Unsplash 公开 HTTPS 地址，需要网络连接。

## GitHub Pages

1. 将这些文件提交并推送到 GitHub 仓库。
2. 在仓库 Settings → Pages 中选择 Deploy from a branch。
3. 选择存放文件的分支，目录选择 `/ (root)` 并保存。

网站使用相对资源路径，支持仓库子路径部署。`.nojekyll` 用于跳过 Jekyll 处理。

## 上线前补充

- 在 `script.js` 顶部的 `CONTACT` 中填写真实电话、微信和可选邮箱；电话、邮箱会自动生成联系链接。
- 在 `index.html` 中确认品牌名、关于文案、服务项目，并按需要添加真实服务区域。
- 当前图片为风格参考，页面已明确标注不是实际施工案例。获得真实施工照片后，可替换图片与案例说明。
- 联系区域有一个留言表单，客户提交后会直接发邮件到刘哥邮箱（见下方“留言表单配置”）。

## 留言表单配置（Web3Forms）

留言表单通过 [Web3Forms](https://web3forms.com) 发送邮件，免费、无需后端服务器：

1. 打开 https://web3forms.com ，用刘哥要接收留言的邮箱地址申请一个 Access Key（免费，输入邮箱后 Web3Forms 会发一封确认邮件，点确认链接即可拿到 Key）。
2. 打开 `script.js`，把顶部的：
   ```js
   const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';
   ```
   替换成申请到的真实 Access Key。
3. 保存并重新部署（或刷新本地页面）即可。在替换之前，表单提交会提示“留言功能尚未配置”，不会报错也不会丢失客户信息之外的功能。
4. 表单内置了一个隐藏的蜜罐字段（`botcheck`）用于基础防垃圾邮件，无需额外配置。

## 文件

- `index.html`：页面内容、项目详情弹窗
- `styles.css`：响应式布局、键盘焦点、减少动态效果支持
- `script.js`：手机菜单、项目详情、联系方式、年份
- `favicon.svg`：网站图标

## 图片来源

所有图片通过 `images.unsplash.com` 公开链接展示，未保存到仓库。外部图片的可用性由服务提供方决定。

- 首屏：`photo-1600210492486-724fe5c67fb0`
- 木色之间：`photo-1600607687920-4e2a09cf159d`
- 日常的留白：`photo-1600566753086-00f18fb6b3ea`
- 光的居所：`photo-1600210491892-03d54c0aaf87`
