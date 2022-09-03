import ky from 'ky';
import api from './api';

const makeS3UploadData = async (policy, file) => {
	const fd = new FormData();

	fd.append('x-amz-algorithm', 'AWS4-HMAC-SHA256');
	fd.append('acl', policy.bucketAcl);
	fd.append('policy', policy.encodedPolicy);
	fd.append('x-amz-credential', policy.amzCred);
	fd.append('x-amz-date', policy.expirationStrClean);
	fd.append('X-Amz-Signature', policy.sign);

	fd.append('key', file.name);
	fd.append('Content-Type', file.type);

	fd.append('file', file.file);

	return fd;
};

const upload = async (file) => {
	const res = await api.get('/s3-signed-policy'); // change

	const S3SignedPolicyObject = { ...res.data.data };
	const bucketWriteUrl = `https://${S3SignedPolicyObject.bucket}.s3.ap-south-1.amazonaws.com/`;

	const { name, roll } = JSON.parse(localStorage.studentData || '{}'); // change
	const filename = `${name.replace(/ /g, '')}-${roll}-CV.${file.name.split('.').pop()}`;

	const fd = await makeS3UploadData(S3SignedPolicyObject, {
		name: filename,
		type: file.type,
		file,
	});

	await ky.post(bucketWriteUrl, fd, { withCredentials: false });
	const URL = `${bucketWriteUrl}${filename}`;
	return URL;
};

export { makeS3UploadData, upload };
