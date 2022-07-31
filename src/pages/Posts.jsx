import React, { useState, useEffect, useRef } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import PostsFilter from '../components/PostsFilter';
import '../styles/App.css';
import MyButton from '../UI/button/MyButton';
import Modal from '../UI/modal/Modal';
import { usePosts } from '../hooks/usePosts'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService';
import Loader from '../UI/loader/Loader';
import { getPageCount, getPagesArray } from '../utils/pages';
import Pagination from '../UI/pagination/Pagination';

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit])

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
      {postError && <h1>Произошла ошибка</h1>}
      {isPostsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов' />
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
