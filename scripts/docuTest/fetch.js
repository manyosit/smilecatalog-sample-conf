//prepare params
const result = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
//return parameter
resolve(result.json());