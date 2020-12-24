import React, { useCallback, useRef } from 'react'
import {Form, Input, Button} from 'antd'
import useInput from '../hooks/useInput'
import {useSelector, useDispatch} from 'react-redux'
import { addPost } from '../reducers/post'
const PostForm = () => {

  const {imagePaths} = useSelector((state) => state.post)
  const dispatch = useDispatch()
  
  const imageInput = useRef()
  const textAreaInput = useRef()

  const text = useInput('')
  const onSubmit = useCallback(() => {
    console.log('hi')
    dispatch(addPost())
    text.resetValue()
  }, [])

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])
  
  return (
    <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea 
        value={text.value} 
        onChange={text.handler} 
        maxLength={148} 
        placeholder="오늘의 흥미로운 이야기를 던져주세요." 
        ref={textAreaInput}  
      />
      <div>
        <input type="file" multiple hidden id="fileUpload" ref={imageInput}/>
        <Button id="fileUpload" onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{style: 'right'}} htmlType="submit">PLOP</Button>
      </div>
      <div>
        {imagePaths.map(image => (
          <div key={image} style={{display: 'inline-block'}}>
            <img src={image} style={{width: '200px'}} alt={image}/>
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  )
}

export default PostForm
