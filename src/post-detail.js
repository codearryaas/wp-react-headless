import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { humanTimeDiff } from '@wordpress/date';
import { useDocumentTitle } from "@uidotdev/usehooks";

const apiUrl = process.env.REACT_APP_API_URL;

const PostDetail = () => {
    const [post, setPost] = useState({});
    const { id } = useParams(); // Get dynamic part of the URL

    const getPost = () => {
        fetch(`${apiUrl}wp/v2/posts?slug=${id}&_embed`).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();

        }).then(data => {
            if (data?.[0]) {
                setPost(data?.[0]);
            }

            // setPosts(data); // Use the data
        })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    useEffect(() => {
        getPost();
    }, []);

    useDocumentTitle(post?.title?.rendered);

    return <>
        {post?.title?.rendered && <>
            {post?._embedded?.['wp:featuredmedia']?.[0]?.source_url && <figure><img className='featured-image' src={post?._embedded?.['wp:featuredmedia']?.[0]?.source_url} alt='featured-image' /></figure>}

            <h2>{post?.title?.rendered}</h2>
            <p>{humanTimeDiff(post.date)}</p>
            <div dangerouslySetInnerHTML={{ __html: post?.content?.rendered }} />
        </>}
    </>
}

export default PostDetail;