/*选择头像的组件*/
import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class AvatarSelector extends Component {

  static propTypes = {setAvatar: PropTypes.func.isRequired}
  state = {icon: null}

  constructor(props) {
    super(props)
    this.avatarList = []
    for (var i = 0; i < 15; i++) {
      const text = `头像${i + 1}`
      //`../../assets/imgs/${text}.png`
      this.avatarList.push({text, icon: require(`../../assets/imgs/${text}.png`)})
    }
  }

  selectAvatar = ({icon, text}) => {
    //更新当前icon状态
    this.setState({icon: icon})
    //更新父组件状态
    this.props.setAvatar(text)
  }

  render() {
    const {icon} = this.state
    const gridHeader = icon ? <p className='p-img'>已选择头像: <img src={icon} alt="avatar" /></p> : '请选择头像'
    return (
      <List style={{fontSize: 16}} renderHeader={() => gridHeader}>
        <Grid data={this.avatarList} columnNum={5} onClick={this.selectAvatar}/>
      </List>
    );
  }
}
