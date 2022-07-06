import React, { useState, useEffect } from 'react';
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
            {posts.map((post, index) =>
                <PostItem remove={remove} number={index + 1} post={post} key={post.id} />
            )}
        </div>
    );
}

export default PostList;