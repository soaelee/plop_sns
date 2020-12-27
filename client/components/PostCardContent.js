import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'


const PostCardContent = ({postData}) => {
  return (
    <div>
      {/* split함수에서는 정규표현식을 사용할때 감싸주어야 한다! */}
      {postData.split(/(#[^\s#]+)/g).map((word, i) => {
        if(word.match(/(#[^\s#]+)/)){
          return <Link href={`/hashtag/${word.slice(1)}`} key={i}><a>{word}</a></Link>
        }
        return word
      })}
    </div>
  )
}

PostCardContent.propTypes = {
  postData : PropTypes.string.isRequired
}

export default PostCardContent
