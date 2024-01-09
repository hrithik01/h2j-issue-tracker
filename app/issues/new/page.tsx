'use client'
import { TextField, TextArea, Button, Callout } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import React, { useState } from 'react'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface IssueForm {
    title: string
    description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const [error, setError] = useState('')
  return (
  <div className='max-w-xl'> 
    { error && (
      <Callout.Root color="red" className='mb-4'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
    )}
    <form 
    className='space-y-3' 
    onSubmit={handleSubmit(async (data) => {
      try {
        await axios.post('/api/issues', data)
        router.push('/issues')
      } catch (error) {
        setError('An error occurred while creating the issue')
      }
    })}>
        <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')}/>
        </TextField.Root>
        <Controller 
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <Button>Submit New Issue</Button>
    </form>
  </div>
  )
}

export default NewIssuePage