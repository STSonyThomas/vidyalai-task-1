import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const PostHeader = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  margin: '10px',
  alignItems: 'center',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);
`;

const NextButton = styled(Button)`
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
`;

const Icon = styled.div(() => ({
  backgroundColor: 'gray',
  borderRadius: '50%',
  height: '50px',
  width: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: 'large',
  color: 'white',
}));

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <PostHeader>
        <Icon>
          {post.user.name.split(' ').map(partName => partName[0].toUpperCase())}
        </Icon>
        <div>
          <p style={{fontWeight: 'bold'}}>{post.user.name}</p>
          <p style={{fontSize: 'small'}}>{post.user.email}</p>
        </div>
      </PostHeader>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

//Corrected the PropTypes for Post
Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    body: PropTypes.string,
    images: PropTypes.array,
    title: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }), 
  }),
};

export default Post;
