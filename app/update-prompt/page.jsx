'use client'

import React from 'react'
import { useState, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'
import { Router } from 'next/router'

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const getPromptDetails = async () => {
            const res = await fetch(`/api/prompt/${promptId}`);
            const data = await res.json();
            console.log(`the data is ${data}`)
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })};
            
            if(promptId){
                getPromptDetails();
            }
            console.log(post);
        }, [promptId]);
    
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if (!promptId) {
            return alert('No prompt ID');
        }
        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            })
            if(res.ok){
                router.push('/');
            }
        }catch (err) {   
                console.error(err);
        }finally {
            setSubmitting(false);
        }}

    
  return (
    <Form 
        type = "Edit"
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {updatePrompt}
    />
  )
}

export default EditPrompt