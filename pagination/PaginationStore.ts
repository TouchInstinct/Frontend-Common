import { action, observable } from 'mobx'

export interface PaginationResponse<T> {
  items: T[]
  itemsCount: number
  pagesCount: number
}

class PaginationStore {
  @observable
  page: number = 1
  @observable
  pageSize: number = 30
  @observable
  filter: string = ''

  @action
  changePage = (page: number = 1, pageSize: number = 30) => {
    this.page = page
    this.pageSize = pageSize
  }

  @action
  search = (filter: string) => {
    this.filter = filter
    this.page = 1
  }

  @action
  reset = () => {
    this.page = 1
    this.pageSize = 30
    this.filter = ''
  }
}

export default PaginationStore
