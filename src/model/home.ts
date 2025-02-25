type Layout =
  | 'ワンルーム'
  | '1K'
  | '1DK'
  | '1LDK'
  | '2K'
  | '2DK'
  | '2LDK'
  | '3K'
  | '3DK'
  | '3LDK'
  | '4K'
  | '4DK'
  | '4LDK'
  | '5K以上'

type Building = 'マンション' | 'アパート' | '一戸建て・その他'

export type Home = {
  id: string
  name: string
  prefecture: string
  city: string
  rent: number
  layout: Layout
  year: number
  building: Building
}

type Year =
  | '新築'
  | '1年以内'
  | '3年以内'
  | '5年以内'
  | '7年以内'
  | '10年以内'
  | '15年以内'
  | '20年以内'
  | '25年以内'
  | '30年以内'
  | '指定しない'
