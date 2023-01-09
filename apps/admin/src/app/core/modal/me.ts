export interface ICurrentUser {

  username: string;

  /**
   * 密码过期时间
   */
  passwordExpireTime: string;

  /**
   * 创建时间
   */
  createdTime: string;

  /**
   * 接口已过滤字段Map,可配合客服端隐藏掉对已过滤字段的展示
   * URL 过滤字段
   */
  authorities: { [key: string]: string };

  /**
   * 已配置的菜单列表
   */
  menus: Array<UserMenu>;

  roles: Array<Role>;
}

export interface UserMenu {
  url: string;

  id: number;

  parent: number;
}

export interface Role {
  code: string;
  name: string;
}

export class CurrentUser {

  username: string;

  /**
   * 密码过期时间
   */
  passwordExpireTime: string;

  /**
   * 创建时间
   */
  createdTime: string;

  /**
   * 已授权接口=>已过滤字段Map,可配合客服端隐藏掉对已过滤字段的展示
   * URL 过滤字段
   */
  resource: Map<string, Array<string>>;

  /**
   * 已配置的菜单列表
   */
  menus: Array<UserMenu>;

  roles: Array<Role>;


  constructor(me: ICurrentUser) {
    this.username = me.username;
    this.passwordExpireTime = me.passwordExpireTime;
    this.createdTime = me.createdTime;
    this.resource = this.createAuthority(me.authorities || {});
    this.menus = me.menus;
    this.roles = me.roles;
  }


  private createAuthority(authority: { [key: string]: string }): Map<string, Array<string>> {
    const resource: Map<string, Array<string>> = new Map<string, Array<string>>();
    // Object.entries(authority).forEach(([key, value]) => {
    //   value&&resource.set(key, value.split(","));
    //
    // });
    return resource;
  }


}
