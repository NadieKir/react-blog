import React, { useState, useEffect, useRef } from 'react';
import { useMemo } from 'react';
import Counter from './components/Counter';
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import PostsFilter from './components/PostsFilter';
import './styles/App.css';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'пJs', body: 'description description' },
    { id: 2, title: 'фJs', body: 'description description' },
    { id: 3, title: 'уJs', body: 'description description' }
  ]);

  // const [selectedSort, setSelectedSort] = useState('');
  // const [searchQuery, setSearchQuery] = useState('');

  const [filter, setFilter] = useState({ sort: '', query: '' })

  const sortedPosts = useMemo(() => {
    if (filter.sort)
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query));
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />

      <hr style={{ margin: '15px' }} />

      <PostsFilter filter={filter} setFilter={setFilter} />

      {sortedAndSearchedPosts.length !== 0
        ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постовв' />
        : <div>Постов нет</div>
      }

    </div>
  );
}

export default App;
