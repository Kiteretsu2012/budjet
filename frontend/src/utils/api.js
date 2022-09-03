import ky from 'ky';

const kyInstance = ky.create({
	prefixUrl: '/api',
	hooks: {
		beforeRequest: [
			async (req) => {
				if (!req.url.endsWith('/user/auth')) {
					req.headers.append(
						'Authorization',
						`Bearer ${localStorage.getItem('AUTH_TOKEN')}`
					);
				}
			},
		],
	},
	credentials: 'include',
});

const api = {
	...kyInstance,
	/**
	 * @param path {String}
	 */
	post: (path, body) => {
		const input = path[0] === '/' ? path.slice(1) : path;
		return kyInstance.post(input, { json: body }).json();
	},
};

export default api;
