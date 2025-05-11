
import { useEffect, useState } from 'react';
import { useDocumentTitle } from "@uidotdev/usehooks";
import { humanTimeDiff } from '@wordpress/date';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const page = searchParams.get('page') || 1;
    // console.log( page );

    const getPosts = () => {
        fetch(`${apiUrl}wp/v2/posts?page=${page}&_embed`).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setTotalPages(response.headers.get('x-wp-totalpages'));

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
    }, [page]);
        useDocumentTitle(`Rakesh Blog`);


    const paginationItems = () => {
        const items = [];
        for (let i = 1; i <= totalPages; i++) {
            if (parseInt(page) !== i) {
                items.push(<li key={i}><button  onClick={()=>{
                    navigate(`/blog/?page=${i}`);
                    window.scrollTo(0, 0);
                }}   className={`${parseInt(page) === i ? 'current-page' : ''}`}>{i}</button></li>);
            } else {
                items.push(<li key={i}><span>{i}</span></li>);
            }
        }

        return <ul className='pagination'>{items}</ul>;
    }
    return <>
        {posts && <> <ol className='posts-list'>
            {posts.map((post) => {
                return <li key={`posts-${post.id}`}>
                    <Link to={`/blog/${post.slug}`}><figure> {post?._embedded?.['wp:featuredmedia']?.[0]?.source_url && <img className='featured-image' src={post?._embedded?.['wp:featuredmedia']?.[0]?.source_url} alt='featured-image' />}
                    </figure></Link>
                    <h2><Link to={`/blog/${post.slug}`}>{post.title.rendered}</Link></h2>
                    <p>{humanTimeDiff(post.date)}</p>
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }} />
                    <p>
                        <Link to={`/blog/${post.slug}`}>Read More...</Link>
                    </p>
                </li>
            })}
        </ol>
            {posts?.length > 0 && totalPages > 0 && paginationItems()}
        </>}
    </>;
}

export default PostList;