import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import PostItem from './PostItem';


const PostList = ({ posts, title, remove }) => {
    if (!posts.length) {
        return (
            <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Посты не найдены</h2>
        )
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition key={post.id} timeout={500} classNames="post">
                        <PostItem remove={remove} number={index + 1} post={post} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
}

export default PostList;