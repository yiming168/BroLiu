// 填入真实信息后自动生成拨号链接、邮箱链接与微信号；留空时显示“待补充”。
const CONTACT = { phone: '4313389957', wechat: '', email: '' };
// 前往 https://web3forms.com 用刘哥的邮箱免费申请 Access Key，替换下面的占位字符串。
const WEB3FORMS_ACCESS_KEY = 'e17d0df3-39f2-447a-943a-c40347c37c3b';
const navigation = document.getElementById('navigation');
const menuButton = document.querySelector('.menu-toggle');
function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
document.getElementById('year').textContent = new Date().getFullYear();
const contactContainer = document.getElementById('contact-details');
const contactFields = [['电话 / PHONE', CONTACT.phone, 'tel:'], ['微信 / WECHAT', CONTACT.wechat, ''], ['邮箱 / EMAIL', CONTACT.email, 'mailto:']];
contactContainer.replaceChildren();
contactFields.forEach(([label, value, prefix], index) => {
  if (index === 2 && !value) return;
  const item = document.createElement('div'); item.className = 'contact-item';
  const caption = document.createElement('span'); caption.textContent = label;
  const content = document.createElement(value && prefix ? 'a' : 'strong'); content.textContent = value || '待补充';
  if (value && prefix) content.href = prefix + (prefix === 'tel:' ? value.replace(/[^+0-9]/g, '') : value);
  item.append(caption, content); contactContainer.append(item);
});
const descriptions = [
  '温润木色与柔和的中性色，让空间安静下来。可以从材质、收纳与灯光开始，讨论适合你家的改造方向。',
  '简洁的线条与适度留白，为日常留下更多余地。把采光、动线与使用习惯放在一起考虑，让空间更舒适。',
  '让客厅与餐厅自然相连，也让家人之间的交流更轻松。具体布局与施工方式，需要结合房屋现状沟通。'
];
const dialog = document.getElementById('project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const source = button.querySelector('img'); const image = document.getElementById('dialog-image');
  image.src = source.src; image.alt = source.alt;
  document.getElementById('dialog-title').textContent = button.querySelector('h3').textContent;
  document.getElementById('dialog-description').textContent = descriptions[Number(button.dataset.project)];
  dialog.showModal(); document.body.classList.add('modal-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.querySelector('.dialog-contact').addEventListener('click', () => { dialog.close(); document.getElementById('contact').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); });
const messageForm = document.getElementById('message-form');
const formStatus = document.getElementById('form-status');
messageForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (messageForm.elements.botcheck.checked) return;
  if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
    formStatus.textContent = '留言功能尚未配置，请直接通过电话或微信联系。';
    return;
  }
  const submitButton = messageForm.querySelector('button[type="submit"]');
  const formData = new FormData(messageForm);
  formData.set('access_key', WEB3FORMS_ACCESS_KEY);
  formData.set('subject', 'Bro Liu 网站新留言');
  formData.set('from_name', 'Bro Liu 网站留言表单');
  submitButton.disabled = true;
  formStatus.textContent = '正在发送…';
  try {
    const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData, headers: { Accept: 'application/json' } });
    const result = await response.json();
    if (result.success) {
      formStatus.textContent = '留言已发送，我们会尽快联系你。';
      messageForm.reset();
    } else {
      formStatus.textContent = '发送失败，请稍后重试，或直接联系我们。';
    }
  } catch (error) {
    formStatus.textContent = '发送失败，请检查网络后重试。';
  } finally {
    submitButton.disabled = false;
  }
});
