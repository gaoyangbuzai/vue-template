const cookie = {
    //写cookies 
    setCookie(cname, cvalue, exdays, domain) {
        let cookieStr = '';
        cookieStr = `${cname}=${cvalue};`;
        if (exdays) {
            let exp = new Date();
            exp.setTime(exp.getTime() + exdays * 60 * 60 * 24 * 1000);
            cookieStr += `expires=${exp.toGMTString()};`;
        }
        if (domain) {
            cookieStr += `domain=${domain};`;
        }
        document.cookie = cookieStr + 'path=/';
    },
    //读取cookies
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    },
    //删除cookies
    delCookie: function (name,domain) {
        let cval = this.getCookie(name);
        if (cval != null) {
            this.setCookie(name,'',0,domain);
        }
    }
}

export default cookie