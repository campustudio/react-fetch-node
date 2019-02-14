import React from 'react'
import { browserHistory } from 'react-router' // eslint-disable-line
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: ['sub2'],
    },
    this.onOpenChange = this.onOpenChange.bind(this)
    this.onClickMenu = this.onClickMenu.bind(this)
  }

  onOpenChange(openKeys) {
    console.log('openKeys: ', openKeys)
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    console.log('latestOpenKey: ', latestOpenKey)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  onClickMenu({item, key, keypath}) {
    console.log('item: ', item);
    console.log('key: ', typeof(key));
    console.log('keypath: ', keypath);
    key == 5 && browserHistory.push('/upload/ant/default')
    key == 6 && browserHistory.push('/battle/angel')
  }

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        onClick={this.onClickMenu}
        style={{ width: 220, position: 'fixed', height: '100%', overFlow: 'auto' }}
      >
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Visual</span></span>}>
          <Menu.Item key="1">Ant Chart</Menu.Item>
          <Menu.Item key="2">Biz Chart</Menu.Item>
          <Menu.Item key="3">Pretty Pie</Menu.Item>
          <Menu.Item key="4">D3 Treemap</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Upload</span></span>}>
          <Menu.Item key="5">Ant Default</Menu.Item>
          <Menu.Item key="6">Battle Angle</Menu.Item>
          <SubMenu key="sub3" title="Pick One">
            <Menu.Item key="7">First V</Menu.Item>
            <Menu.Item key="8">Second V</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
