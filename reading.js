var RECENT_COUNT = 3;

var READING = [
    {
        date: '2026/10',
        type: 'paper',
        title: 'Machine learning in medicine: a practical introduction',
        author: 'Jenni A. M. Sidey-Gibbons & Chris J. Sidey-Gibbons',
        url: 'https://doi.org/10.1186/s12874-019-0681-4'
    },
    {
        date: '2026/08',
        type: 'book',
        title: 'An Introduction to Statistical Learning',
        author: 'G. James et al.',
        url: 'https://www.statlearning.com/'
    }
];

(function () {
    function make(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function titleNode(item) {
        if (!item.url) return document.createTextNode(item.title);
        var link = make('a', '', item.title);
        link.href = item.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        return link;
    }

    function fillEntry(parent, item) {
        parent.appendChild(make('span', 'dot ' + item.type));
        parent.appendChild(titleNode(item));
        if (item.author) parent.appendChild(make('span', 'by', item.author));
    }

    var fullList = document.getElementById('reading-list');
    if (fullList) {
        READING.forEach(function (item) {
            var row = make('li');
            var time = make('time', '', item.date);
            time.dateTime = item.date.replace(/\//g, '-');
            var entry = make('span');
            fillEntry(entry, item);
            row.appendChild(time);
            row.appendChild(entry);
            fullList.appendChild(row);
        });
    }

    var recentList = document.getElementById('recent-list');
    if (recentList) {
        READING.slice(0, RECENT_COUNT).forEach(function (item) {
            var row = make('li');
            fillEntry(row, item);
            recentList.appendChild(row);
        });
    }
})();