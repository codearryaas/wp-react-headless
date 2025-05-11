
import { useEffect, useState } from 'react';
import { useDocumentTitle } from "@uidotdev/usehooks";
import { humanTimeDiff } from '@wordpress/date';

const apiUrl = process.env.REACT_APP_API_URL;

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        fetch(`${apiUrl}wp/v2/posts?_embed`).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();

        }).then(data => {
            setPosts(data); // Use the data
        })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    useEffect(() => {
        getPosts();
    }, []);
        useDocumentTitle(`Rakesh Blog`);

    return <>
        {posts && <> <ol className='posts-list'>
            {posts.map((post) => {
                return <li key={`posts-${post.id}`}>
                    <figure> {post?._embedded?.['wp:featuredmedia']?.[0]?.source_url && <img className='featured-image' src={post?._embedded?.['wp:featuredmedia']?.[0]?.source_url} alt='featured-image' />}
                    </figure>
                    <h2>{post.title.rendered}</h2>
                    <p>{humanTimeDiff(post.date)}</p>
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }} />
                    <p>
                        Read More...
                    </p>
                </li>
            })}
        </ol>
        </>}
    </>;
}

export default PostList;