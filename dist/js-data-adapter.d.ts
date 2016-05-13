import {Mapper} from 'js-data'

interface IDict {
  [key: string]: any
}
interface IAdapterOpts extends IDict {
  debug?: boolean
  raw?: boolean
}
export class Response implements IDict {
  data: any
  op: string
}
export class Adapter {
  static extend(instanceProps?: IDict, classProps?: IDict): typeof Adapter
  debug: boolean
  raw: boolean
  constructor(opts?: IAdapterOpts)
  afterCount(mapper: Mapper, props: IDict, opts: IDict, response: IDict | Response): any
  afterCreate(mapper: Mapper, props: IDict, opts: IDict, response: IDict | Response): any
  afterCreateMany(mapper: Mapper, props: IDict[], opts: IDict, response: IDict[] | Response): any
  afterDestroy(mapper: Mapper, id: string | number, opts: IDict, response: void | Response): any
  afterDestroyAll(mapper: Mapper, query: IDict, opts: IDict, response: void | Response): any
  afterFind(mapper: Mapper, id: string | number, opts: IDict, response: IDict | Response): any
  afterFindAll(mapper: Mapper, query: IDict, opts: IDict, response: IDict[] | Response): any
  afterSum(mapper: Mapper, field: string, query: IDict, opts: IDict, response: number | Response): any
  afterUpdate(mapper: Mapper, id: string | number, props: IDict, opts: IDict, response: IDict | Response): any
  afterUpdateAll(mapper: Mapper, props: IDict, query: IDict, opts: IDict, response: IDict[] | Response): any
  afterUpdateMany(mapper: Mapper, props: IDict[], opts: IDict, response: IDict[] | Response): any
  beforeCount(mapper: Mapper, props: IDict, opts: IDict): any
  beforeCreate(mapper: Mapper, props: IDict, opts: IDict): any
  beforeCreateMany(mapper: Mapper, props: IDict[], opts: IDict): any
  beforeDestroy(mapper: Mapper, id: string | number, opts: IDict): any
  beforeDestroyAll(mapper: Mapper, query: IDict, opts: IDict): any
  beforeFind(mapper: Mapper, id: string | number, opts: IDict): any
  beforeFindAll(mapper: Mapper, query: IDict, opts: IDict): any
  beforeSum(mapper: Mapper, field: string, query: IDict, opts: IDict): any
  beforeUpdate(mapper: Mapper, id: string | number, props: IDict, opts: IDict): any
  beforeUpdateAll(mapper: Mapper, props: IDict, query: IDict, opts: IDict): any
  beforeUpdateMany(mapper: Mapper, props: IDict[], opts: IDict): any
  dbg(...args: any[]): void
  count(mapper: Mapper, props: IDict, opts: IDict): any
  create(mapper: Mapper, props: IDict, opts: IDict): any
  createMany(mapper: Mapper, props: IDict[], opts: IDict): any
  destroy(mapper: Mapper, id: string | number, opts: IDict): any
  destroyAll(mapper: Mapper, query: IDict, opts: IDict): any
  find(mapper: Mapper, id: string | number, opts: IDict): any
  findAll(mapper: Mapper, query: IDict, opts: IDict): any
  loadBelongsTo(mapper: Mapper, def: IDict, records: IDict | IDict[], __opts: IDict): Promise<any>
  loadHasMany(mapper: Mapper, def: IDict, records: IDict | IDict[], __opts: IDict): Promise<any>
  loadHasManyLocalKeys(mapper: Mapper, def: IDict, records: IDict | IDict[], __opts: IDict): Promise<any>
  loadHasManyForeignKeys(mapper: Mapper, def: IDict, records: IDict | IDict[], __opts: IDict): Promise<any>
  loadHasOne(mapper: Mapper, def: IDict, records: IDict | IDict[], __opts: IDict): Promise<any>
  log(level: string, ...args: any[]): void
  makeBelongsToForeignKey(mapper: Mapper, def: IDict, record: IDict): string
  makeHasManyForeignKey(mapper: Mapper, def: IDict, record: IDict): string
  makeHasManyLocalKeys(mapper: Mapper, def: IDict, record: IDict): string
  makeHasManyForeignKeys(mapper: Mapper, def: IDict, record: IDict): string
  sum(mapper: Mapper, field: string, query: IDict, opts: IDict): any
  respond(response: Response, opts: IDict): IDict | Response
  update(mapper: Mapper, id: string | number, props: IDict, opts: IDict): any
  updateAll(mapper: Mapper, props: IDict, query: IDict, opts: IDict): any
  updateMany(mapper: Mapper, props: IDict[], opts: IDict): any
}
export function noop(...args: any[]): Promise<any>
export function noop2(...args: any[]): Promise<any>
export function unique(array: any[]): any[]
