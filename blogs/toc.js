(function () {
    var article = document.querySelector('.post');
    if (!article) return;

    var headings = article.querySelectorAll('h2, h3');
    if (headings.length < 2) return;

    var layout = document.createElement('div');
    layout.className = 'post-layout';
    article.parentNode.insertBefore(layout, article);
    layout.appendChild(article);

    var toc = document.createElement('nav');
    toc.className = 'toc';
    toc.setAttribute('aria-label', 'Contents');

    var title = document.createElement('div');
    title.className = 'toc-title';
    title.textContent = 'Contents';
    toc.appendChild(title);

    var list = document.createElement('ul');
    var links = [];

    for (var i = 0; i < headings.length; i++) {
        var heading = headings[i];
        if (!heading.id) heading.id = 'section-' + (i + 1);

        var item = document.createElement('li');
        if (heading.tagName === 'H3') item.className = 'sub';

        var link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;

        item.appendChild(link);
        list.appendChild(item);
        links.push(link);
    }

    toc.appendChild(list);
    layout.appendChild(toc);

    function update() {
        var current = 0;
        for (var j = 0; j < headings.length; j++) {
            if (headings[j].getBoundingClientRect().top <= 140) current = j;
        }
        for (var k = 0; k < links.length; k++) {
            links[k].classList.toggle('active', k === current);
        }
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
})();