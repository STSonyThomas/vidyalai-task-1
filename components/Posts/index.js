import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { IsSmallerDeviceContext } from '../context/IsSmallerDeviceProvider';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const [isPostsExhausted, setIsPostExhausted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isSmallerDevice } = useContext(IsSmallerDeviceContext);

  const fetchPost = async start => {
    const { data: posts } = await axios.get('/api/v1/posts', {
      params: { start: start, limit: isSmallerDevice ? 5 : 10 },
    });
    if (posts.length === 0) {
      setIsPostExhausted(true);
    }
    setPosts(prevPosts => [...prevPosts, ...posts]);
    setIsLoading(false);
  };
  
  useEffect(() => {
    fetchPost(0);
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    fetchPost(start + (isSmallerDevice ? 5 : 10));
    setStart(prev => prev + (isSmallerDevice ? 5 : 10));
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post} key={post.id} />
        ))}
      </PostListContainer>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          visibility: isPostsExhausted ? 'hidden' : '',
        }}
      >
        <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>
      </div>
    </Container>
  );
}
