import React, { useMemo } from 'react'
import { List, Button, Card } from 'antd'
import { StopOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const FollowerList = ({header, data}) => {
  // style은 인라인으로 설정할 경우, 객체이기 때문에 매번 새로 생성된다.
  // 그렇기 때문에 메모이제이션을 기반으로 하는 useMemo로 스타일을 생성해서 사용한다.
  const listStyle = useMemo(() => ({marginBottom: '20px'}), [])
  const listGrid = useMemo(() => ({gutter: 4, xs: 2, md: 3}), [])
  const buttonStyle = useMemo(() => ({textAlign: 'center', margin: '10px 0'}), [])
  const itemStyle = useMemo(() => ({marginTop: '20px'}), [])
  return (
    <List
      style={listStyle}
      grid={listGrid}
      size="small"
      header={<div>{header}</div>}
      loadMore={<div style={buttonStyle}><Button>더 보기</Button></div>}
      bordered
      dataSource={data}
      renderItem = {(item) => (
        <List.Item style={itemStyle}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
    )
}

FollowerList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}

export default FollowerList
