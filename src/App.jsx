import React, { useState, useEffect, useRef } from 'react';
import { useMemo } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostsFilter from './components/PostsFilter';
import './styles/App.css';
import MyButton from './UI/button/MyButton';
import Modal from './UI/modal/Modal';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'пJs', body: 'description description' },
    { id: 2, title: 'фJs', body: 'description description' },
    { id: 3, title: 'уJs', body: 'description description' }
  ]);

  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)

  const sortedPosts = useMemo(() => {
    if (filter.sort)
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query));
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
      <Modal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </Modal>

      <hr style={{ margin: '15px' }} />
      <PostsFilter filter={filter} setFilter={setFilter} />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постовв' />
    </div>
  );
}

export default App;
