"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) =>{
  console.log(data)
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
        <PromptCard
          key= {post._id}
          post= {post}
          handleTagClick = {handleTagClick}
        />
      ))}

    </div>
  )
}



const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const handleSearchChange = (e) =>{
    e.preventDefault();
    setSearchText(e.target.value);
      if (e.target.value === '' || e.target.value === null || e.target.value.trim().length === 0) {
        setFilteredPosts(posts);
        return;
      }
      setFilteredPosts(posts.filter((post) =>{
      return post.tag.toLowerCase().includes(searchText.toLowerCase()) || post.creator.username.toLowerCase().includes(searchText.toLowerCase())
    }))

  }
  useEffect(() => {
    const fetchPosts = async () =>{
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data)
    }
    fetchPosts();
 
  }, [])

  useEffect(() => {
    setFilteredPosts(posts);

  },[posts])


  


  
  return (
    <section className="feed">
      <input 
        type="text" 
        placeholder="Search for a tag or a username" 
        value={searchText}
        onChange={(e) =>{handleSearchChange(e)}}
        required
        className="search_input peer"
        />
      <PromptCardList
        data = {filteredPosts}
        handleTagClick = {() => {}}

      />
    </section>
  );
};

export default Feed;
