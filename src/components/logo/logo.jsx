import React, {Component} from 'react'
import LoImg from './logo.png'
import './logo.less'
export default class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <img src={LoImg} alt="logo"/>
      </div>
    );
  }
}
