import cookie from 'js-cookie';

/**
 * cookie helper methods
 */

export const setCookie = (key, value) => {
	if (process.browser) {
		cookie.set(key, value, { expires: 1 });
	}
};

export const removeCookie = (key) => {
	if (process.browser) {
		cookie.remove(key, { expires: 1 });
		window.localStorage.removeItem(`user`);
	}
};

export const getCookie = (key, req) => {
	return process.browser ? getCookieFrombrowser(key) : getCookieFromServer(key, req);
};

const getCookieFrombrowser = (key) => {
	return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
	if (req && req.headers && !req.headers.cookie) {
		return undefined;
	}
	const rawCookie = req && req.headers && req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${key}=`));
	if (!rawCookie) {
		return undefined;
	}
	return rawCookie.split('=')[1];
};
