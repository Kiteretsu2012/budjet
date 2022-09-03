import ky from 'ky';

const kyInstance = ky.create({
	hooks: {
		beforeRequest: [
			async (req) => {
				if (!req.url.endsWith('/user/auth')) {
					req.headers.append('Authorization', `${localStorage.getItem('AUTH_TOKEN')}`);
				}
			},
			async (req) => {
				console.log(req.path);
				if (req.path?.startsWith('/org')) {
					req.headers.append(
						'OrganisationID',
						`${window.location.href.substring(
							window.location.href.lastIndexOf('/') + 1
						)}`
					);
				}
			},
		],
	},
	credentials: 'include',
	prefixUrl: 'http://localhost:5000/',
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
