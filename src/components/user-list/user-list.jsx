import React from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
// import user from "../../containers/user/user";

const Header = Card.Header
const Body = Card.Body

class UserList extends React.Component {

  static propTypes ={
    userList: PropTypes.array.isRequired
  }

  handleclick = (userid) => {
    this.props.history.push(`/chat/${userid}`)
  }

  render() {
    return (
      <WingBlank style={{marginTop: 50, marginBottom: 50}}>
        {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
        <QueueAnim type='scale' delay={100}>
          {
            this.props.userList.map(user => (
              <div key={user._id}>
                <WhiteSpace/>
                <Card onClick={() => {this.handleclick(user._id)}}>
                  <Header className="herder"
                          title={user.name}
                          thumb={user.avatar ? require(`../../assets/imgs/${user.avatar}.png`) : null}
                          extra={<p>{user.title}</p>}/>
                  <Body>
                    {user.company ? <div>公司: {user.company}</div> : null}
                    {user.money ? <div>薪资: {user.money}</div> : null}
                    <div>描述: {user.desc}</div>
                  </Body>
                </Card>
              </div>
            ))
          }
        </QueueAnim>


    </WingBlank>)
  }
}

export default withRouter(UserList)
