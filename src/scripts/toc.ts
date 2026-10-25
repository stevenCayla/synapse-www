import { $$ } from './dom';

// Highlights the table-of-contents entry of the section being read.
const links = $$<HTMLAnchorElement>('.ptoc a[href^="#"]');
if (links.length) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((x) => {
        if (x.isIntersecting) links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + x.target.id));
      }),
    { rootMargin: '-90px 0px -70% 0px' },
  );
  $$('.prose h2[id]').forEach((h) => io.observe(h));
}
