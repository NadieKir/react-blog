import React, { useState, useEffect, useRef } from 'react';
import Counter from './components/Counter';
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import './styles/App.css';
import MySelect from './UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'пJs', body: 'description description' },
    { id: 2, title: 'фJs', body: 'description description' },
    { id: 3, title: 'уJs', body: 'description description' }
  ]);

  const [selectedSort, setSelectedSort] = useState('');

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />

      <hr style={{ margin: '15px' }} />

      <MySelect
        value={selectedSort}
        onChange={sortPosts}
        defaultValue="Сортировка"
        options={[
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По описанию' },
        ]}

      />

      {posts.length !== 0
        ? <PostList remove={removePost} posts={posts} title='Список постовв' />
        : <div>Постов нет</div>
      }

    </div>
  );
}

export default App;
