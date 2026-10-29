import { $, store } from './dom';

const btn = $('#theme');
const icon = () => btn?.querySelector('use')?.setAttribute('href', document.documentElement.dataset.theme === 'dark' ? '#i-sun' : '#i-moon');
icon();
btn?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  store.set('syn-theme', next);
  icon();
});
