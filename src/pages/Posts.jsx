import React, { useState, useEffect, useRef } from 'react';

import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import PostsFilter from '../components/PostsFilter';
import MyButton from '../UI/button/MyButton';
import Modal from '../UI/modal/Modal';
import Loader from '../UI/loader/Loader';
import Pagination from '../UI/pagination/Pagination';
import MySelect from '../UI/select/MySelect';
import { usePosts } from '../hooks/usePosts'
import { useObserver } from "../hooks/useObserver";
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService';
import { getPageCount } from '../utils/pages';

import '../styles/App.css';


function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef()

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit, fetchPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
      <Modal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </Modal>

      <hr style={{ margin: '15px' }} />

      <PostsFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Показать все' },
        ]}
      />

      {postError && <h1>Произошла ошибка</h1>}

      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />

      <div ref={lastElement} style={{ height: 20 }} />

      {isPostsLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
      }

      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;
